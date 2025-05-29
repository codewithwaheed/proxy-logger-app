import { Request, Response, NextFunction } from "express";
import Log from "../models/Log";
import { loggingConfig } from "../utils/loggingConfig";

export const logRequest = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    const isWhitelisted = loggingConfig.whitelist.some((path) =>
      req.originalUrl.startsWith(path)
    );

    if (!loggingConfig.isEnabled || isWhitelisted) return;

    try {
      await Log.create({
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date(),
        status: res.statusCode,
        user: (req as any).user?.id || null,
        ip: req.ip,
        responseTime: duration,
      });
    } catch (err) {
      console.error("Error saving log:", err);
    }
  });

  next();
};
