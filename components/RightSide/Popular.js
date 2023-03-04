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
    })
  },[])
    return (
      <>
      <div className="w-full px-2 space-y-3 shadow-lg bg-gray-700 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Popular Posts</h3>
    </div>
   { loading ? 
          <div className="flex flex-col  rounded shadow-md w-full gap-2 animate-pulse h-full sm:h-32">
       <div className="flex-1 px-4 py-3 space-y-4  bg-gray-500">
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-3/4 h-4 rounded bg-gray-700"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-gray-500">
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-3/4 h-4 rounded bg-gray-700"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-gray-500">
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-3/4 h-4 rounded bg-gray-700"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-gray-500">
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-3/4 h-4 rounded bg-gray-700"></div>
       </div>
       <div className="flex-1 px-4 py-3 space-y-4  bg-gray-500">
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-full h-4 rounded bg-gray-700"></div>
         <div className="w-3/4 h-4 rounded bg-gray-700"></div>
       </div>
     </div>
        
       :
       
     
      <div className='flex flex-col gap-2'>
        {
          populars.map(post=><SinglePopular key={post.id} post={post} />)
        }
         
       </div>}
     
    

      </>       
    );
};

export default Popular;

