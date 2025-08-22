import mongoose from "mongoose"
const ticketScheme=new mongoose.Schema({
   title:{type:String, required:true},
   description:{type:String},
   status:{type:String,default:"TODO"},
   createBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
   assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null},
   priority:{type:String},
   deadline:{type:String},
   helpfulNotes:{type:String},
   relatedSkills:[String],
   createdAt:{type:Date,default:Date.now}
})
export default mongoose.model("Ticket",ticketScheme)