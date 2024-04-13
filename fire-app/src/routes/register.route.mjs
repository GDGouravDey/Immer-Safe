import express from 'express';
import User from '../models/user.mjs';
import dbConnect from '../dbconnect.mjs';

const router = express.Router();
dbConnect();

router.post("/register", async (req, res) => {
  try {
    // Check if the username already exists
    const { username, password, email, phone_num } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken. Choose a different username." });
    }

    // Ensure that the password, email, and phone_num are provided and not empty
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

    // If all required fields are present, create the new user
    const user = await User.create({ username, password, phone_num, email });

    // Set cookies with values from request body
    res.cookie('username', username, { maxAge: 86400000, domain: 'localhost', path: '/' });
    res.cookie('email', email, { maxAge: 86400000, domain: 'localhost', path: '/' });
    res.cookie('phone_num', phone_num, { maxAge: 86400000, domain: 'localhost', path: '/' });

    // Set other headers if needed

    return res.status(200).json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
