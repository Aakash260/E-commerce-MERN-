import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const ProductDetails = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`)
      setProduct(data.product)
      getSimilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/related-products/${pid}/${cid}`)
      setRelatedProduct(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Product Details</h1>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-[50vh] h-64  object-fill rounded" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>

              <p className="leading-relaxed">{product.description}</p>
              <p className="leading-relaxed">{product?.category?.name}</p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Rs.{product.price}/-</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add Cart</button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='text-gray-400 body-font overflow-hidden'>
        <h3>Similar Products</h3>
        <div className='grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[75vh] gap-2'>
          {relatedProduct && relatedProduct.map((e) =>

            <div key={e._id} className="w-[24vw] h-[60vh] mx-auto bg-white rounded-xl overflow-hidden shadow-md grid ">
              <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${e._id}`} alt='ProductPic ' />
              <div className="p-5 pb-1">
                <div className="font-bold text-sm">{e.name}</div>
                <div className="font-bold text-sm">Rs:{e.price}</div>
                <p className="text-gray-700 text-sm">{e.description.slice(0, 10)}...</p>
              </div>
              <div className='flex justify-around'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(`/productDetails/${e.slug}`)}>Details</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cart</button>
              </div>
            </div>

          )}
        </div>
      </section>
    </div>
  )
}

export default ProductDetails