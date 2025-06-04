import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { verificationEmailTemplate, welcomeEmailTemplate } from './email-template.js';
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:process.env.HOST,
  port:process.env.PORT,
  secure:true,
  auth: {
    user: process.env.user,
    pass: process.env.PASSWORD 
  },
  tls: {
    rejectUnauthorized: false // 👈 THIS fixes the self-signed certificate issue
  }
});

const sendEmail = async (email, verificationToken) => {

    try {

        await transporter.sendMail({
        from: 'jaytemporary1@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        html: verificationEmailTemplate.replace('{verificationToken}', verificationToken)

        })
        
        console.log('Email sent successfully');

    } catch (error) {

        console.log('Error sending email:', error);

    }

}

const sendWelcomeEmail = async (email, name) => {

    try {

        await transporter.sendMail({
        from: 'jaytemporary1@gmail.com',
        to: email,
        subject: 'Welcome to Our Services',
        html: welcomeEmailTemplate.replace('{name}', name)

        })
        
        console.log('Email sent successfully');

    } catch (error) {

        console.log('Error sending email:', error);

    }

}


const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    transporter.sendMail({
      from: 'jaytemporary1@gmail.com',
      to: email,
      subject: 'Reset your password',
      html: `Click <a href='${resetURL}'>Here</a> to reset your password`
    })
  } catch (error) {
    console.log('error sending reset email', email)
  }
} 

const sendSuccessfulResetPassword = async (email) => {
  try {
    
    transporter.sendMail({
      from: 'jaytemporary1@gmail.com',
      to:email,
      subject: 'Email reset Successful',
      text: 'You have succesfully reset your email. You can now log in with your new email'
    })

  } catch (error) {
    console.log('error sending a successful email', error)
    return resizeBy.status(500).json({success: false, messae: 'error sending a successful email'})
  }
}


export { sendWelcomeEmail, sendEmail, sendPasswordResetEmail, sendSuccessfulResetPassword }




