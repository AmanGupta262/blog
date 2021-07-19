import { Response } from "express";
import Category from "../models/category";
import { IReqAuth } from "../config/interface";

const categoryController = {
  create: async (req: IReqAuth, res: Response) => {
      const user = req.user;
      if (!user)
        return res.status(401).json({ success: false, msg: "Invalid Authentication." });

      if (user.role !== "admin")
        return res.status(401).json({ success: false, msg: "Invalid Authentication." });
    try {
      const name = req.body.name.toLowerCase();

      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ success: false, msg: "Category already exists." });
      
      const newCategory = await Category.create({name});
      return res.status(200).json({ success: true, msg: "Category created successfully.", category: newCategory });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryController;