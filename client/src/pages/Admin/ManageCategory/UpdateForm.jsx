import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const UpdateForm = ({ updateName, categoryId,getCategory }) => {
   const [categoryName, setCategoryName] = useState(updateName)
   const [CategoryId, setCategoryId] = useState(categoryId)
    
    
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/category/update-category/${CategoryId}`, { name: categoryName })
         if (data.category.name) {
            getCategory()  
            toast.success('Category Updated Successfully!', {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "colored",
             });
         }
       
      } catch (error) {
         console.log(error)
      }
   }
   
   useEffect(() => {
      setCategoryName(updateName)
      setCategoryId(categoryId)
   }, [updateName, categoryId]);

 
   
 
   return (
      <form className='text-center p-4' onSubmit={handleSubmit}>
         <ToastContainer />
         <label htmlFor="getCategory" />
         <input id="getCategory" type="text" className='text-center rounded-sm' placeholder='Update Category' name='category' value={categoryName} onChange={(e) => { setCategoryName(e.target.value); }} />
         <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Submit</button>
      </form>
   )
}

export default UpdateForm