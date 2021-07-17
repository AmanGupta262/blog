import {Request, Response} from 'express';

const user = {
    updateUser: async (req: Request, res: Response) => {
        try {
            
        } catch (err: any) {
            return res.json({ success: false, msg: err.message });
        }
    }
};

export default user;