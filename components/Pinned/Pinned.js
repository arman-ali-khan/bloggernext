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

