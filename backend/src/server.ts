import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { logger } from "./config/logger";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      logger.info(`Recipe Book server started on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start Recipe Book server", {
      error: (error as Error).message,
    });
    process.exit(1);
  }
};

startServer();
