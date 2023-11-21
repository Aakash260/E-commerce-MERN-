import { useEffect, useState } from "react"
import axios from 'axios'
 
import { ToastContainer, toast } from 'react-toastify';

 import ProductForm from "./ProductForm";
const CreateProducts = () => {

 return <div>
      <div className="text-center p-4 font-extrabold ">Manage Products</div>
      <ProductForm/>
  </div>

   
 
  
}

export default CreateProducts