import { Router } from "express";
import { getAllUser, userLogin, userSignUp, verifyUser } from "../controllers/user.controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUser)
userRouter.post("/signup",validate(signupValidator), userSignUp)
userRouter.post("/login",validate(loginValidator), userLogin)
userRouter.get("/auth-status",verifyToken, verifyUser)

export default userRouter;
