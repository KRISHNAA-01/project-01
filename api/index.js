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
import orderRouter from './routes/order.route.js'
import feedbackRouter from "./routes/Feedback.js";
import  reviewRouter from "./routes/review.route.js"
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connectedd to db");
    
}).catch((err)=>{
    console.log(err);
    
});

const app =express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

const corsOptions = {
    origin: "https://laxmifurn-krishnaa-01-krishnas-projects-5eec90f6.vercel.app/", // Use the exact origin of your frontend
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));


app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`);
    
    
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/item",itemRouter);
 app.use("/api/cart", cartRouter);
app.use('/api/admin', adminRouter);
app.use('/api/order', orderRouter);
app.use("/api/feedback", feedbackRouter); // Feedback routes
app.use("/api/review",reviewRouter);


import Razorpay from 'razorpay';
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
app.post('/test-razorpay', async (req, res) => {
    try {
      const order = await razorpay.orders.create({ amount: 100, currency: "INR" });
      res.json(order);
    } catch (error) {
      console.log("Test error:", error);
      res.status(500).json(error);
    }
  });
  
app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message=err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});