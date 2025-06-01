import User from "../models/users.js";
import bcrypt from 'bcrypt'
import { generateVerificationToken } from "../utilities/generateverificationToken.js";
import { generateJWTToken } from "../utilities/generateJWTToken.js";

export const signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        
        const sameEmail =  await User.findOne({ email });

        if (sameEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = generateVerificationToken(); // Assuming you have a function to generate a token


        const newUser = new User({
            name, 
            email, 
            password: hashedPassword, 
            verificationToken: verificationToken , 
            verifiedTokenExpiresAT: Date.now() + 24 * 60 * 60 * 1000 // Token valid for 24 hours
        })

        await newUser.save();

        generateJWTToken(res, User._id)

        return res.status(200).json({
            success: true, 
            message: 'User created successfully', 
            user: {
                userInfo: newUser._doc,
                password: undefined
            } });
        

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error', error: error.message });
    }

}
export const login = async (req, res) => {
    res.send('login route is working');

}
export const logout = async (req, res) => {
    res.send('logout route is working');

}