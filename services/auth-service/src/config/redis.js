import { createClient } from "redis";
import { redisUrl } from "./env.js";

const redisClient = createClient({
    url: redisUrl
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

await redisClient.connect();

console.log("Redis connected");

export default redisClient;