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
import AdminScreen from './pages/Admin/AdminScreen.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import 'react-toastify/dist/ReactToastify.min.css';
 import Private from './components/route/Private.jsx'
 import ForgotPassword from './pages/ForgotPassword.jsx'
 import AdminRoute from './components/route/AdminRoute.jsx'
 import CreateCategory from './pages/Admin/ManageCategory/createCategory.jsx'
 import CreateProducts from './pages/Admin/ManageProducts/createProducts.jsx'
 import Users from './pages/Admin/users.jsx'
 import Profile from './pages/user/Profile.jsx'
 import Order from './pages/user/Order.jsx'
 import ProductDetails from './pages/ProductDetails.jsx'
 import UserScreen from './pages/user/UserScreen.jsx'
 import ShowAdminAllProducts from '../src/pages/Admin/ShowAdminAllProducts.jsx'
 import SingleProduct from './pages/Admin/ManageProducts/SingleProduct.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search.jsx'
 
const App = () => {
  return (
    <>
    <BrowserRouter>
       
      <Header/>
      <div className='min-h-[79vh] grid'>
        <Routes>
            <Route path='/' index element={<Homepage/>}/>
            <Route path='/about'  element={<About/>}/>
            <Route path='/productDetails/:slug'  element={<ProductDetails/>}/>
            <Route path='/search'  element={<Search/>}/>
            <Route path='/dashboard'  element={<Private/>}>
            <Route path='user'  element={<Dashboard/>}>
            <Route path=''  element={<UserScreen/>}/>
            <Route path='profile'  element={<Profile/>}/>
            <Route path='order'  element={<Order/>}/>
            </Route>
            </Route>
            <Route path='/dashboard'  element={<AdminRoute/>}>
            <Route path='admin'  element={<AdminDashboard/>}>
            <Route path=''  element={<AdminScreen/>}/>
            <Route path='create-category'  element={<CreateCategory/>}/>
            <Route path='create-product'  element={<CreateProducts/>}/>
            <Route path='viewAll-product'  element={<ShowAdminAllProducts/>}/>
            <Route path='viewAll-product/:slug'  element={<SingleProduct/>}/>
            <Route path='users'  element={<Users/>}/>
            </Route>
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