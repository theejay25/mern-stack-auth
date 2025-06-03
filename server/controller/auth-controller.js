import User from "../models/users.js";
import bcrypt from 'bcrypt'
import { generateVerificationToken } from "../utilities/generateverificationToken.js";
import { generateJWTToken } from "../utilities/generateJWTToken.js";
import {sendEmail, sendWelcomeEmail} from "../email/email.js";

export const signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        
        const sameEmail =  await User.findOne({ email });

        if (sameEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const theVerificationToken = generateVerificationToken(); // Assuming you have a function to generate a token


        const newUser = new User({
            name, 
            email, 
            password: hashedPassword, 
            verificationToken: theVerificationToken, 
            verifiedTokenExpiresAT: Date.now() + 24 * 60 * 60 * 1000 // Token valid for 24 hours
        })

        await newUser.save();

        generateJWTToken(res, newUser._id)

        await sendEmail(newUser.email, theVerificationToken); // Assuming you have a function to send email

        return res.status(200).json({
            success: true, 
            message: 'User created successfully', 
            user: {
                 ...newUser._doc,
                password: undefined
            } });
        

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error', error: error.message });
    }

}
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({success: false, message: 'User with this email does not exist'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({success: false, message: 'Incorrect password'});
        }

        const isVerified = user.isVerified;

        if(!isVerified) {
            return res.status(400).json({success: false, message: 'Please verify your email first'});
        }

        generateJWTToken(res, user._id);
        return res.status(200).json({ success: true, message: 'User logged in successfully'})

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error', error: error.message });
    }

}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the JWT token cookie
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }

}
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        
        const user = await User.findOne({ 
            verificationToken: code,
            verifiedTokenExpiresAT: { $gt: Date.now() }
        });

        if(!user) {
            return res.status(400).json({success: false, message: 'Invalid or expired verification token'});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verifiedTokenExpiresAT = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name); // Assuming you have a function to send email

        return res.status(200).json({success: true, message: 'Email verified successfully', });

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error', error: error.message });
    }
}