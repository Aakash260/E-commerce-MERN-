import express from 'express'
import { requireSignIn,isAdmin } from '../middleware/authMiddleware.js';
import { registerController, loginController } from '../controller/authController.js';
 
 import { ForgotPassword } from '../controller/authController.js';
const router=express.Router();

router.post('/register',registerController)

router.post('/login',loginController)

// router.post('/test',requireSignIn,isAdmin,(req,res)=>{
// res.send('protected')
// })

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.post('/forgot-password',ForgotPassword)

 
export default router;