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

export default { sendWelcomeEmail, sendEmail }




