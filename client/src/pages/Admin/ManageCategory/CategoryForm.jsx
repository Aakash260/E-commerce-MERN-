import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const CategoryForm = ({getCategory}) => {
   const [categoryName, setCategoryName] = useState("")
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const {data} = await axios.post(`${import.meta.env.VITE_API}/api/v1/category/create-category`, { name:categoryName })
         if(data.success){
            console.log('created')
            getCategory();
            setCategoryName('')
         }
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <form className='text-center p-4' onSubmit={handleSubmit}>
         <label htmlFor="getCategory" />
         <input id="getCategory" type="text" className='text-center rounded-sm' placeholder='Create Category' name='category' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
         <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Submit</button>
      </form>
   )
}

export default CategoryForm