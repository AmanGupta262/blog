import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Blog from "../models/blog";
import User from "../models/user";

const blogController = {
  create: async (req: IReqAuth, res: Response) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Authentication." });
    try {
      const { title, thumbnail, content, category, description } = req.body;

      const blog = await Blog.create({
        title: title.toLowerCase(),
        thumbnail,
        content,
        category,
        description,
        user: user.id,
      });

      return res.json({ success: true, blog });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getHomeBlog: async (req: Request, res: Response) => {
    try {
      const blogs = await Blog.aggregate([
        // User
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            as: "user",
          },
        },
        // array -> object
        { $unwind: "$user" },
        // Category
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        // array -> object
        { $unwind: "$category" },
        // Sorting
        { $sort: { createdAt: -1 } },

        // Group by category
        {
            $group: {
                _id: "$category._id",
                name: {$first: "$category.name"},
                blogs: {$push: "$$ROOT"},
                count: {$sum: 1}
            }
        },
        // Pagination for blogs
        {
            $project: {
                blogs: {
                    $slice: ["$blogs", 0, 4]
                },
                count: 1,
                name: 1,
            }
        }
      ]);

      return res.json({ success: true, blogs });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

export default blogController;
