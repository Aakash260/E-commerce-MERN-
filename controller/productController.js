import productModel from "../models/productModel.js"
import fs from 'fs'
import slugify from "slugify"

export const createProductController=async(req,res)=>{
    
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files
        switch (true) {
            case !name:
                return res.status(400).send({error:'Name is Required'})
            case !description:
                return res.status(400).send({error:'Description is Required'})
            case !price:
                return res.status(400).send({error:'Price is Required'})
            case !category:
                return res.status(400).send({error:'Category is Required'})
            case !quantity:
                return res.status(400).send({error:'Quantity is Required'})
             
            case photo && photo.size>1000000:
                return res.status(400).send({error:'Photo is required size less 1mb'})
        
        }
        const products=new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product created Successfully',
            products
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in creating Product',
           error
        })
    }
}

 
export const getProductController = async(req,res) => {
  try {
    const products=await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
    res.status(200).send({
        success:true,
        message:'All Products',
        products,
        total:products.length
    })
  } catch (error) {
    res.status(500).send({
        success:false,
        message:'Error in fetching Product',
       error
    })
  }
}
 

export const getSingleProductController= async(req,res) => {
  try {
    const product=await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category')
    res.status(201).send({
        success: true,
        message: 'Single product',
        product
    })
  } catch (error) {
    res.status(500).send({
        success:false,
        message:'Error in fetching product',
       error
    })
  }
}


 
export const productPhotoController = async(req,res) => {
  try {
    const product=await productModel.findById(req.params.pid).select('photo')
    if(product.photo.data){
        res.set('Content-type',product.photo.contentType)
        return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    res.status(500).send({
        success:false,
        message:'Error in fetching product',
       error
    })
  }
}


 
export const deleteProductController = async(req,res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).send({
        success:true,
        message:'product delete successfully'
    })
  } catch (error) {
    res.status(500).send({
        success:false,
        message:'Error in deleting product',
       error
    })
  }
}


export const updateProductController = async(req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files
        switch (true) {
            case !name:
                return res.status(400).send({error:'Name is Required'})
            case !description:
                return res.status(400).send({error:'Description is Required'})
            case !price:
                return res.status(400).send({error:'Price is Required'})
            case !category:
                return res.status(400).send({error:'Category is Required'})
            case !quantity:
                return res.status(400).send({error:'Quantity is Required'})
             
            case  photo && photo.size>1000000:
                return res.status(400).send({error:'Photo is required size less 1mb'})
        
        }
        const products= await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product updated Successfully',
            products
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in updating Product',
           error
        })
    }
}


