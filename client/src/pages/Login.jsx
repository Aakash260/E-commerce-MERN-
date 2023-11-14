import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/auth';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login() {
  const [auth,setAuth1]=useAuth()
  const navigate=useNavigate();
  const location=useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can add your login logic here, such as making an API request.
    const { email, password } = formData
   
    try {
      const res=await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`,
      {email,password})
      if(res.data.success){
        toast.success('User Login Successfully!', {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "colored",
             });
             setAuth1({
              user:res.data.user,
              token:res.data.token
             })
              
               localStorage.setItem('auth',JSON.stringify(res.data))
             setTimeout(() => {
               navigate(location.state||'/')
             }, 3000);
             }else{
              toast.error('Invalid Credentials!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
             }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="max-w-md mx-auto">
       <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
       
      </form>
      <Link to='/forget-password'>
        <div className="flex items-center justify-between">
            <button
             
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Forgot Password
            </button>
          </div>
      </Link>
    </div>
  );
}

export default Login;
