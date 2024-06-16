const express = require("express");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchUser=require("../middleware/fetchUser")
const JWT_PASSWORD="Revanth@101";

//Create User
router.post(
  "/create",
  [
    body("name", "Name should not be empty").isLength({ min: 5, max: 30 }),
    body("email", "Email not valid").isEmail(),
    body("password", "Min length:8 max length:10").isLength({
      min: 8,
      max: 10,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      let u = await User.findOne({email:req.body.email});
      if (u) {
        console.log("Exists");
        res.status(400).json({"message":"User with email already existed"})
      } 
      else {
        // const user = await new User(req.body);
        // await user.save();  u can use like this also

        let salt=await bcrypt.genSalt(10);
        let Password=await bcrypt.hash(req.body.password,salt);
        let user=await User.create({
          "name":req.body.name,
          "email":req.body.email,
          "password":Password
        })

        let data={
          user:user.id
        }
        let jwtdata=jwt.sign(data,JWT_PASSWORD);
        console.log(jwtdata);
        res.send(user);
        console.log(req.body);
        
      }

    }
    } catch (error) {
      console.log(error.message)
    }
  }
);


//Login
router.post(
  "/login",
  [
    body("email", "Email not valid").isEmail(),
    body("password", "Min length:8 max length:10").isLength({
      min: 8,
      max: 10,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      let u = await User.findOne({email:req.body.email});
      if (!u) {
        console.log("User Not Exists");
        res.status(404).json({"message":"Enter correct email"})
      } 
      else {

        let data={
          user:u.id
        }
        let jwtdata=jwt.sign(data,JWT_PASSWORD);
        console.log(jwtdata);
        res.send(jwtdata);
        
      }

    }
    } catch (error) {
      console.log(error.message)
    }
  }
);


//Verify AuthToken

router.post(
  "/verify",fetchUser,
  async (req, res) => {
    try {
      
      let userId=req.user;
      
      const data=await User.findById(userId).select("-password");
      console.log(data);
      res.send(data);
    } catch (error) {
      res.send(error);
      
    }
  }
);

module.exports = router;
