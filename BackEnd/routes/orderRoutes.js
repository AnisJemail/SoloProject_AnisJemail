const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//  new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch orders by user name
router.get("/byUser/:username", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.username });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send("no order");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update  order
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
