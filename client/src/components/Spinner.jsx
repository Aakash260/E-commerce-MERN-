import React from 'react'
 import { useNavigate } from 'react-router-dom'
 import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(5)
    const navigate=useNavigate()
    const location=useLocation()
 useEffect(() => {
   const interval=setInterval(() => {
    setCount((prev)=>--prev)
   }, 1000);
  count ===0 && navigate(`/${path}`,{
    state:location.pathname
  })
  return ()=>clearInterval(interval)
 }, [count,navigate,location,path])
 
  return (
    
        <div className='h-96 grid place-items-center'>
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"> </div>
         Seems you are logout - Redirecting to Home Page in {count}s
        </div>
       
      
  )
}

export default Spinner