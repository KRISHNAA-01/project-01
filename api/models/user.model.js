// import mongoose from "mongoose";

// const userSchema=new mongoose.Schema({
//     username:{
//         type:String,
//     required:true,
//     unique:true,
//     },
//     email:{
//         type:String,
//     required:true,
//     unique:true,
//     },
//     password:{
//         type:String,
//     required:true,
    
//     },
//     avatar:{
//         type:String,
//         default: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
        

//     }
// },{timestamps:true});
// const User=mongoose.model('User',userSchema);
// export default User;


import mongoose from "mongoose";
// user.model.js
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false, // Ensure only specific users have this set to true in the DB
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
