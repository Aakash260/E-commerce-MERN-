import { useEffect, useState } from "react"
import axios from 'axios'
import CategoryForm from "./CategoryForm"
 
import { ToastContainer, toast } from 'react-toastify';
import  {Modal} from 'antd'
import UpdateForm from "./UpdateForm";
const createCategory = (check = 'no') => {

  const [category, setCategory] = useState([])
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updateName, setupdateName] = useState("")
const [categoryId, setCategoryId] = useState("")
  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`)
      if (data.success) {
        setCategory(data.all_category)
        {
          check === 'no' && toast.success('Category Added Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`)
      if (data.success) {
        toast.success('Category Deleted Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getCategory()
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    getCategory('yes');   
  }, [])

  return (
    <div>
      <div className="text-center p-4 font-extrabold">Manage Categories</div>
      <CategoryForm getCategory={getCategory} />
      <ToastContainer />
      <div className="container mx-auto h-[25vw] overflow-y-scroll">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody >

            {category?.map((item) =>
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b flex justify-evenly">
                <button onClick={()=>{ setupdateName(item.name);setVisible(true);setCategoryId(item._id) }} className='p-4 bg-blue-400 rounded-sm font-bold text-white'>Edit</button>
 
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>

            )}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
        <UpdateForm updateName={updateName} categoryId={categoryId} getCategory={getCategory}/>
      </Modal>
    </div>


  )
}

export default createCategory