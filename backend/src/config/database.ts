import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Recipe Book database connection established");
  } catch (error) {
    logger.error("Recipe Book database connection failed", {
      error: (error as Error).message,
    });
    throw error;
  }
};
