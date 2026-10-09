
import { port } from "./src/config/env.js";
import app from "./app.js";
import { producer } from "./src/config/kafka.js";

const PORT = port || 3000;
await producer.connect();
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