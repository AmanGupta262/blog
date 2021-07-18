import express from "express";
import auth from "../middleware/auth";
import userController from "../controllers/user_controller";

const router = express.Router();

router.patch("/update", auth, userController.updateUser);
router.patch("/reset_password", auth, userController.resetPassword);

export default router;
