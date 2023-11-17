import React from 'react'
import { useAuth } from '../../context/auth'

const UserScreen = () => {
    const [auth]=useAuth()
  return (
    <div>Welcome User-<span className='font-bold'>{auth?.user?.name}<br/>
    {auth?.user?.email}<br/>
    {auth?.user?.phone}</span></div>
  )
}

export default UserScreen