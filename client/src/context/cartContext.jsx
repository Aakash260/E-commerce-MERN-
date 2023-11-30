import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
const CartContext = createContext()

const CartProvider = ({ children }) => {

   const [cart, setCart] = useState([])
   useEffect(() => {
      let localCart = localStorage.getItem('cart')
      if (localCart) setCart(JSON.parse(localCart))
   }, [])

   return <CartContext.Provider value={[cart, setCart]}>
      {children}
   </CartContext.Provider>
}
const useCart = () => useContext(CartContext)
export { CartProvider, useCart }