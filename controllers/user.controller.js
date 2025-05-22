// controllers/user.controller.js
import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }
  try {
    const user = new UserModel({ email, password });
    await user.save();
    res.send(`User registered with email: ${user.email}`);
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send('User not found');
    }
    if (user.password === password) {
      return res.send('User logged in successfully');
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    return res.status(500).send('Error logging in: ' + error.message);
  }
};
