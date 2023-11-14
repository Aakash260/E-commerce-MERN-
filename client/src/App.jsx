import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Contact from './pages/Contact'
import About from './pages/About'
import Policy from './pages/Policy'
import Category from './pages/Category'
import PagenotFound from './pages/PagenotFound'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import 'react-toastify/dist/ReactToastify.min.css';
 import Private from './components/route/Private.jsx'
 import ForgotPassword from './pages/ForgotPassword.jsx'
 import AdminRoute from './components/route/AdminRoute.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header/>
       
      <div className='min-h-[79vh]'>
        <Routes>
            <Route path='/' index element={<Homepage/>}/>
            <Route path='/about'  element={<About/>}/>
            <Route path='/dashboard'  element={<Private/>}>
            <Route path='user'  element={<Dashboard/>}/>
            </Route>
            <Route path='/dashboard'  element={<AdminRoute/>}>
            <Route path='admin'  element={<AdminDashboard/>}/>
            </Route>
            <Route path='/forget-password' element={<ForgotPassword/>}/>
            <Route path='/contact'  element={<Contact/>}/>
            <Route path='/policy'  element={<Policy/>}/>
            <Route path='/category'  element={<Category/>}/>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/register'  element={<Register/>}/>
            <Route path='/cart'  element={<Cart/>}/>
            <Route path='*'  element={<PagenotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </> 
  )
}

export default App