import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import axios from 'axios'

const {Option}=Select
const ProductForm = () => {

    const [productDetails, setProductDetails] = useState({
        category: [],
        name: "",
        description: "",
        price: "",
        quantity: "",
        shipping: "",
        singleCategory:'',
        photo:''

    })

const handleChange=(e)=>{
 const {name,value}=e.target
 setProductDetails({...productDetails,[name]:value})
}

    useEffect(() => {
   getCategory()
    }, [])
    
    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`)
            if (data?.success) {
                setProductDetails({...productDetails,category:data.all_category})
      
            }
        } catch (error) {
            console.log(error)
        }
    }
 const handleSubmit=async(e)=>{
    e.preventDefault();
try {
     const formData=new FormData();
   
    formData.append("name",productDetails.name)
    formData.append('description',productDetails.description)
    formData.append('price',productDetails.price)
    formData.append('quantity',productDetails.quantity)
     formData.append('photo',productDetails.photo)
     formData.append('category',productDetails.singleCategory)
     formData.append('shipping',productDetails.shipping)
  
    //  for (var data of formData) {
    //     console.log(data);
    //   }
     
       const {data}=axios.post(`${import.meta.env.VITE_API}/api/v1/product/create-product`,
       formData)
       if(data.success){
        console.log('true')
       }
} catch (error) {
    console.log(error)
}
}
 
    return (
        <div className=''>
            <p>Create Product</p>
            <form action="post" onSubmit={handleSubmit} className='h-[30vw] overflow-y-scroll'>
                <Select bordered={true}
                placeholder='Select a Category'
                size='large'
                showSearch
                className='form-select mb-3 w-[60vw]'
                 onChange={(value)=>setProductDetails({...productDetails,singleCategory:value})}
                >
                    
                {productDetails.category?.map((c)=>{
                  return  <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>
                })}
                </Select>
                <div className='grid gap-4'>
                    <div className=''>
                        <label className=''>
                            {productDetails.photo ?<span className='p-2 bg-blue-500 rounded-md m-4'>{ productDetails.photo.name}</span>:<span className='p-2 bg-blue-500 rounded-md m-4'>Upload Photo</span>}
                       <input type="file"
                       name='photo'
                       accept='image/*'
                       onChange={(e)=>setProductDetails({...productDetails,photo:e.target.files[0]})}
                       hidden/>
                        </label>
                
                    </div>
                    <div>
                       {productDetails.photo && (
                        <div className='w-[60vw] max-h-40 overflow-hidden'>
                            <img className=""src={URL.createObjectURL(productDetails.photo)} alt="product photo"   />
                        </div>
                       )}
                    </div>
                    <div className=''>
                        <label className='' >
                            <input className='w-[40vw]' type="text"
                            placeholder='write Name'
                            name="name"
                            value={productDetails.name}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className=''>
                        <label className='' >
                            <textarea className='w-[40vw]' type="text"
                            placeholder='write Description'
                            name="description"
                            value={productDetails.description}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className=''>
                        <label className='' >
                            <input className='w-[40vw]' type="number"
                            placeholder='write price'
                            name="price"
                            value={productDetails.price}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className=''>
                        <label className='' >
                            <input className='w-[40vw]' type="number"
                            placeholder='write Quantity'
                            name="quantity"
                            value={productDetails.quantity}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                
                    <div className='mb-8'>
                    <Select bordered={true}
                placeholder='Shipping'
                size='large'
                showSearch
                className='form-select mb-3 w-[60vw]'
                 onChange={(value)=>setProductDetails({...productDetails,shipping:value})}
                >
                    
                 
                     <Option value='0'>
                      No
                    </Option>
                 
                     <Option value='1'>
                        Yes
                    </Option>
                </Select>
                <button type='submit' className='ml-4 p-2 bg-green-300 rounded-md' >Create Products</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductForm