// controllers/user.controller.js
import UserModel from "../models/user.model.js";
import {loginSchema , signUpSchema} from "../helper/feild.validate.js";
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
      return res.send(`User logged in successfully email : ${email}`);
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    return res.status(500).send('Error logging in: ' + error.message);
  }
};