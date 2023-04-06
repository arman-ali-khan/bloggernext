import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TbUsers } from 'react-icons/tb';
import { contextProvider } from '../../../context/AuthContext';
import AuthorPost from './AuthorPost';

const Author = ({data}) => {
    const {user} = useContext(contextProvider)
    const [author,setAuthor] = useState({})
    useEffect(()=>{
        axios.get(`https://blog-server-sparmankhan.vercel.app/author?name=${data.username}`)
        .then(res=>{
            setAuthor(res.data)
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
    },[data])
   
    return (
<div className="font-sans leading-tight bg-grey-lighter ">
    <div className="w-full md:max-w-sm border rounded-lg flex flex-col sm:flex-row items-center sm:justify-between justify-center md:block overflow-hidden shadow-lg">
        <div className="border-b px-2 pb-6 w-full">
            <div className="text-center sm:text-left flex gap-3 items-center mb-4">
                <img className="h-12 w-12 rounded-full border-4 border-white " src={author.photo } alt="" />
                <div className="py-2">
                    <h3 className="font-bold text-2xl mb-1">{author.name}</h3>
                    <div className="inline-flex  sm:flex items-center">
                        <svg className="h-5 w-5  mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" width="24" height="24">
                            <path className="heroicon-ui"
                                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg>
                        Rangpur, Bangladesh
                    </div>
                </div>
            </div>
            {
                user?.email &&  <div className="flex">
                <button className="flex-1 rounded-full bg-blue  antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2 border-2">Follow</button>
                <button className="flex-1 rounded-full border-2 border-grey font-semibold  px-4 py-2">Message</button>
            </div>
            }
           
        </div>
        <div className="px-4 py-4 w-full flex justify-center">
           <div className='flex justify-between gap-2 w-full'>
           
            <div className='flex items-center flex-col text-grey-darker mb-4'>
            <div className='flex items-center gap-1'>
            
                <strong className="text-blue-400 text-xl">12</strong> 
            </div>
                <span>Followers </span>
            </div>
            <div className='flex items-center flex-col text-grey-darker mb-4'>
            <div className='flex items-center gap-1'>
           
                <strong className="text-blue-400 text-xl">12</strong> 
            </div>
                <span>Following </span>
            </div>
            <div className='flex items-center flex-col text-grey-darker mb-4'>
            <div className='flex items-center gap-1'>
           
                <strong className="text-blue-400 text-xl">12</strong> 
            </div>
                <span>Posts </span>
            </div>
           </div>
        </div>
    </div>
    <AuthorPost data={data} />
</div>
    );
};

export default Author;