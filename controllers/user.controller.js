// controllers/user.controller.js
import UserModel from "../models/user.model.js";
export const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send('all fields req');
    }
    try {
      const user = new UserModel({ email, password });
      await user.save();
      res.send(`user registered with email: ${user.email} and password: ${user.password}`);
    } catch (error) {
      res.status(500).send('Error registering user: ' + error);
      
    }
};

export const login = (res) => {
  res.send('User login endpoint');
};
