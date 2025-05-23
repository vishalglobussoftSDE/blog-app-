// controllers/user.controller.js
import UserModel from "../models/user.model.js";
import { loginSchema, signUpSchema } from "../helper/feild.validate.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { error, value } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password, name } = value;
  try {
    const user = new UserModel({ email, password, name });
    await user.save();
    res.send(`User registered with email: ${user.email}`);
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
};
export const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password } = value;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send('User not found');
    }
    if (user.password === password) {
      const jwtSecret = process.env.JWT_SECRET;
      const token = jwt.sign(
        { id: user._id, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 
      });
      return res.json({ message: "User logged in successfully" });
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    return res.status(500).send('Error logging in: ' + error.message);
  }
};
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  return res.json({ message: 'User logged out successfully' });
};