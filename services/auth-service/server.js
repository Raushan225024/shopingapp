
import { config } from "./src/config/env.js";
import app from "./app.js";

const PORT = config.port || 3000;

const server = app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});

// Handle unexpected errors
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    server.close(() => {
        process.exit(1);
    });
});