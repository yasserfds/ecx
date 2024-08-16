import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Connecting to Redis...`);
    const client = new Redis(process.env.REDIS_URL);

    client.on("ready", () => {
      console.log("Redis is connected and ready to use.");
    });

    client.on("error", (err) => {
      console.error(`Redis connection error: ${err.message}`);
    });

    return client;
  }
  throw new Error("Redis connection failed: REDIS_URL is not defined");
};

export const redis = redisClient();
