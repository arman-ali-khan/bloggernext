import Link from "next/link";
import Single from "./Single";
import { useEffect, useState } from "react";



const Recent = ({ data: posts }) => {
 
  return (
    <div>
      <div className="w-full px-2 shadow  border-2 rounded-md my-2 font-bold py-2">
        <h3 className="text-xl">Recent Posts</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 container">
        {posts.map((post) => (
          <Single post={post} key={post._id} />
        ))}
      </div>
      
    </div>
  );
};

export default Recent;

