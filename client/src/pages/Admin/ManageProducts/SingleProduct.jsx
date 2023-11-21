 
import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const {Option}=Select
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const SingleProduct = () => {
    const [categories, setcategories] = useState([])
    const [image, setimage] = useState('')
    const [productId, setproductId] = useState('')
    const [productDetails, setProductDetails] = useState({
      
        name: "",
        description: "",
        price: "",
        quantity: "",
        shipping: "",
        singleCategory:'',
        photo:'',
        productId:''

    })
    const navigate=useNavigate()
    const { slug } = useParams();
const handleChange=(e)=>{
 const {name,value}=e.target
 setProductDetails({...productDetails,[name]:value})
}

    const getSinglePRODUCT = async () => {
      
      try {
        
                  const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`)
                  if (data?.success) {
              console.log(data.product.category.name)
                      const {name,description,price,quantity,shipping,_id}=data.product
                    //   const {category.name}=data.product
                     
                      setProductDetails({
                      //  category: data.product.category,
                        name ,
                        description,
                        price,
                        quantity,
                          shipping,
                       singleCategory:data.product.category.name,
                        // photo:data.product.photo  
                   productId:_id
                      })
                      setproductId(_id)
                      // console.log(productDetails.productId)
                  }
              } catch (error) {
                  console.log(error)
              }
          }
   
    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`)
            if (data?.success) {
            //   console.log(data.all_category)
        //  setProductDetails({...productDetails,category:data.all_category})
    setcategories(data.all_category)     
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
    image && formData.append('photo',image)
    formData.append('category',productDetails.singleCategory)
    //   formData.append('shipping',productDetails.shipping)
    for (var pair of formData.entries())
    {
     console.log(pair[0]+ ', '+ pair[1]); 
    }
       const {data}= await axios.put(`${import.meta.env.VITE_API}/api/v1/product/update-product/${productDetails.productId}`,
       formData)
       if(data.success){
        toast.success('User Updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
       }
       navigate(`/dashboard/admin/viewAll-product`)
} catch (error) {
    console.log(error)
}
}
 


const handleDelete=async()=>{
try {
    let ans=window.prompt("Are you sure want to delete? ")
    if(!ans) return;
    const {data}=axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${productDetails.productId}`)
     
        toast.success('User Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    
    console.log('user deleted')
    navigate(`/dashboard/admin/viewAll-product`)
} catch (error) {
    console.log(error)
}
}
 
useEffect(() => {
    getSinglePRODUCT()
}, [])

useEffect(() => {
    getCategory()
}, [])

    return (
        <div className=''>
            <ToastContainer/>
            <p className='text-center p-4 font-extrabold '>Update Product</p>
            <form action="post" onSubmit={handleSubmit} className='h-[30vw] overflow-y-scroll'>
                <Select bordered={true}
                placeholder='Select a Category'
                size='large'
                showSearch
    
                className='form-select mb-3 w-[60vw]'
                 onChange={(value)=>setProductDetails({...productDetails,singleCategory:value})}
                >
                    
                {categories?.map((c)=>{
                return <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>
                })}
                </Select>
                <div className='grid gap-4'>
                    {/* <div className=''>
                        <label className=''>
                            {image ?<span className='p-2 bg-blue-500 rounded-md m-4'>{image.name}</span>:<span className='p-2 bg-blue-500 rounded-md m-4'>Upload Photo</span>}
                       <input type="file"
                       name='photo'
                       accept='image/*'
                       onChange={(e)=>setimage(e.target.files[0])}
                       hidden/>
                        </label>         
                    </div> */}
                    <div>
                       {image ? (
                        <div className='  w-[60vw] max-h-40 overflow-hidden'>
                            <img src={URL.createObjectURL(image)} alt="product photo"   />
                        </div>
                        
                       ):
                        (
                            <div className='  w-[60vw] max-h-40 overflow-hidden'>
                            <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${productId}`} alt="product photo"   />
                        </div>)
                        
                       }
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
                value={productDetails.shipping? 'Yes': 'No'}
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
                <div className='flex gap-2'><button type='submit' className='ml-4 p-2 bg-green-300 rounded-md' >Update Products</button>
                </div>
                    </div>
                </div>
            </form>
            <button onClick={handleDelete} type='submit' className='ml-4 p-2 bg-red-300 rounded-md' >Delete Products</button>
        </div>
    )
}

export default SingleProduct