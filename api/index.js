
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app =  express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is connected")}).catch(err=>{
        console.log(err);
    })


app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(3000,()=>{
    console.log('server is listening to port 3000!');
    
    
})