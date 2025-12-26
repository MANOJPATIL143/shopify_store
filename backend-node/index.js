import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./db.js";

import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
// import seedRoutes from "./routes/seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGINS.split(","),
//     credentials: true,
//   })
// );
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_ORIGINS.split(","),
  })
);

const db = await connectDB();
app.locals.db = db;

app.get("/api", (req, res) => {
  res.json({ message: "E-commerce Store API" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/seed", seedRoutes);

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
