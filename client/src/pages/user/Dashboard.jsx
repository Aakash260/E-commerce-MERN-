import React from 'react'
import UserMenu from './UserMenu'
import { Outlet } from 'react-router-dom'
const  Dashboard = () => {
  return (
    <div className='flex h-[85vh]'>
        <div className='border border-b-2 w-[20vw]'><UserMenu/></div>
        <div className='border border-b-2 w-full'><Outlet/></div>
    </div>
  )
}

export default  Dashboard