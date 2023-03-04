import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
          populars.map(post=><div key={post.id} className='w-full gap-2 items-center  border border-gray-700 shadow-lg px-2  rounded-xl '>
     <div>
     </div>
      <div className='w-full'>
       
        <div className='flex sm:flex-col gap-2 items-center'>
        <div className='w-32 h-24  sm:w-full'>
          <img src={post.thumb} className='w-32 sm:w-full object-cover rounded-md h-24' alt="" />
        </div>
        <div className='w-full'>
        <div className='text-xs flex justify-between'>
        <p><span>in</span> {post.categories[0]?.label}</p>
        <p>Like: {post.like}</p>
        </div>
        <Link href={`/blog/${post.id}`} className='text-base  font-bold'>{post.title.split(' ').slice(0,13).join(' ')}{post.title.split(' ').length>13 && '...'}</Link>
        <div className='flex justify-between text-xs'>
<p>Published 12 June 2023   </p> 
<p>View {post?.view}</p>
</div>
        </div>
        </div>


      </div>
        </div>)
        }
         
       </div>}
     
    

      </>       
    );
};

export default Popular;

