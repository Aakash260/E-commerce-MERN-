import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController } from '../controller/productController.js';
import formidable from "express-formidable"
const router=express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
export default router