import { Response} from 'express';
import { IReqAuth } from '../config/interface';
import User from '../models/user';

const user = {
    updateUser: async (req: IReqAuth, res: Response) => {
        const user = req.user;
        if(!user) return res.status(401).json({ success: false, msg: "Invalid Authentication." });

        try {
            const { avatar, name } = req.body;

            const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { avatar, name });

            return res.status(200).json({ success: true, msg: "Update success!", user: updatedUser });
        } catch (err: any) {
            return res.json({ success: false, msg: err.message });
        }
    }
};

export default user;