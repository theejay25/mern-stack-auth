import express from 'express';
import cors from 'cors';
import database from './databases/connectToDatabase.js'
import dotenv from 'dotenv';
import authroutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(express.json()); 
app.use(cookieParser()) // for reading cookies
app.use('/api/auth', authroutes)

app.get('/', (req, res) => {
    res.status(200).json({success: true ,messsage: 'GOD IS GOOD' })
})


app.listen(5050, () => {
    database()
    console.log('Server is running on http://localhost:5050');
})

