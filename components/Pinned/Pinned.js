import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiBookmarkAlt } from 'react-icons/bi';

const Pinned = () => {
  const [featured,setFeatured] = useState([])
  useEffect(()=>{
    axios.get('https://blog-server-sparmankhan.vercel.app/featured')
    .then(res=>{
      setFeatured(res.data)
    })
  },[])
  console.log(featured)
    return (
      <div>
         <div className="w-full px-2 bg-blue-100 text-blue-600 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Featured Posts</h3>
    </div>
    { featured.length &&
      featured.slice(2,3).map(post=> <div key={post.blog[0].id} className='md:flex relative gap-2 w-full  items-center bg-gray-200 my-2 rounded-xl p-3'>
            <p className='absolute top-0 right-0 bg-blue-200 font-semibold text-blue-600 px-3 rounded-xl rounded-br-none rounded-tl-none'> Pinned</p>
     <div>
     <div className='md:w-64 h-32'>
        <img className='rounded-xl w-full h-full object-cover' src={post.blog[0].thumb} alt="" />
      </div>
     </div>
     <div className='flex'>
     <div className='space-y-3'>
        <p><span>in</span> {post.blog[0].categories[0]?.label}</p>
        <Link href={`/blog/${post.blog[0].id}`} className='text-xl font-bold  text-blue-600'> {post.blog[0].title}</Link>

<div className='inline-flex bottom justify-between w-full'>
<p>Published 12 June 2023   </p> 
<Link href={`/blog/${post.blog[0].id}`} >Read More</Link>
</div>
      </div>
     </div>
        </div>)
    }
       
      </div>
        
    );
};

export default Pinned;

