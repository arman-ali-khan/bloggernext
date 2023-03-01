import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiBookmarkAlt } from 'react-icons/bi';

const Pinned = () => {
  const [featured,setFeatured] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/featured')
    .then(res=>{
      setFeatured(res.data[0].blog)
    })
  },[])
  console.log(featured)
    return (
      <div>
         <div className="w-full px-2 bg-blue-100 text-blue-600 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Featured Posts</h3>
    </div>
    {
      featured.map(post=> <div key={post.id} className='md:flex gap-2 relative items-center bg-gray-200 my-2 rounded-xl p-3'>
            <p className='absolute top-0 right-0 bg-blue-200 font-semibold text-blue-600 px-3 rounded-xl rounded-br-none rounded-tl-none'> Pinned</p>
     <div>
     <div className='md:w-64 h-32'>
        <img className='rounded-xl w-full h-full object-cover' src={post.thumb} alt="" />
      </div>
     </div>
      <div>
        <p><span>in</span> {post.categories[0].label}</p>
        <Link href={`/blog/${post.id}`} className='text-xl font-bold'> {post.title}</Link>
<div className='flex justify-between'>
<p>Published 12 June 2023   </p> 
<Link href={`/blog/${post.id}`} >Read More</Link>
</div>
      </div>
        </div>)
    }
       
      </div>
        
    );
};

export default Pinned;

