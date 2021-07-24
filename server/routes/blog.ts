import express from "express";
import blogController from "../controllers/blog_controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/create', auth, blogController.create);

export default router;