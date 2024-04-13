import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.mjs'; 
import app from '../server.mjs';
const router = express.Router();
import dbConnect from '../dbconnect.mjs';
dbConnect();

// Set up passport
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authorized..")
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

console.log("login router called ...")

router.post('/login', async(req, res, next) => {
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email: req.body.email });
    console.log("login router working..finding user")
    console.log(req.body)
    console.log(user)
    if (!user) {
      console.log(user)
      return res.status(400).json({ message: 'User not found' });
    }
    // Compare passwords
    console.log(user.username)
    const phone_num = String(user.phone_num);
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    console.log(user.username, user.email, phone_num);
    // Authentication succeeded
    res.cookie('username', user.username, { maxAge: 86400000, domain: 'localhost', path: '/' });
    res.cookie('email', user.email, { maxAge: 86400000, domain: 'localhost', path: '/' });
    res.cookie('phone_num', phone_num, { maxAge: 86400000, domain: 'localhost', path: '/' });
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default router;
