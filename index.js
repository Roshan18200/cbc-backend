import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './router/orderRouter.js';
import dotenv from "dotenv";
dotenv.config()
import cors from 'cors';


const app =express();
app.use(cors({
    origin:"*"
}))



mongoose.connect(process.env.MONGO_URL).then(
()=>{
console.log ("connected to the database");
}
).catch(
()=>{
    console.log("connection failed")
}
)



app.use(bodyParser.json());
app.use(verifyJWT)

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/order",orderRouter)



app.listen(3000,()=>{
    console.log("Server is running port 3000");
})





