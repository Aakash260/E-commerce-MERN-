import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useSearch } from '../context/searchContext'
import {useNavigate} from 'react-router-dom'
const SearchHeader = () => {
    const [search, setSearch] = useSearch()
const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
         try {
            const {data}= await axios.get(`${import.meta.env.VITE_API}/api/v1/product/search/${search.keyword}`)
            setSearch({...search,result:data})
            console.log(search)
            navigate('/search')
         } catch (error) {
            console.log('search data not recieved')
            error
         }
    }
  return (
    <div className="flex items-center">
    <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-l py-1 px-4 focus:outline-none focus:shadow-outline"
          value={search.keyword}
          name='search'
          onChange={e=>setSearch({...search,keyword:e.target.value})}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
           >
          Search
        </button>
    </form>
  </div>
  
  )
}

export default SearchHeader