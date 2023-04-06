import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SinglePinnded from './SinglePinnded';

const Pinned = () => {
  const [featured,setFeatured] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    axios.get('https://blog-server-sparmankhan.vercel.app/featured')
    .then(res=>{
      setFeatured(res.data)
      setLoading(false)
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  },[])
    return (
      <>
       <div className="w-full px-2 shadow rounded-md my-2 border-2 font-bold py-2">
      <h3 className="text-xl ">Featured Posts</h3>
    </div>
      {
        loading ?  <div className="flex flex-col sm:flex-row  rounded shadow-md w-full animate-pulse h-64 sm:h-36 ">
        <div className="h-44 w-full sm:h-full sm:w-44 md:w-64 rounded bg-base-300"></div>
        <div className="flex-1 px-4  space-y-4 py-4 bg-base-100">
          <div className="w-full h-6 rounded bg-base-300"></div>
          <div className="w-full h-6 rounded bg-base-300"></div>
          <div className="w-full h-6 rounded bg-base-300"></div>
        </div>
      </div>
      :
      <div>
        
    { featured.length &&
      featured.slice(2,3).map(post=> <SinglePinnded key={post.blog[0]?.id} post={post} />)
    }
       
      </div>
      }
      </>
      
        
    );
};

export default Pinned;

