import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineModeComment } from 'react-icons/md';

const SinglePinnded = ({post}) => {
    const [comments,setComments] = useState({})
    useEffect(()=>{
      axios.get(`https://blog-server-sparmankhan.vercel.app/comment/${post.blog[0]._id}`)
      .then(res=>{
        setComments(res.data)
      })
      
    },[post])
    return (
        <div className='sm:flex relative gap-2 w-full  items-center border border-gray-700 shadow-lg my-2 rounded-xl p-3'>
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
        <p className='flex items-center gap-1 font-semibold'><MdOutlineModeComment className='text-lg' /> {comments.length}</p>
        </div>
        <Link href={`/blog/${post.blog[0].id}`} className='text-xl font-bold  '> {post.blog[0].title}</Link>

<div className='inline-flex bottom justify-between w-full'>
<p>Published 12 June 2023   </p> 
<p className="flex items-center gap-1 font-semibold"><svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> {post?.blog[0].view}</p>
</div>
      </div>
     </div>
        </div>
    );
};

export default SinglePinnded;