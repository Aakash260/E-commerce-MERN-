import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Order = () => {

  const [order, setOrder] = useState([])
  const [auth] = useAuth()

  const getOrders = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/order`)
      setOrder(data)
    
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])


  return (
    <div>Order</div>
  )
}

export default Order