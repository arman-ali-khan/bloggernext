import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiCommentMinus } from 'react-icons/bi';
import { MdOutlineModeComment } from 'react-icons/md';

const Search = () => {

    const [searchData,setSearchData] = useState('')
    const [search,setSearch] = useState([])

    useEffect(()=>{
        axios.get(`https://blog-server-sparmankhan.vercel.app/search?q=${searchData}`)
        .then(res=>setSearch(res.data))
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
    },[searchData])
    return (
        <>
         {/* Put this part before </body> tag */}
<input type="checkbox" id="search" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative  backdrop-blur-xl bg-transparent backdrop-hue-rotate-15 backdrop-brightness-90 ">
    <label htmlFor="search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Search</h3>
    
    <input onChange={(e)=>setSearchData(e.target.value)} type="search" className='input input-bordered w-full search backdrop-blur-2xl backdrop-hue-rotate-90 backdrop-brightness-105 bg-transparent' />
   
   {
    search.map(post=> <div key={post._id} className='flex gap-2 my-2  border border-base-300 shadow-lg py-2 px-2 rounded-md w-full'>
    <div className='w-12 h-12'>
        <img className='w-12 h-12 object-cover rounded-md' src={post?.thumb} alt="" />
    </div>
    <label htmlFor="search" className='w-full'>
    <Link href={`/blog/${post.id}`} className='text-sm w-full'>
    <p href={`/blog/${post.id}`} htmlFor="search" className='text-sm'>{post?.title}</p>
        <div className='flex items-center justify-between w-full'>
        <p>{moment(post?.date).fromNow()}</p>
        <p className='flex items-center gap-1'> <MdOutlineModeComment className="text-lg" />{post?.view}</p>
        </div>
    </Link>
    </label>
</div>)
   }
  </div>
</div>
    
        </>
    );
};

export default Search;