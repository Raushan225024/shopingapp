import express from "express";
import cors from "cors";
import helmet from "helmet";
import { globalRateLimiter } from "./src/middleware/rateLimit.middleware.js";
import { requestId } from "./src/middleware/requestId.middleware.js";
import gatewayRoutes from "./src/routes/gateway.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(requestId);
app.use(globalRateLimiter);
app.use(express.json());
app.use("/api", gatewayRoutes);

export default app;