import { Router } from "express";
const router=Router()
import { registerUser,loginUser } from "../controller/userController.js";
import errorHandler from "../services/catchAsyncError.js";

router.route("/signup").post(errorHandler(registerUser))
router.route("/login").post(errorHandler(loginUser))

export default router