import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Connecting to Redis...`);
    return new Redis(process.env.REDIS_URL);
  }
  throw new Error("Redis connection failed: REDIS_URL is not defined");
};

export const redis = redisClient();
