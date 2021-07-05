import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import sendEmail from "../config/nodemailer";
import { validateEmail } from "../middleware/valid";
import { generateActiveToken } from "../config/generateToken";
import { IDecodeToken } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;
const auth = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "Email already exists. " });

      const newUser = {
        name,
        email,
        password,
      };

      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(email)) {
        sendEmail(email, url, "Verify your email address");
        res.json({
          success: true,
          msg: "Success! Please check your email.",
          active_token,
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  verifyAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decode = <IDecodeToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decode;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });
      const user = await User.create(newUser);

      res.json({
        success: true,
        msg: "Account verified",
      });
    } catch (err) {
      let errMsg;
       if(err.code === 11000){
         errMsg = Object.keys(err.keyValue)[0] + "already exists"
       }
       return res.status(500).json({msg: errMsg})
    }
    
  }
};

export default auth;
