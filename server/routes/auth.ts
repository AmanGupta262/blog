import express from "express";
import auth from "../controllers/auth_controller";
import { validRegister } from '../middleware/valid'

const router = express.Router();

router.post("/register", validRegister, auth.register);
router.post("/verify", auth.verifyAccount);
router.post("/login", auth.login);

export default router;