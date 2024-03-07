const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const jwtsecret="Ifyouwannarunawaywithm";
router.post( "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


     const salt=await bcrypt.genSalt(10);
     let secpassword=await bcrypt.hash( req.body.password ,salt)

    try {
      
      const op = await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secpassword,
      });
      res.json({ success: true, op });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters long"),
  ],
  async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

   

    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors:" try login with correct credebntails" });
      }

        const pwdcompare= await bcrypt.compare(req.body.password ,userdata.password)
     
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors:" try login with correct credebntails" });
      }

       const data={
         user:{
           id:userdata.id
         }
       }
        const authtoken =jwt.sign(data,jwtsecret);

      return res.json({ success: true ,authtoken:authtoken});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
