import express from "express"
import connectToMongo from "./config/db.js";
import router from "./routes/blog.js";
import cors from "cors"
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables from .env file



connectToMongo();
const app = express();
app.use(cors())
app.use(express.json());

app.use(express.static('public/upload'));

const PORT = process.env.PORT;


app.get('/',(req,res)=>{
    res.send('api is running');
})

//API ROUTES

app.use("/api/v1",router);


app.listen(PORT,()=>{
    console.log(`api is running on http://localhost:${PORT}`);
})