
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"
import authRoutes from './routes/auth.route.js';
import connectDB from './db/dbConnection.js';

const app =  express();
dotenv.config();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes

app.use('/api/user', userRoutes)
app.use('/api/auth',authRoutes)


//port and connection
app.listen(3000,()=>{
    console.log('server is listening to port 3000!');  
    connectDB(); 
})

