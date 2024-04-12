import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
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
passport.deserializeUser(User.deserializeUser());

// Set up passport
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authorized..")
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

console.log("login router called ...")

*/
router.post('/login', async(req, res, next) => {
 /* passport.authenticate('local', async (err, authenticatedUser, info) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!authenticatedUser) {
      // Authentication failed
      return res.status(401).json({ message: 'Authentication failed' });
    }*/
    //console.log(req)
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
      const { username, password, email, phone_num } = req.body;
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(400).json({ message: "Password doesn't match" });
      }
      // Authentication succeeded
      const options ={
        HttpOnly: true,
        sameSite: 'none',
        domain: '127.0.0.1',
      }
      res.cookie('username', user.username , { path: '/', expires: new Date(0) });  
      res.cookie('email', user.email );
      res.cookie('phone_num', user.phone_num);
      //console.log('Logged in:', user.username);
      res.cookie('username', user.username, { 
        //httpOnly: true, 
        // Set the maximum age of the cookie (in milliseconds)
        maxAge: 86400000,
        domain: 'localhost', // 24 hours
        // Set the path of the cookie (optional)
        path: '/', // Cookie accessible from all paths
     
        
       // sameSite:'none',


        // Set the domain of the cookie (optional)
        //domain: 'http://127.0.0.1:5500/', // Cookie accessible from all subdomains of example.com
        // Set whether the cookie should be secure (optional, for HTTPS only)
       // secure: true 
    });
    res.setHeader('Set-Cookie', [
      `userId=${user._id}; Max-Age=86400; Path=/ ;httpOnly: true`,
      `username=${user.username}; Max-Age=86400; Path=/ `
    ]);
    console.log("login router working.. cookies have being set ")
      return res.status(200)
      .cookie("username",username , {domain:"http://127.0.0.1:5500"})
      .json({ message: 'Login successful' ,user});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  })


// Protected endpoint for authenticated users
/*
app.get('/protected', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Authenticated user' });
});*/

export default router;

