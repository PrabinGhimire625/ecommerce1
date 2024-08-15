import User from "../model/userModel.js"
import jwt from "jsonwebtoken"

//to verify the user from the token
export const isAuthenticated=async(req, res, next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.status(200).json({message : "Token is not found"})
    }
    jwt.verify(token, process.env.SECRET_KEY, async(err,decoded)=>{
        if(err){
            return res.status(403).json({message :"Invalid token"})
        }else{
            try{
                const userData=await User.findByPk(decoded.id)
                if(!userData){
                    return res.status(404).json({message:"No user with that token"}) 
                }
               req.user=userData  //saba tira janxa yo abo
               next() 
            }catch(err){
                console.log(err)
                res.status(500).json({message : "Something went wrong"})
            }
        }
    })

}


//... is used in function to represent an indefinite number of arguments as an array. 
//restrict customer or admin
export const restrictTo = (...roles)=>{
    return (req,res,next)=>{
       const userRole = req.user.role
       if(!roles.includes(userRole)){
        res.status(403).json({
            message : "you don't have permission for this.forbidden"
        })
       }else{
        next()
       }
    }
}
