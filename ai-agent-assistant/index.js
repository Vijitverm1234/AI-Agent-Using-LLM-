import express from 'express'
const app=express()
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import {serve} from "inngest/express"
import userRouter from './routes/user.js'
import ticketRouter from './routes/ticket.js' 
import { inngest } from './inngest/client.js'
import {onUserSignup} from "./inngest/functions/on-signup.js"
import {onTicketCreated} from "./inngest/functions/on-ticket-create.js"
dotenv.config()

const PORT=process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
app.use("/api/auth",userRouter)
app.use("/api/ticket",ticketRouter);
app.use("/api/inngest",serve({
    client:inngest,
    functions:[onUserSignup,onTicketCreated]
}));
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected Successfully ✌️")).catch((err)=>console.log("Error Occured"));
app.listen(PORT,()=>{
    console.log("Server is created 🥹")
})