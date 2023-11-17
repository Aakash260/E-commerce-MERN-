import React from 'react'
import { Link } from 'react-router-dom'
const AdminMenu = () => {

  
  return (
  <div className="flex flex-col gap-4">
  <span className="mb-4 font-bold">Admin Panel</span>
   
  <Link to='/dashboard/admin/create-category'>
      <div className="flex-1 bg-blue-500 p-4">
        Create Category
      </div>
  </Link>
    
  <Link to='/dashboard/admin/create-product'>
      <div className="flex-1 bg-green-500 p-4">
       Create Product
      </div>
  </Link>
 
  <Link to='/dashboard/admin/users'>
      <div className="flex-1 bg-yellow-500 p-4">
        Users
      </div>
  </Link>
</div>

  )
 

}

export default AdminMenu