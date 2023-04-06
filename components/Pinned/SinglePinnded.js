import axios from 'axios';
import moment from 'moment';
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
      
    },[post])
    return (
        <div className='flex relative gap-2 w-full  backdrop-blur-xl backdrop-hue-rotate-15 backdrop-brightness-90  items-center border border-base-300 shadow-lg my-2 rounded-xl p-3'>
            <p className='absolute top-0 right-0 dark:bg-gray-600 bg-blue-200 bg-opacity-40 blur-sm  font-semibold text-blue-600 px-3 rounded-xl rounded-br-none rounded-tl-none'> Featured</p>
            <p className='absolute top-0 right-0 dark:bg-gray-600  bg-opacity-40  font-semibold text-black px-3 rounded-xl rounded-br-none rounded-tl-none'> Featured</p>
     <div>
     <div className='md:w-44 sm:w-32 w-24 h-24 md:h-32 overflow-hidden rounded-xl'>
        <img className='rounded-xl w-full h-full object-cover hover:scale-105 duration-300   hover:duration-300' src={post.blog[0]?.thumb} alt="" />
      </div>
     </div>
     <div className='flex'>
     <div className='space-y-3'>
     <div className='text-xs flex justify-between'>
        <p><span>in</span> {post.blog[0].categories[0]?.label}</p>
        <p className='flex items-center gap-1 font-semibold'><MdOutlineModeComment className='text-lg' /> {comments.length}</p>
        </div>
        <Link href={`/blog/${post.blog[0].id}`} className='text-lg font-bold  '> {post.blog[0].title}</Link>

<div className='inline-flex bottom justify-between w-full'>
<p><span className='hidden sm:inline-block'>Published</span> {moment(post?.date).fromNow()} </p> 
<p className="flex items-center gap-1 font-semibold"><svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> {post?.blog[0].view}</p>
</div>
      </div>
     </div>
        </div>
    );
};

export default SinglePinnded;