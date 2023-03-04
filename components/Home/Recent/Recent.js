import Link from "next/link";
import React from "react";

const Recent = ({data:posts}) => {
  console.log(posts)
  return (
   <div>
    <div className="w-full px-2 shadow bg-gray-700  rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Recent Posts</h3>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        posts.map(post=> <div key={post.id} className="w-full gap-2 items-center   px-2 shadow-lg border border-gray-700 rounded-xl ">
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
      <div className='text-xs flex justify-between'>
        <p><span>in</span> {post.categories[0]?.label}</p>
        <p>Like: {post.like}</p>
        </div>
        <Link  href={`/blog/${post.id}`} className={` leading-3 text-base break-words  font-bold`}>
        {post.title.split(' ').slice(0,13).join(' ')}{post.title.split(' ').length>13 && '...'}
        </Link>

        <div className="flex justify-between text-xs">
          <p>2 days ago </p>
          <p>View {post?.view}</p>
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