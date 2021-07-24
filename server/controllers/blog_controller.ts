import {Request, Response} from 'express';
import { IReqAuth } from '../config/interface';
import Blog from '../models/blog';
import User from '../models/user';

const blogController = {
    create: async (req: IReqAuth, res: Response) => {
        const user = req.user;
        if (!user)
          return res
            .status(401)
            .json({ success: false, msg: "Invalid Authentication." });
        try {
            const {title, thumbnail, content, category, description} = req.body;

            const blog = await Blog.create({
                title,
                thumbnail,
                content,
                category,
                description,
                user: user.id
            });

            return res.json({ success: true, blog });
            
        } catch (err) {
            return res.json({ success: false, msg: err.message });
        }
    },
};

export default blogController;