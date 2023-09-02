import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

const SingleBlog = () => {
    const {id} = useParams();
    const [blog,setBlog] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
      const fetchSingleBlog = async()=>{
        const res = await axios.get(
          `http://localhost:4000/api/v1/get/blog/${id}` ,
          {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      }
      });
        setBlog(res.data);
      }
      fetchSingleBlog();
    },[id])

  return (
    <>
      <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
            <h1 className="my-3">{blog.title}</h1>
            <img
              src={
                `http://localhost:4000/${blog.thumbnail}`
              }
              className="img img-responsive img-rounded my-3"
              alt=""
            />
            <p className="my-3">{blog.description} </p>
          </div>
        </div>
        <button onClick={()=> navigate('/')}  className="btn btn-primary">
          Back To Post
        </button>
      </div>
    </>
  );
}

export default SingleBlog