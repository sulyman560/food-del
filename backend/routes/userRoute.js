const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

router.post('/register', async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Strong Password" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword
    })
    const user = await newUser.save()
    const token = createToken(user._id)
    res.status(201).json({ success: true,token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Password is incorrect" })
    }
    const token = createToken(user._id)
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }

});



module.exports = router;
