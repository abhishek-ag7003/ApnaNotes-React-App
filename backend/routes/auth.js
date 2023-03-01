const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "thisIsSecretKey"


//create a user using POST "api/auth/user" -- (Doesn't require auth)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are any error , it returns Bad Request (400) with error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with the same email is already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with same email id already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password,salt)

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });
      const data = {
        user:{
          id:user.id
        }
      } 

      // generating jwt token for authorization 
      const authToken = jwt.sign( data, JWT_SECRET )

      res.json({"auth token" : authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
  }
);

module.exports = router;
