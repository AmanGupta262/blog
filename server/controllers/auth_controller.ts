import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import sendEmail from "../config/nodemailer";
import { validateEmail } from "../middleware/valid";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import {
  IDecodeToken,
  IUser,
  IGoPayload,
  IUserParams,
} from "../config/interface";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
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

      const user = await User.findOne({ email: newUser.email });
      if (user) return res.status(400).json({ msg: "User already exists." });
      await User.create(newUser);

      res.json({
        success: true,
        msg: "Account verified",
      });
    } catch (err) {
      let errMsg = err.message;
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ success: false, msg: "User does not exists" });

      // login user
      loginUser(user, password, res);
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/v1/auth/refresh_token" });
      return res.json({ success: true, msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        res.status(401).json({ success: false, msg: "Please login agian." });

      const decoded = <IDecodeToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded)
        res.status(401).json({ success: false, msg: "Please login agian." });

      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        const access_token = generateAccessToken({ id: user._id });
        return res.json({ success: true, access_token, user });
      }
      res.status(400).json({ success: false, msg: "User does not exists." });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const verify = await client.verifyIdToken({
        idToken: token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });
      const { email, email_verified, name, picture } = <IGoPayload>(
        verify.getPayload()
      );

      if (!email_verified)
        return res.status(500).json({ msg: "Email verification failed." });

      const password = email + "j$l495i)()&K#";

      const user = await User.findOne({ email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = { name, email, password, avatar: picture, type: "google" };
        registerUser(user, res);
      }
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  facebookLogin: async (req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => res);
      const { email, name, picture } = data;

      const password = email + "j$l495i)()&K87#";

      const user = await User.findOne({ email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = { name, email, password, avatar: picture.data.url, type: "facebook" };
        registerUser(user, res);
      }
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
};

const loginUser = (user: IUser, password: string, res: Response) => {
  const isMatch = password === user.password;

  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, msg: "Invalid email / password" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({
    msg: "Login Successful",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = await User.create(user);
  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({
    msg: "Login Successful",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default auth;
