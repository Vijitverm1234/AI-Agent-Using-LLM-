import jwt, { decode } from "jsonwebtoken"
export const authenticate=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"access denied"})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        res.user=decoded
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid token"})
    }
}