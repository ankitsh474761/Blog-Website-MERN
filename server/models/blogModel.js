import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:                    {type:String},
    category:                 {
        type:mongoose.Schema.Types.ObjectId,   //one to one relationship it will refer to categoryModel
    refer:                
        "categories"},

    description:           {type:String},
    thumbnail:             {type:String},
    user:                  {
        type:mongoose.Schema.Types.ObjectId,
        refer:"users"
    }
})

const blogModel = mongoose.model("blogs",blogSchema);

export default blogModel;