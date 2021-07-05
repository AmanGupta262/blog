import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/user";
import { generateActiveToken } from "../config/generateToken";

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

      const active_token = generateActiveToken({ newUser });

      res.json({
        status: true,
        msg: "Registerd successfully",
        data: newUser,
        active_token,
      });
    } catch (err) {
      return res.status(500).json({ status: false, msg: err.message });
    }
  },
  //   get:
};

export default auth;
