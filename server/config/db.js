import mongoose from "mongoose";

const connectToMongo = async()=>{
    const res = await mongoose.connect(process.env.MONGO_URL);
    if(res){
        console.log("connected successfully");
    }else{
        console.log("check your connection");
    }
}

export default connectToMongo;
