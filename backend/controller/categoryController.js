import Category from "../model/categoryModel.js";

const categoryData=[
    {categoryName: "Electronics"},
    {categoryName: "Groceries"},
    {categoryName: "Food/Beverages"},
    {categoryName: "Communication"},
]

const seedCategory=async()=>{
    try {
        const datas = await Category.findAll();        
        if (datas.length === 0) {
            await Category.bulkCreate(categoryData); // Insert multiple records
            console.log("Category seeded successfully");
        } else {
            console.log("Category already seeded");
        }
    } catch (error) {
        console.error("Error seeding category:", error);
    }
}


//add category
export const addCategory=async(req,res)=>{
    const {categoryName}=req.body
    const category=await Category.create({categoryName})
    res.status(200).json({message:"Category is successfully added",data:category})
}

//get category
export const getCategory=async(req,res)=>{
    const category=await Category.findAll();
    res.status(200).json({message:"Successfully fetch all the category",data:category})
}

//delete category
export const deleteCategory=async(req,res)=>{
    const id=req.params.id
    const category=await Category.findAll({where:{id:id}})
    if (category.length>0){
        await Category.destroy({where:{id:id}})
        res.status(200).json({message:"Category deleted!"})
    }
}

//update category
export const updateCategory=async(req,res)=>{
    const id=req.params.id
    const {categoryName}=req.body
    const category=await Category.update({categoryName},{where:{id:id}})
    res.status(200).json({message:"Successfully update the category",data:category})
}


export default seedCategory