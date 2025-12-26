import express from "express";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { sessionId, productId, quantity = 1 } = req.body;
  const db = req.app.locals.db;

  const product = await db.collection("products").findOne({ id: productId });
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await db.collection("carts").findOne({ sessionId });

  if (!cart) {
    cart = { id: uuid(), sessionId, items: [], total: 0 };
  }

  const item = cart.items.find(i => i.productId === productId);
  if (item) item.quantity += quantity;
  else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  }

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  cart.updatedAt = new Date().toISOString();

  await db.collection("carts").updateOne(
    { sessionId },
    { $set: cart },
    { upsert: true }
  );

  res.json(cart);
});

router.get("/:sessionId", async (req, res) => {
  const cart = await req.app.locals.db
    .collection("carts")
    .findOne({ sessionId: req.params.sessionId }, { projection: { _id: 0 } });

  res.json(
    cart || { id: uuid(), sessionId: req.params.sessionId, items: [], total: 0 }
  );
});

router.delete("/:sessionId", async (req, res) => {
  await req.app.locals.db
    .collection("carts")
    .deleteOne({ sessionId: req.params.sessionId });
  res.json({ message: "Cart cleared" });
});

export default router;
