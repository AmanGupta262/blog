import express from "express";
import auth from "../controllers/auth_controller";
import { validRegister } from '../middleware/valid'

const router = express.Router();

router.post("/register", validRegister, auth.register);
router.post("/verify", auth.verifyAccount);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/refresh_token", auth.refreshToken);
router.post("/google-login", auth.googleLogin);

export default router;