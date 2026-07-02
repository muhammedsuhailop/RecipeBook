import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "./env";
import { LOG_LEVELS } from "../constants/logger.constants";

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`,
  ),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

if (env.NODE_ENV !== "production") {
  transports.push(
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: LOG_LEVELS.ERROR,
      format: fileFormat,
      maxFiles: "14d",
    }),
  );

  transports.push(
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      format: fileFormat,
      maxFiles: "14d",
    }),
  );
}

export const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG,
  transports,
});
