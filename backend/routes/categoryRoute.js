import {Router } from "express";
import { isAuthenticated, restrictTo } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controller/categoryController.js";
const router=Router()

router.route("/").post(isAuthenticated,restrictTo('admin'),errorHandler(addCategory))
.get(errorHandler(getCategory))

router.route("/:id").patch(isAuthenticated,restrictTo('admin'),errorHandler(updateCategory))
.delete(isAuthenticated,restrictTo('admin'),errorHandler(deleteCategory))


export default router