const errorHandler=(fn)=>{
    return (req, res)=>{
        fn(req,res)
        .catch((err)=>{
            return res.status(500).json({
                message:"Internal server error",
                errorMessage:err.message
            })
        })
    }
}
export default errorHandler




