import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import itemRouter from './routes/item.route.js'
import cartRouter from './routes/cart.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import adminRouter from './routes/admin.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connectedd to db");
    
}).catch((err)=>{
    console.log(err);
    
});

const app =express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`);
    
    
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/item",itemRouter);
 app.use("/api/cart", cartRouter);
app.use('/api/admin', adminRouter);

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message=err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});