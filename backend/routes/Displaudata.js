const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
  try {
  
    // console.log(global.food);
    // console.log(global.foodcat);
  res.send([global.food,global.foodcat]);

  } catch (error) {
    console.log(error);
    res.send("Server error" );
  }
});

module.exports = router;
