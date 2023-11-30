import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import 'antd/dist/reset.css'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/searchContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <SearchProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </SearchProvider>
  </AuthProvider>
)
