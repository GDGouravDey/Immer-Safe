import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.mjs'; 
import app from '../server.mjs';
const router = express.Router();
import dbConnect from '../dbconnect.mjs';
dbConnect();
/*const corsoptions={
  origin: 'http://127.0.0.1:5500/', // Specify the allowed origin (e.g., your client's domain)
  methods: 'GET,POST', // Specify the allowed HTTP methods
  
  credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent with requests

}


app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/

// Set up passport
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authorized..")
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}; 

console.log("registration router called ...")
router.post("/register", async (req, res) => {
  try {
    // Check if the username already exists
    console.log("register router triggered ...")
    const { name, password, email, phone_num } = req.body;
    const username = name
    console.log(phone_num , username)
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      console.log("Username already taken. Choose a different username")
      return res.status(400).json({ error: "Username already taken. Choose a different username." });
    }
    console.log(req.body)
    // Ensure that the password is provided and not an empty string
    const errors = [];
    if (!password) {
      errors.push("Password is required.");
    }
    if (!email) {
      errors.push("Email is required.");
    }
    if (!phone_num) {
      errors.push("Phone number is required.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    console.log("password , username , phone_num , email")
    console.log(req.body.password)
    console.log(req.body.username)
    console.log(phone_num)
    console.log(email)
    // If the username is unique and password is provided, create the new user
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      phone_num: req.body.phone_num,
      email: req.body.email
    });
    console.log("new user created ")
    console.log(user)
    console.log("registered .....")
    console.log("setting up cookies ...")
    console.log(user.email , user.phone_num)
    res.cookie('username', user.username);
    res.setHeader('Set-Cookie', [
      `userId=${user._id}; Max-Age=86400; Path=/ ;httpOnly: true`,
      `username=${user.username}; Max-Age=86400; Path=/ `
    ]);
    // res.cookie('email', user.email);
    // res.cookie('phone_num', user.phone_num);
    return res.status(200)
    .cookie('email', user.email)
    .cookie('phone_num', user.phone_num )
    .json({ message: 'Registration successful' , user });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

    

// Protected endpoint for authenticated users
/*
app.get('/protected', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Authenticated user' });
});*/

export default router;

