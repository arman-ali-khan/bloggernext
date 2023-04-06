import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const AuthorPost = ({data}) => {
    // https://blog-server-sparmankhan.vercel.app/post?email=armankhan@gmail.com
    
    const [posts,setPosts] = useState([])
    axios.get(`https://blog-server-sparmankhan.vercel.app/post?email=${data?.email}`)
    .then(response => {
        setPosts(response.data);
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
    return (
       <div>
        <div>
            <h4 className='0 mt-3 py-2 text-base border px-2 rounded-md my-1'>Some posts by this author</h4>
        </div>
       <div className='sm:flex md:block '>
        {
            posts.slice(0,5).map(post=><div key={post.id} className='flex border rounded-md  gap-1 my-2'>
            <div className='w-20 h-16'>
                <img className='w-20 h-16 rounded object-cover' src={post.thumb} alt="" />
            </div>
            <div className='w-full'>
                <Link href={`/blog/${post.id}`} className='text-base  font-semibold'>{post.title}</Link>
                <p className='text-xs'>3 Days ago</p>
            </div>
            
        </div>)
        }
       
       </div>
       {/* <div className='border flex justify-center rounded-md w-full '>
        <Link href={`/@${posts[0]?.username}`} className='py-2 text-center w-full'>See More</Link>
       </div> */}
       </div>
    );
};

export default AuthorPost;


