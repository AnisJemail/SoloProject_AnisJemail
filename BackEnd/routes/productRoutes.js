const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// all products
router.get("/", async (req, res) => {
  try {
    let filter = {};

    if (req.query.category) {
      filter.category = req.query.catergory;
    }
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("no product");
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
