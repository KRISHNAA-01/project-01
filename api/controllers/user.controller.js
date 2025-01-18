import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Review from '../models/review.model.js';
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test =(req,res)=>{
    res.json({
        "status": "Success!!, test api is working",
    });
};

export const updateUser= async  (req,res,next)=>{
if(req.user.id !== req.params.id) return next(errorHandler(401, "you can only update yoyr own account !"))
    try{
if(req.body.password){
    req.body.password= bcryptjs.hashSync(req.body.password, 10)
}
    const updatedUser= await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
    }, {new: true} )
    const {password, ...rest}=updatedUser._doc

    res.status(200).json(rest);
} catch(error){
    next(error)
}
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await User.findByIdAndDelete(req.params.id);
        // Remove user's cart
        await Cart.deleteOne({ user: req.params.id });

        // Remove user's orders
        await Order.deleteMany({ user: req.params.id });

        // Remove user's reviews
        await Review.deleteMany({ user: req.params.id });

        // Clear cookies and send response
        res.clearCookie('access_token');
        res.status(200).json('User and related data have been deleted!');
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };


export const verifyPassword = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) return next(errorHandler(404, 'User not found'));
  
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) return next(errorHandler(401, 'Incorrect password'));
  
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };