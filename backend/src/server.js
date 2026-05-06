import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import liquidityRoutes from "./routes/liquidityRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api", liquidityRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Liquidity backend running on http://localhost:${port}`);
});
