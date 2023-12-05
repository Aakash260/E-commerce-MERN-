import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
const users = () => {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
  const [changeStatus, setChangeStatus] = useState("")
  const [order, setOrder] = useState([])
  const [auth] = useAuth()
  const getOrders = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/admin-order`)
      setOrder(data)
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

   
  const handleChange= async(id,value)=>{
  try {
  const {data}=await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/order-status/${id}`,{status:value})
  getOrders()
  } catch (error) {
   console.log(error)
  }
  }

  return (
    <div>
         <table className="table-fixed border">
  <thead>
    <tr className='border'>
      <th>#</th>
      <th>Image</th>
      <th>Status</th>
      <th>Buyer</th>
      <th>Date</th>
      <th>Payment</th>
      <th>Quantity</th>
 
    </tr>
  </thead>
  <tbody>
   {order.map((item,i)=>{
    return <tr key={i}>
      <td>{i+1}</td>
      <td><img className="w-full h-20 object-cover" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item?.products[0]?._id}`} alt='ProductPic '/></td>
      <td>
        
<div>
  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>handleChange(item._id,e.target.value)}>
    <option value={item.status} selected>{item.status}</option>
    <option value="Not Process">Not Process</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancel">Cancel</option>
  </select>
</div>


        {/* {item?.status} */}
        </td>
      <td>{item?.buyer?.name}</td>
      <td>{moment(item.createdAt).fromNow()}</td>
      <td>{item?.payment?.success?"Success":"Fail"}</td>
      <td>{item?.products?.length}</td>
    </tr>
   })} 
  </tbody>
</table>
    </div>
  )
}

export default users