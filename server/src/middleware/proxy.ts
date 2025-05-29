import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { Request, Response } from "express";
import { ClientRequest } from "http";

export const createCustomProxy = (
  path: string,
  target: string,
  rewrite?: Record<string, string>
) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: rewrite || { [`^/api/proxy/${path}`]: `/${path}` },
    onProxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
      proxyReq.setHeader("Accept", "application/json");
    },
  } as Options);
