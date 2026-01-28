import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
import redisClient from "./redis.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", clientRoutes);

app.get("/redis-status", async (_, res) => {
  const status = redisClient.isOpen ? "Connected" : "Disconnected";
  res.send({ redis: status });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Redis client is active and caching enabled");
});
