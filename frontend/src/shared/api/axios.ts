import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/shared/config/env";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";
import { HTTP_STATUS } from "@/shared/constants/httpStatusCodes";
import { ApiError, type ApiErrorPayload } from "@/shared/api/apiTypes";

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type FailureListener = (error: unknown) => void;
type QueueItem = {
  resolve: () => void;
  reject: (error: unknown) => void;
};

const BYPASSED_URLS: string[] = [
  API_ENDPOINTS.auth.refresh,
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.register,
];

let isRefreshing = false;
let pendingQueue: QueueItem[] = [];
const failureListeners = new Set<FailureListener>();

function flushQueue(error: unknown | null): void {
  const queue = pendingQueue;
  pendingQueue = [];
  queue.forEach((item) => {
    if (error) item.reject(error);
    else item.resolve();
  });
}

export function onAuthFailure(listener: FailureListener): () => void {
  failureListeners.add(listener);
  return () => failureListeners.delete(listener);
}

function notifyAuthFailure(error: unknown): void {
  failureListeners.forEach((listener) => {
    try {
      listener(error);
    } catch (err) {
      console.error("auth failure listener threw", err);
    }
  });
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data as ApiErrorPayload | undefined;
    const message = data?.message ?? error.message ?? "Request failed";
    return new ApiError(status, message, data?.errors);
  }
  if (error instanceof Error) return new ApiError(0, error.message);
  return new ApiError(0, "Unknown request error");
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl || "/",
  timeout: 20_000,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!(error instanceof AxiosError) || !error.config) {
      return Promise.reject(toApiError(error));
    }

    const originalRequest = error.config as RetriableRequestConfig;
    const status = error.response?.status;
    const requestUrl = originalRequest.url ?? "";

    const shouldBypassRefresh = BYPASSED_URLS.some((url) =>
      requestUrl.includes(url),
    );

    if (
      status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest._retry &&
      !shouldBypassRefresh
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest as AxiosRequestConfig))
          .catch((queueError) => Promise.reject(toApiError(queueError)));
      }

      isRefreshing = true;
      try {
        await apiClient.post(API_ENDPOINTS.auth.refresh);
        flushQueue(null);
        return apiClient(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        const normalized = toApiError(refreshError);
        flushQueue(normalized);
        notifyAuthFailure(normalized);
        return Promise.reject(normalized);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(toApiError(error));
  },
);
