import React, { useState } from 'react';
import axios from 'axios';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { email, favoriteSport, password });
 try {
    const res=await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`,
    {email, answer:favoriteSport, newPassword:password })
    // email,answer,newPassword
    if(res.data.success){
        console.log('reset Successfull')
    }else{
        console.log('error')
    }
 } catch (error) {
    console.log(error)
 }
};

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="favoriteSport" className="block text-sm font-medium text-gray-600">
            Favorite Sport
          </label>
          <input
            type="text"
            id="favoriteSport"
            name="favoriteSport"
            value={favoriteSport}
            onChange={(e) => setFavoriteSport(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
           New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
        Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
