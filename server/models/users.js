import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    isVerified:{type: Boolean, default: false},
    resetPasswordToken:String,
    resetPasswordExpiresAT:Date,
    verificationToken:String,
    verifiedTokenExpiresAT:Date
})

const User = mongoose.model("User", userSchema);
export default User;