import React from 'react'
import { useSearch } from '../context/searchContext'
import { Link } from 'react-router-dom'
const Search = () => {
const [search,setSearch]=useSearch()
console.log("serch",search)
  return (
    <div>
          <h6 className="text-center p-4 font-extrabold">Search Products</h6>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[75vh] overflow-y-scroll  gap-2'>
      {search.result.length===0?<h1>No Product Found</h1>:
     
      search.result.map((e) =>
       <Link key={e._id} to={``}>
              <div className="w-[24vw] h-[60vh] mx-auto bg-white rounded-xl overflow-hidden shadow-md grid ">
                <img className="w-full h-48 object-cover" src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${e._id}`} alt='ProductPic ' />
                <div className="p-5 pb-1">
                  <div className="font-bold text-sm">{e.name}</div>
                  <div className="font-bold text-sm">Rs:{e.price}</div>
                  <p className="text-gray-700 text-sm">{e.description.slice(0, 10)}...</p>
                </div>
                <div className='flex justify-around'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cart</button>
                </div>
              </div>
            </Link>
          )}
        </div>
    </div>
  )
}

export default Search