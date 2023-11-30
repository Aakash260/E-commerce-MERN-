import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Price from './PriceFilter'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { ToastContainer, toast } from 'react-toastify';
const Homepage = () => {
  const [cart,setCart]=useCart()
const navigate=useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setcategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getproducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`)
      const data = await res.json()
      setLoading(false)
      setProducts(data.products)

    } catch (error) {
      console.log(error)
    }
  }

  const loadmore=async ()=>{
    try {
      setLoading(true)
      const {data}= await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`)
      if (data.success) {
        setcategories(data.all_category)

      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value && !all.includes(id)) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  const filter = async () => {

    try {
      if (radio.length > 0) {
        var formate = radio.split(',')
      }

      const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/product/product-filters`, { checked, radio: formate })

      setProducts(data.products)
    } catch (error) {
      console.log(data)
    }
  }

  const getPageTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-count`)
      setTotal(data.total)
      console.log(total)
    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
  if(page===1) return ;
  loadmore()
}, [page])


  useEffect(() => {
    if (checked.length || radio.length) filter()
  }, [checked, radio])

  useEffect(() => {
    getCategory()
    getPageTotal()
  }, [])

  useEffect(() => {
    if (!checked.length || !radio.length) getproducts()
  }, [checked.length, radio.length])

  return (
    <div className='grid grid-flow-col grid-cols-5'>
      {/* Product Menu */}
      <div className='col-span-1 text-center border shadow-xl'>

        {/* Filter by price */}
        <h6>Filter By Price</h6>
        <div className='grid'>
          {Price?.map((c) => {
            return <div className="flex items-center mb-2" key={c._id}>
              <input id="default-radio-1" type="radio" value={c.array} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setRadio(e.target.value)} />
              <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{c.name}</label>
            </div>
          })
          }
        </div>

        <h6>Filter By Category</h6>
        {/* Filter by category */}
        <div className='grid'>
          {
            categories.map((e) => {

              return <div key={e._id} onChange={(item) => handleFilter(item.target.value, e._id)} className="flex items-center mb-2">
                <input id="default-checkbox" type="checkbox" value={e._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {e.name}</label>
              </div>
            })
          }
        </div>

        {/* product reset */}
        <button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Reset
        </button>
      </div>

      {/* Product View */}

      <div className='col-span-4'>
        <h6 className="text-center p-4 font-extrabold">All Products</h6>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[75vh] overflow-y-scroll  gap-2'>
          {products.map((e) =>
             
              <div key={e._id} className="w-[24vw] h-[60vh] mx-auto bg-white rounded-xl overflow-hidden shadow-md grid ">
                <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${e._id}`} alt='ProductPic ' />
                <div className="p-5 pb-1">
                  <div className="font-bold text-sm">{e.name}</div>
                  <div className="font-bold text-sm">Rs:{e.price}</div>
                  <p className="text-gray-700 text-sm">{e.description.slice(0, 10)}...</p>
                </div>
                <div className='flex justify-around'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate(`/productDetails/${e.slug}`)}>Details</button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{setCart([...cart,e]); localStorage.setItem('cart',JSON.stringify([...cart,e]))}}>Cart</button>
                </div>
              </div>
             
          )}
        </div>
        <div className='p-2'>
          {products && products.length < total && (<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault()
              setPage(page + 1)
loadmore()
            }}
          >
            {loading ? 'loading' : 'LoadMore'}
          </button>)}
        </div>
      </div>



    </div>
  )
}

export default Homepage