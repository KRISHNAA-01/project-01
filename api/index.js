import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connectedd to db");
    
}).catch((err)=>{
    console.log(err);
    
});
const app =express();
const port = 3000;
app.use(express.json());

app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`);
    
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message=err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});