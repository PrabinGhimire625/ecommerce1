import Cart from "../model/cartModel.js";
import Category from "../model/categoryModel.js";
import Product from "../model/productModel.js";

//add to cart
export const addCart=async(req,res)=>{
    const userId =req.user.id
    const {productId,quantity}=req.body
    if(!quantity || !productId){
        res.status(404).json({message : "Please provide the quantity and productId"})
    }
    let cartItem=await Cart.findOne({where:{productId,userId}})
    if (cartItem){
        cartItem.quantity+=quantity
        await cartItem.save()
    }else{
        cartItem=await Cart.create({quantity,userId,productId})
            const data=await Cart.findAll({
                where:{
                    userId
                }
            }
            )
            res.status(200).json({message:"Product added to cart", data})
    }
}

//getCartItem
export const getCartItem=async(req,res)=>{
    const userId = req.user.id
    const cartItem=await Cart.findAll({where : {userId},
        include : [{
            model : Product,
        }]
    })
    if(cartItem.length===0){
        res.status(400).json({message:"No item in a cart"})
    }else{
        res.status(200).json({message:"Successfully get all the cart items of that login user",data:cartItem})
    }
}

//delete cart
export const deleteCart=async(req,res)=>{
    const userId=req.user.id
    const {productId}=req.params
    const product=await Product.findByPk(productId)
    if(!product){
        res.status(404).json({message:"No product with that id"})
        return
    }else{
        await Cart.destroy({where:{userId,productId}})
        res.status(200).json({message:"Item is successfully deleted"})
    }
}

//update cart items
export const updateCartItem=async(req,res)=>{
    const {productId} = req.params 
    const userId = req.user.id 
    const {quantity} = req.body  
    if(!quantity){
        res.status(400).json({message : "Please provide quantity"})
        return
    }
    const cartData = await Cart.findOne({where : {userId, productId}})

    if(cartData){
        cartData.quantity = quantity 
        await cartData?.save()
        res.status(200).json({ message : "Product of cart updated successfully",data : cartData})
    } else{
        res.status(404).json({message : "No productId of that userId"})
    }
}