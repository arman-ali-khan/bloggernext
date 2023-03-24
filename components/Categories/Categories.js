import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { HiArrowLeft, HiOutlineFolder } from 'react-icons/hi2';
import { contextProvider } from '../../context/AuthContext';

const Categories = () => {
    const {category,setCategory} = useContext(contextProvider)
    const [categories,setCategories]  = useState([])
    useEffect(()=>{
      axios.get(`https://blog-server-sparmankhan.vercel.app/category`)
      .then(res=>setCategories(res.data))
    },[])
    return (
       <div className={`${category ?"flex ":''}`}>
         <div  className={`fixed ${category ? 'transition-all duration-300 left-0 ':'transition-all duration-300 -left-96 '}  items- top-0 h-full z-[99999999]`}>

<ul className=' bg-base-200 py-7 rounded-r-xl h-full overflow-y-auto '>
 
 {
  categories.map(cat=> <Link key={cat._id} href={`/category/${cat.value}`} ><li className="py-2 px-4 w-64 hover:bg-base-300 list-none flex items-center gap-2 text-sm"><img src={cat.image} className='w-6 h-6 rounded-full object-cover overflow-hidden' alt="" /> {cat.label}</li></Link>)
 }
  
  </ul>


        </div>
        <div onClick={()=>setCategory(!category)} className={` ${category ? 'left-0 fixed z-50 w-full bg- h-full ':'hidden w-0  h-0 absolute top-0'}`}></div>
       </div>
    );
};

export default Categories;