import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await req.app.locals.db
    .collection("categories")
    .find({}, { projection: { _id: 0 } })
    .toArray();
  res.json(categories);
});

export default router;
