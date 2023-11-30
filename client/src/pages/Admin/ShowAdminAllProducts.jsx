import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const ShowAdminAllProducts = () => {
const [all_Products, setAll_Products] = useState([])
const getAllProduct=async()=>{
  try {
    const {data}= await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product`)
    setAll_Products(data.products)
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
   getAllProduct()
  }, [])
  // console.log(all_Products)
  return (
    <>
    <div className="text-center p-4 font-extrabold">All Products</div>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[75vh] overflow-y-scroll'>
      
      {all_Products.map((e)=>
     <Link key={e._id} to={`/dashboard/admin/viewAll-product/${e.slug}`}>
       <div className="w-[24vw] h-[50vh] mx-auto bg-white rounded-xl overflow-hidden shadow-md grid m-2">
          <img className="w-full h-48 object-fill" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${e._id}`} alt='ProductPic '/>
          <div className="p-3">
            <div className="font-bold text-xl mb-2">{e.name}</div>
            <p className="text-gray-700 text-base">{e.description}</p>
          </div>
        </div>
     </Link> 
      )}
 
      
    </div>
    </>
  )
}

export default ShowAdminAllProducts