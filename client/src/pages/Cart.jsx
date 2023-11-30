import React from 'react'
import {useCart} from '../context/cartContext'
import {useAuth} from '../context/auth'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart([])
  const navigate=useNavigate()

const handleDelete=(pid)=>{
try {
  let myCart=[...cart]
  let index=myCart.findIndex(item=>item._id===pid)
  myCart.splice(index,1)
  setCart(myCart)
  localStorage.setItem('cart',JSON.stringify(myCart))
} catch (error) {
  console.log(error)
}
}

const Total=()=>{
  let total=0;
 cart.map((item)=>item.price).reduce((acc,ele)=>{
   return total=acc+ele
  },0)
 return total
}
 
  return (
    <div>
      <div className="text-2xl font-semibold mb-2 text-center">Hello,{auth?.token ? auth?.user?.name:
     <button onClick={()=>navigate('/login',{state:'/cart'})} className='px-4 py-1 mt-2 rounded-md bg-[#111827] text-white font-bold '>
        Please Login to checkout
        </button>}</div>
      {cart?.length?`You have ${cart.length} items in the cart`:`Your cart is empty`}     
     <div>
      <div>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          {`
            #summary {
              background-color: #f6f6f6;
            }
          `}
        </style>
      </div>
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
               
              </div>
              {/* Product 1 */}
              <div className="flex-row justify-center hover:bg-gray-100 -mx-8 px-6 py-5">
                {/* Product details */}
              {cart.map((item)=>(
                
               <div key={item._id} className="flex w-2/5 m-4">
                  <div className="w-20">
                    <img className="h-24" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`} alt="productImage" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-red-500 text-xs">{item.category.name}</span>
                    <span className="text-center w-1/5 font-semibold text-sm">Rs:{item.price}</span>
                    <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={()=>handleDelete(item._id)}>Remove</a>
                  </div>
                </div>     

              ))}   
              </div>

              {/* Product 2 */}
              {/* ... (similar structure for other products) ... */}

              <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>

            {/* Order Summary */}
            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items 3</span>
                <span className="font-semibold text-sm">Rs:{Total()}/-</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>Rs:{Total()}/-</span>
                </div>
                <button onClick={navigate('/')} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
              </div>
              </div>
     </div>
    </div>
    </div>
    </div>
  )
}

export default Cart