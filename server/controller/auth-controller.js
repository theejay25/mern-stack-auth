import User from "../models/users.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateVerificationToken } from "../utilities/generateverificationToken.js";
import { generateJWTToken } from "../utilities/generateJWTToken.js";
import {sendEmail, sendPasswordResetEmail, sendWelcomeEmail, sendSuccessfulResetPassword} from "../email/email.js";

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

export const forgotPassword = async (req, res) => {
    
    const { email } = req.body;

    
    try {

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({success: false, message: 'User does not exist'})
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("hex");

        const resetPasswordExpiresAT = Date.now() + 1 * 60 * 60 * 1000; // 1 hr

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAT = resetPasswordExpiresAT

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

        return res.status(200).json({success:true, message: 'Check email for passowrd reset token'})

    } catch(error) {
        console.log('error in sending email', error)
        return res.status(500).json({success: false, message: 'Error sending password reset'})
    }
}

export const resetPassword = async (req, res) => {
    try {
        
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpiresAT: {$gt: Date.now()}
         })

         if(!user) {
            return res.status(401).json({success: false, message:'invalid or expired reset token'})
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         user.password = hashedPassword
         user.resetPasswordToken = undefined
         user.resetPasswordExpiresAT = undefined

         await user.save()

        await sendSuccessfulResetPassword(user.email)

        return res.status(200).json({success: true, message: 'successfully reset your password!'})

    } catch (error) {
        console.log('error in reseting email', error);
        return res.status(500).json({success: false, message: 'error in reseting email'})
    }
}


export const checkAuth = async (req, res) => {
    
}