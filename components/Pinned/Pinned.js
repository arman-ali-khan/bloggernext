import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiBookmarkAlt } from 'react-icons/bi';

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
  console.log(featured)
    return (
      <>
       <div className="w-full px-2 shadow rounded-md my-2 bg-gray-700 font-bold py-2">
      <h3 className="text-xl ">Featured Posts</h3>
    </div>
      {
        loading ?  <div className="flex flex-col sm:flex-row  rounded shadow-md w-full animate-pulse h-64 sm:h-36 ">
        <div className="h-44 w-full sm:h-full sm:w-44 md:w-64 rounded bg-gray-700"></div>
        <div className="flex-1 px-4  space-y-4 py-4 bg-gray-500">
          <div className="w-full h-6 rounded bg-gray-700"></div>
          <div className="w-full h-6 rounded bg-gray-700"></div>
          <div className="w-full h-6 rounded bg-gray-700"></div>
        </div>
      </div>
      :
      <div>
        
    { featured.length &&
      featured.slice(2,3).map(post=> <div key={post.blog[0].id} className='sm:flex relative gap-2 w-full  items-center border border-gray-700 shadow-lg my-2 rounded-xl p-3'>
            <p className='absolute top-0 right-0 dark:bg-gray-600 bg-blue-200 font-semibold text-blue-600 px-3 rounded-xl rounded-br-none rounded-tl-none'> Pinned</p>
     <div>
     <div className='md:w-64 sm:w-44 h-32'>
        <img className='rounded-xl w-full h-full object-cover' src={post.blog[0].thumb} alt="" />
      </div>
     </div>
     <div className='flex'>
     <div className='space-y-3'>
     <div className='text-xs flex justify-between'>
        <p><span>in</span> {post.blog[0].categories[0]?.label}</p>
        <p>Like: {post.blog[0].like}</p>
        </div>
        <Link href={`/blog/${post.blog[0].id}`} className='text-xl font-bold  '> {post.blog[0].title}</Link>

<div className='inline-flex bottom justify-between w-full'>
<p>Published 12 June 2023   </p> 
<p>View {post.blog[0].view}</p>
</div>
      </div>
     </div>
        </div>)
    }
       
      </div>
      }
      </>
      
        
    );
};

export default Pinned;

