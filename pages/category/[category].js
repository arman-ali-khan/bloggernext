import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { RxDoubleArrowRight } from 'react-icons/rx';
import Layout from '../../Layout/Layout';
import Category from './Category';
import Lottie from "lottie-react";
import nodata from '../../assest/lottie/no-data.json'
import Categories from '../../components/Categories/Categories';

const category = () => {
    const router = useRouter()
    const catId = router.query.category
    
    const [categories,setCategories] = useState([])
    console.log(category);
    useEffect(()=>{
     if(catId){
        axios.get(`https://blog-server-sparmankhan.vercel.app/categories?cat=${catId}`)
        .then(res=>setCategories(res.data))
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
     }
    },[catId])
    return (
        <Layout title={`${catId} Archives`}>
            <div className='flex items-center gap-2 justify-center'>
                <Link className='text-blue-400 font-bold' href={'/'}>Home</Link>
                <p className='flex items-center gap-2'> <RxDoubleArrowRight /> Archive by category '{catId}'</p>
            </div>
           <div className=''>
            {
                categories.length > 0 ? 
                <>
                 {
                categories.map(category=><Category key={category._id} category={category} />)
            }
                </>
                :
                <div className='flex items-center justify-center'>
                   <Lottie className='w-64 md:w-96 overflow-hidden' animationData={nodata} loop={true} />
                </div>
            }
           
           </div>
           <Categories />
        </Layout>
    );
};

export default category;