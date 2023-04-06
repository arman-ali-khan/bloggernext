import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SinglePopular from './SinglePopular';

const Popular = () => {
  const [populars,setPopulars] =useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    axios.get('https://blog-server-sparmankhan.vercel.app/popular')
    .then(res=>{
      setPopulars(res.data)
      setLoading(false)
    }) .catch(function (error) {
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
      <div className="w-full px-2 space-y-3 shadow-lg border-2 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl  ">Popular Posts</h3>
    </div>
   { loading ? 
          <div className="flex flex-col  rounded shadow-md w-full gap-2 animate-pulse h-full sm:h-32">
       <div className="flex-1 px-4 py-3 space-y-4  bg-base-100">
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-3/4 h-4 rounded bg-base-300"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-base-100">
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-3/4 h-4 rounded bg-base-300"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-base-100">
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-3/4 h-4 rounded bg-base-300"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-base-100">
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-3/4 h-4 rounded bg-base-300"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-base-100">
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-full h-4 rounded bg-base-300"></div>
         <div className="w-3/4 h-4 rounded bg-base-300"></div>
       </div>
     </div>
        
       :
       
     
      <div className='grid grid-cols-1 md:flex md:flex-col gap-2 sm:grid sm:grid-cols-2'>
        {
          populars.map(post=><SinglePopular key={post.id} post={post} />)
        }
         
       </div>}
     
    

      </>       
    );
};

export default Popular;

