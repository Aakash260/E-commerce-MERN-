import React from 'react'
import { useAuth } from '../../context/auth'
const AdminScreen = () => {
    const [auth]=useAuth()
  return (
    <div>Welcome Admin-<span className='font-bold'>{auth?.user?.name}<br/>
    {auth?.user?.email}<br/>
    {auth?.user?.phone}</span></div>
  )
}

export default AdminScreen