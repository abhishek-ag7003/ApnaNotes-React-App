const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "thisIsSecretKey";

//Route 1 : Create a user using POST "api/auth/user" -- (Doesn't require auth)
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
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with the same email is already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "User with same email id already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      // generating jwt token for authorization
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, "auth_token": authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 2 : Authenticate a user using POST api "/api/auth/login" --- no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success, error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // generating jwt token for authorization
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({success, "auth_token": authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 3 : Get logged in user detail using Post  "/api/auth/getUseDetail" -  login required
router.post("/get-user-detail", fetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = user ? true:false;
    res.send(success,user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({success,error:"Some error occured"});
  }
});
module.exports = router;
