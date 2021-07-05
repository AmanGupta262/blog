import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/user";
import sendEmail from "../config/nodemailer";
import { validateEmail } from "../middleware/valid";
import { generateActiveToken } from "../config/generateToken";

const CLIENT_URL = `${process.env.BASE_URL}`;
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
      const url = `${CLIENT_URL}/active/${active_token}`

      if(validateEmail(email)){
        sendEmail(email, url, 'Verify your email address' )
        res.json({
          success: true,
          msg: "Success! Please check your email.",
        });
      }

      
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  //   get:
};

export default auth;
