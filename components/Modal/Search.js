import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiCommentMinus } from 'react-icons/bi';
import { MdOutlineModeComment } from 'react-icons/md';

const Search = () => {

    const [searchData,setSearchData] = useState('')
console.log(searchData);
    const [search,setSearch] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/search?q=${searchData}`)
        .then(res=>setSearch(res.data))
    },[searchData])
    console.log(search);
    return (
        <>
         {/* Put this part before </body> tag */}
<input type="checkbox" id="search" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Search</h3>
    
    <input onChange={(e)=>setSearchData(e.target.value)} type="search" className='input input-bordered w-full search' />
   
   {
    search.map(post=> <div key={post._id} className='flex gap-2 my-2 bg-base-300 py-2 px-2 rounded-md w-full'>
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