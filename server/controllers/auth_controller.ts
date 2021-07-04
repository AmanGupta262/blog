import { Request, Response } from "express";
import User from "../models/user";
import Jwt from "jsonwebtoken";

const auth = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "Email already exists. " });

      const newUser = await User.create({
        name,
        email,
        password,
      });
      res.json({ msg: "Registerd successfully", data: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
//   get: 
};

export default auth;
