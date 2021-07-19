import { Request, Response } from "express";
import Category from "../models/category";
import { IReqAuth } from "../config/interface";

const categoryController = {
    create: (req: Request, res: Response) => {
        try {
            const {name} = req.body;

        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    },
};

export default categoryController;