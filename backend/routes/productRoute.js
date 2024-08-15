import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/productController.js";

import {multer,storage} from "../middleware/multerMiddleware.js"
const upload = multer({storage : storage})
const router = Router();

// router.route("/").post(errorHandler(addProduct))
router.route("/").post(isAuthenticated, restrictTo('admin'),upload.single('image'),errorHandler(addProduct))
.get(errorHandler(getAllProducts))

router.route("/:id").get(errorHandler(getSingleProduct))
.delete(isAuthenticated,restrictTo('admin'),errorHandler(deleteProduct))
.patch(upload.single('image'),errorHandler(updateProduct))


export default router;
