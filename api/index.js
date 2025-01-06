
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"

const app =  express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is connected")}).catch(err=>{
        console.log(err);
    })
app.use('/api/user', userRoutes)

app.listen(3000,()=>{
    console.log('server is listening to port 3000!');   
})

