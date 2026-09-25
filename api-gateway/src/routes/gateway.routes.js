import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { services } from "../config/services.js";

const router = express.Router();

router.use(
    "/auth",
    createProxyMiddleware({
        target: services.auth,
        changeOrigin: true
    })
);

router.use(
    "/users",
    createProxyMiddleware({
        target: services.user,
        changeOrigin: true
    })
);

router.use(
    "/products",
    createProxyMiddleware({
        target: services.product,
        changeOrigin: true
    })
);

router.use(
    "/orders",
    createProxyMiddleware({
        target: services.order,
        changeOrigin: true
    })
);

export default router;