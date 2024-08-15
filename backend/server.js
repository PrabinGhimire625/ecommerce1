import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./database/connection.js";
import User from "./model/userModel.js";  //necessary
import Product from "./model/productModel.js"
import Category from "./model/categoryModel.js";
import Cart from "./model/cartModel.js";

dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded()); 
app.use(express.static("./storage/"))

import categorySeeder from "./controller/categoryController.js"
import adminSeeder from "./adminSeeder.js";
categorySeeder()
adminSeeder()

//routes
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import cartRoute from "./routes/cartRoute.js"

app.use("/",userRoute)
app.use("/admin/product",productRoute)
app.use("/admin/category",categoryRoute)
app.use("/customer/cart",cartRoute)

//relationship between the user and products
User.hasMany(Product,{foreignKey : 'userId'})
Product.belongsTo(User,{foreignKey : 'userId'})

//category-product
Category.hasOne(Product,{foreignKey : 'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})

// user-cart relation 
User.hasMany(Cart,{foreignKey:'userId'})
Cart.belongsTo(User,{foreignKey : 'userId'})

// product and category
Product.hasMany(Cart,{foreignKey:'productId'})
Cart.belongsTo(Product,{foreignKey:'productId'})


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});
