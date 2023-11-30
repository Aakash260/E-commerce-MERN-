import React from 'react'
import { Link } from 'react-router-dom'
const UserMenu = () => {

  
  return (
  <div className="flex flex-col gap-4">
  <span className="mb-4 font-bold">User Panel</span>
   
  {/* <Link to='/dashboard/user/profile'>
      <div className="flex-1 bg-blue-500 p-4">
        Profile
      </div>
  </Link> */}
    
  <Link to='/dashboard/user/order'>
      <div className="flex-1 bg-green-500 p-4">
       Orders
      </div>
  </Link>
 
 
</div>

  )
 

}

export default UserMenu