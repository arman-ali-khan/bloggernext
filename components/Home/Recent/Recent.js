import Link from "next/link";
import React from "react";

const Recent = ({data:posts}) => {
  console.log(posts)
  return (
   <div>
    <div className="w-full px-2 bg-blue-100 text-blue-600 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Recent Posts</h3>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        posts.map(post=> <div key={post.id} className="w-full gap-2 items-center  bg-gray-200 px-2 rounded-xl ">
      <div>
        <div className="w-68 h-32">
          <img
            className="rounded-xl w-full h-full hover:scale-105 duration-300   hover:duration-300 object-cover"
            src={post.thumb}
            alt=""
          />
        </div>
      </div>
      <div className="w-full">
        <p>
          <span>in</span> Ghost Story
        </p>
        <Link  href={`/blog/${post.id}`} className="text-xl text-blue-600 font-bold">
        {post.title}
        </Link>

        <div className="flex justify-between">
          <p>Published 12 June 2023 </p>
          <Link href={`/blog/${post.id}`}>Read More</Link>
        </div>
      </div>
    </div>)
      }
    
     
    </div>
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