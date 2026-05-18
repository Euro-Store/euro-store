import { Request, Response } from "express";

export function healthCheck(_req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    app: "Euro Store API",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV ?? "development",
  });
}
