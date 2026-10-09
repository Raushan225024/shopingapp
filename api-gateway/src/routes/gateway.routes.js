import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { services } from "../config/services.js";

const router = express.Router();

router.use(
    "/auth",
     (req, res, next) => {
        console.log("Gateway received:", req.method, req.originalUrl);
        next();
    },
    createProxyMiddleware({
        target: services.auth,
        changeOrigin: true,
        
    })
);

/*router.use(
    "/users",
    createProxyMiddleware({
        target: services.user,
        changeOrigin: true
    })
);
/*router.use(
    "/search",
    createProxyMiddleware({
        target: services.search,
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
*/
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "api-gateway"
    });
});
export default router;