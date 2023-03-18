import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineModeComment } from 'react-icons/md';

const SinglePopular = ({post}) => {
    const [comments,setComments] = useState({})
    useEffect(()=>{
      axios.get(`https://blog-server-sparmankhan.vercel.app/comment/${post._id}`)
      .then(res=>{
        setComments(res.data)
      })
      
    },[post])
    return (
       <>
       {
        post.publish &&  <div key={post.id} className='w-full gap-2 items-center  border border-gray-700 shadow-lg pr-2 rounded-xl '>
        <div>
        </div>
         <div className='w-full pr-1'>
          
           <div className='flex sm:flex-col gap-2 items-center'>
           <div className='w-32 h-24  sm:w-full'>
             <img src={post.thumb} className='w-32 sm:w-full hover:scale-105 duration-300  hover:duration-300 object-cover rounded-md h-24' alt="" />
           </div>
           <div className='w-full'>
           <div className='text-xs flex justify-between'>
           <p><span>in</span> {post.categories[0]?.label}</p>
           <p className='flex items-center gap-1 font-semibold'><MdOutlineModeComment className='text-lg' /> {comments.length}</p>
           </div>
           <Link href={`/blog/${post.id}`} className='text-base   font-bold'>{post.title.split(' ').slice(0,13).join(' ')}{post.title.split(' ').length>13 && '...'}</Link>
           <div className='flex justify-between text-xs'>
   <p>{moment(post?.date).fromNow()}  </p> 
   <p className="flex items-center gap-1 font-semibold"><svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> {post?.view}</p>
   </div>
           </div>
           </div>
   
   
         </div>
           </div>
       }
       </>
    );
};

export default SinglePopular;