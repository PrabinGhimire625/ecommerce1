import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addCart, deleteCart, getCartItem, updateCartItem } from "../controller/cartController.js";
const router=Router()

router.route("/").post(isAuthenticated,errorHandler(addCart))
.get(isAuthenticated,errorHandler(getCartItem))

router.route("/:productId").delete(isAuthenticated,errorHandler(deleteCart))
.patch(isAuthenticated,errorHandler(updateCartItem))

export default router