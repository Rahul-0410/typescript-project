import { Router} from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/authController";
import { verifyToken } from "../utils/middleware";

const authRouter = Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.get("/logout",logout);
authRouter.get("/me", verifyToken, getCurrentUser);

export default authRouter;

