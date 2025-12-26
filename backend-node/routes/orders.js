import express from "express";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sessionId, shippingAddress } = req.body;
  const db = req.app.locals.db;

  const cart = await db.collection("carts").findOne({ sessionId });
  if (!cart || !cart.items.length)
    return res.status(400).json({ message: "Cart is empty" });

  const count = await db.collection("orders").countDocuments();
  const order = {
    id: uuid(),
    orderNumber: `ORD-${String(count + 1).padStart(6, "0")}`,
    items: cart.items,
    total: cart.total,
    shippingAddress,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  await db.collection("orders").insertOne(order);
  await db.collection("carts").deleteOne({ sessionId });

  res.status(201).json(order);
});

router.get("/:id", async (req, res) => {
  const order = await req.app.locals.db
    .collection("orders")
    .findOne({ id: req.params.id }, { projection: { _id: 0 } });

  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
