import React from 'react'
import AdminMenu from './AdminMenu'
import AdminScreen from './AdminScreen'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  return (
    <div className='flex h-[85vh]'>
        <div className='border border-b-2 w-[20vw]'><AdminMenu/></div>
        <div className='border border-b-2 w-full'><Outlet/></div>
    </div>
  )
}

export default AdminDashboard