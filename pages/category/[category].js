import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { RxDoubleArrowRight } from 'react-icons/rx';
import Layout from '../../Layout/Layout';
import Category from './Category';

const category = () => {
    const router = useRouter()
    const catId = router.query.category
    
    const [categories,setCategories] = useState([])
    console.log(category);
    useEffect(()=>{
     if(catId){
        axios.get(`http://localhost:5000/categories?cat=${catId}`)
        .then(res=>setCategories(res.data))
     }
    },[catId])
    return (
        <Layout title={`${catId} Archives`}>
            <div className='flex items-center gap-2 justify-center'>
                <Link className='text-blue-400 font-bold' href={'/'}>Home</Link>
                <p className='flex items-center gap-2'> <RxDoubleArrowRight /> Archive by category '{catId}'</p>
            </div>
           <div>
            {
                categories.map(category=><Category key={category._id} category={category} />)
            }
           </div>
        </Layout>
    );
};

export default category;