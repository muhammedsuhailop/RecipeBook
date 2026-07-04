interface EnvironmentVariables {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_EXPIRES: string;
  ACCESS_TOKEN_COOKIE_NAME: string;
  REFRESH_TOKEN_COOKIE_NAME: string;
  COOKIE_DOMAIN: string;
  CLIENT_URL: string;
  SPOONACULAR_API_KEY: string;
  SPOONACULAR_BASE_URL: string;
}

const requiredKeys: Array<keyof EnvironmentVariables> = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_EXPIRES",
  "ACCESS_TOKEN_COOKIE_NAME",
  "REFRESH_TOKEN_COOKIE_NAME",
  "COOKIE_DOMAIN",
  "CLIENT_URL",
  "SPOONACULAR_API_KEY",
  "SPOONACULAR_BASE_URL",
];

const loadEnv = (): EnvironmentVariables => {
  requiredKeys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  const nodeEnv = process.env.NODE_ENV;
  const isValidNodeEnv =
    nodeEnv === "development" || nodeEnv === "production" || nodeEnv === "test";

  return {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: isValidNodeEnv ? nodeEnv : "development",
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME as string,
    REFRESH_TOKEN_COOKIE_NAME: process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN as string,
    CLIENT_URL: process.env.CLIENT_URL as string,
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY as string,
    SPOONACULAR_BASE_URL: process.env.SPOONACULAR_BASE_URL as string,
  };
};

import dotenv from "dotenv";
dotenv.config();

export const env: EnvironmentVariables = loadEnv();
