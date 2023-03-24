import Link from "next/link";
import React, { useState } from "react";
import { GiChart } from "react-icons/gi";
import Single from "./Single";
import useSWR from 'swr'



const Recent = ({data:posts}) => {

  return (
   <div>
    <div className="w-full px-2 shadow  border-2 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Recent Posts</h3>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        posts.map(post=> <Single post={post} key={post._id} />)
      }
     
    </div>
    {/* Pagination */}
  
    {/* <div className="flex justify-center my-9">
    <div className="btn-group flex flex-wrap">
    {
     [...Array(pages).keys()].map((item,i)=>  <button onClick={()=>setPage(item)} key={i} className={`btn btn-sm ${page===item ? 'btn-active':''}`}>{item+1}</button>)
    }

</div> */}
    {/* </div> */}
   </div>
  );
};

export default Recent;



// write a get staticprops function for nextjs dynamic api call
// export async function getStaticProps() {
//   const res = await fetch(`https://blog-server-sparmankhan.vercel.app/blogs/blogs`);
//   const data = await res.json();
// console.log(data)
//   return {
//     props: {
//       data,
//     },
//   };
// }