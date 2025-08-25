import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user";
import { inngest } from "../inngest/client.js";
export const signup = async (req, res) => {
  const { email, password, skills = [] } = req.body;
  try {
    const hashed = bcrypt.hash(password, 10);
    const user=await User.create({ email, password: hashed, skills });
    //fire inngest event
    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    });
    const token=jwt.sign({_id:user._id,role:user.role},
        process.env.JWT_SECRET
    )
    res.json({user,token})
  } catch (error) {
    res.status(500).json({message:"Something bad in signup"})
  }
};
export const login = async (req, res) => {
   const {email,password}=req.body;
   try {
      const user=User.findOne({email})
      if(!user){
        return res.status(401).json({message:"user not found"})
      }
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
  return res.status(401).json({message:"Password being incorect"})
      }
        const token=jwt.sign({_id:user._id,role:user.role},
        process.env.JWT_SECRET
    )
    res.json({user,token})
   } catch (error) {
      res.status(500).json({message:"Something bad in Loginin"})
   }
}    
export const logout=async ( req,res)=>{
   try {
    const token= req.headers.authorization.split("")[1]
    if(!token){
          res.status(400).json({message:"No Token"})
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
              res.status(400).json({message:"Something bad in signout "})
        }
        res.json({message:"signout"})
    })
   } catch (error) {
    
   }
}
export const updateUser=async(req,res)=>{
    const {skills=[]}=req.body
}