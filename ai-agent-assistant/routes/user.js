import express from 'express'
import { getUser, login, logout, signup, updateUser } from '../controllers/user.js';
import { authentiicate } from '../middleware/auth.js';
const router=express.Router();
router.post("/update-user",authentiicate,updateUser)
router.get("/users",authentiicate,getUser)
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout)
export default router;