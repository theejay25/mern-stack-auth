import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
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
        html: `verify your email address with this token ${verificationToken}`

        })
        
        console.log('Email sent successfully');

    } catch (error) {

        console.log('Error sending email:', error);

    }

}

export default sendEmail




