import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./modules/auth/routes/auth.routes";
import { ApiError } from "./utils/ApiError";
import { HttpStatus } from "./constants/httpStatus.constants";
import { recipesRouter } from "./modules/recipes/routes/recipes.routes";
import { favoritesRouter } from "./modules/favorites/routes/favorites.routes";

const app: Application = express();

const allowedOrigins = env.CLIENT_URL ? env.CLIENT_URL.split(",") : [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),  
);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/favorites", favoritesRouter);

app.use((_req, _res, next) => {
  next(new ApiError(HttpStatus.NOT_FOUND, "Resource not found"));
});

app.use(errorHandler);

export { app };
