const express = require("express");
const router = express.Router();
const Order = require('../models/Order'); // Import the Order model

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  // Check if email exists in the database
  let eId = await Order.findOne({ 'email': req.body.email });
  console.log(eId);

  if (eId === null) {
    // Validate email field
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      console.log('Creating new order...');
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log('Error creating order:', error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  } else {
    // Rest of the code remains the same
    try {
      console.log('Updating existing order...');
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log('Error updating order:', error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  }
});

router.post('/myorderData', async (req, res) => {
  try {
    console.log(req.body.email);
    let mydata = await Order.findOne({ 'email': req.body.email });

    res.json({ orderData: mydata });
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

module.exports = router;
