import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

   const [content, setContent] = useState("");
   const navigate = useNavigate();
  const[input,setInput] = useState({
    title:"",
    category:"",

  })
  const [file,setFile] = useState([]);
  const [categories,setCategories] = useState([]);
  // const [content,setContent] = useState('');

   useEffect(()=>{
    const fetchAllCategories = async()=>{
      const res = await axios.get(
        "http://localhost:4000/api/v1/get/categories"
      ,{
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setCategories(res.data);;
    }
    fetchAllCategories();
   },[])

  
   //creating form data
   const formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("category", input.category);
    formdata.append("description", content.replace(/<[^>]+>/g, ""));
    formdata.append("thumbnail", file);
   const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post(
        "http://localhost:4000/api/v1/add/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate('/');


    }catch(err){
      alert(err.response.data.message);
    }
   }



  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Add a New Blog</h2>
        <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  text="text"
                  name="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Blog Title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="category"
                >
                  <option disabled>Select Category</option>
                  {categories &&
                    categories.map((item) => {
                      return <option value={item._id}>{item.title}</option>;
                    })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Description
                </label>
               <textarea  
               name='description'
               placeholder='Blog description'
               className='form-control'
               value={content}
               onChange={(e)=>setContent(e.target.value)}
               rows='10'
               />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Thumbnail
                </label>
                <input
                  name="thumbnail"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Select Thumbnail"
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBlog