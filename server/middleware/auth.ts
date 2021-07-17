import { Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { IDecodeToken, IReqAuth } from "../config/interface";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(401).json({ success: false, msg: "Invalid Authentication." });

        const decoded = <IDecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if(!decoded) return res.status(401).json({ success: false, msg: "Invalid Authentication." });

        const user = await User.findOne({ _id: decoded.id });
        if(!user) return res.status(401).json({ success: false, msg: "User does not exist." });

        req.user = user;
        
        next();
    } catch (err: any) {
        return res.status(500).json({ success: false, msg: err.message });
    }
}

export default auth;