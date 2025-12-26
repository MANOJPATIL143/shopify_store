import express from "express";
import { v4 as uuid } from "uuid";

const router = express.Router();

const defaultProducts = [
  {
    id: uuid(),
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 299.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    ],
    stock: 50,
    rating: 4.8,
    reviews: 324,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    price: 399.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    ],
    stock: 30,
    rating: 4.6,
    reviews: 189,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Denim Jacket",
    description:
      "Classic denim jacket with modern fit and premium quality",
    price: 89.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    ],
    stock: 75,
    rating: 4.5,
    reviews: 256,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Running Shoes",
    description:
      "Lightweight running shoes with superior cushioning and support",
    price: 129.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    ],
    stock: 60,
    rating: 4.7,
    reviews: 412,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with thermal carafe and auto-brew",
    price: 79.99,
    category: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    ],
    stock: 40,
    rating: 4.4,
    reviews: 178,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Laptop Backpack",
    description:
      "Durable laptop backpack with multiple compartments and USB charging port",
    price: 59.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    ],
    stock: 100,
    rating: 4.6,
    reviews: 289,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat with extra cushioning and carrying strap",
    price: 39.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    ],
    stock: 80,
    rating: 4.5,
    reviews: 145,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and USB charging port",
    price: 49.99,
    category: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    ],
    stock: 55,
    rating: 4.3,
    reviews: 92,
    createdAt: new Date().toISOString(),
  },
];

async function ensureDefaultProducts(db) {
  const count = await db.collection("products").countDocuments();
  if (count === 0) {
    await db.collection("products").insertMany(defaultProducts);
    console.log("✅ Default products inserted");
  }
}


router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  // 👇 ensure default products exist
  await ensureDefaultProducts(db);

  const { category, search, minPrice, maxPrice, limit = 50 } = req.query;
  const query = {};

  if (category && category !== "all") query.category = category;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await db
    .collection("products")
    .find(query, { projection: { _id: 0 } })
    .limit(Number(limit))
    .toArray();

  res.json(products);
});


router.get("/:id", async (req, res) => {
  const product = await req.app.locals.db
    .collection("products")
    .findOne({ id: req.params.id }, { projection: { _id: 0 } });

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post("/admin/products", async (req, res) => {
  console.log(req);
  
  const product = {
    id: uuid(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  await req.app.locals.db.collection("products").insertOne(product);
  res.status(201).json(product);
});

router.put("/admin/products/:id", async (req, res) => {
  const result = await req.app.locals.db
    .collection("products")
    .updateOne(
      { id: req.params.id },
      { $set: { ...req.body, updatedAt: new Date().toISOString() } }
    );

  if (!result.matchedCount)
    return res.status(404).json({ message: "Product not found" });

  const updated = await req.app.locals.db
    .collection("products")
    .findOne({ id: req.params.id }, { projection: { _id: 0 } });

  res.json(updated);
});

router.delete("/admin/products/:id", async (req, res) => {
  const result = await req.app.locals.db
    .collection("products")
    .deleteOne({ id: req.params.id });

  if (!result.deletedCount)
    return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product deleted successfully" });
});

export default router;
