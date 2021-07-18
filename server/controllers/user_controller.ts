import { Response } from "express";
import { IReqAuth } from "../config/interface";
import User from "../models/user";

const user = {
  updateUser: async (req: IReqAuth, res: Response) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Authentication." });

    try {
      const { avatar, name } = req.body;

      await User.findOneAndUpdate({ _id: user._id }, { avatar, name });

      return res.status(200).json({ success: true, msg: "Update success!" });
    } catch (err: any) {
      return res.json({ success: false, msg: err.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Authentication." });

    if (user.type !== "register")
      return res.status(401).json({
        success: false,
        msg: `Quick login account with ${user.type} can't use this feature`,
      });

    try {
      const { password } = req.body;

      await User.findOneAndUpdate({ _id: user._id }, { password });

      return res.status(200).json({ success: true, msg: "Reset password success!" });
    } catch (err: any) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

export default user;
