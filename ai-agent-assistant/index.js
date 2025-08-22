import express from 'express'
const app=express()
import mongoose from 'mongoose'
import cors from 'cors'
import env from 'dotenv'
env.config()
const PORT=process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected Successfully ✌️")).catch((err)=>console.log("Error Occured"));
app.listen(PORT,()=>{
    console.log("Server is created 🥹")
})