import categoryModel from './../models/categoryModel.js';





class CategoryController{
    static getAllCategories = async(req,res)=>{
        try{
        const fetchAllCategories = await categoryModel.find({});//find empty bec we want to fetch all categories that are present
        return res.status(200).json(fetchAllCategories);
        }catch(error){
            return res.status(400).json({"message":error.message})
        }

    }
    static addNewCategory = async(req,res)=>{
        const {title} = req.body;
        try{
            if(title){
                const newCategory = new categoryModel({
                    title,
                });
                const savedCategory = await newCategory.save();
                if(savedCategory){
            return res.status(200).json({ message: "category added successfully" });

                }
            }else{
            return res.status(400).json({ message: "all fields are required" });
            }
        }catch(error){
            return res.status(400).json({ message: error.message });

        }
        }

 }

 export default CategoryController;