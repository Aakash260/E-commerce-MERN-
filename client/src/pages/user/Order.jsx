import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'
const Order = () => {

  const [order, setOrder] = useState([])
  const [auth] = useAuth()

  const getOrders = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/order`)
      setOrder(data)
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])


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
      <td>{item?.status}</td>
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

export default Order