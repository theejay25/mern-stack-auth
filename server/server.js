import express from 'express';
import cors from 'cors';
import database from './databases/connectToDatabase.js'
import dotenv from 'dotenv';
import authroutes from './routes/auth.js';
dotenv.config();

const app = express();

app.use(cors('http://localhost:5173'));
app.use(express.json()); 
app.use('/api/auth', authroutes)

app.get('/', (req, res) => {
    res.json('GOD IS GOOD')
})


app.listen(5050, () => {
    database()
    console.log('Server is running on http://localhost:5050');
})

