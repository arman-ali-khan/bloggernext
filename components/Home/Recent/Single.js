import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";

const Single = ({ post }) => {
 
  const [comments, setComments] = useState({});
  useEffect(() => {
    axios
      .get(`https://blog-server-sparmankhan.vercel.app/comment/${post._id}`)
      .then((res) => {
        setComments(res.data);
      });
  }, [post]);

  const [postView,setPostView] = useState(0)

  useEffect(()=>{
    axios.get(`http://localhost:5000/post/${post.id}`)
    .then(res=>{
      setPostView(res.data)})
  },[post])

  return (
    <>
      {post.publish && (
        <div className="w-full gap-2 items-center   px-2 shadow-lg border border-gray-700 rounded-xl ">
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
            <div className="text-xs flex justify-between">
              <p>
                <span>in</span> {post.categories[0]?.label}
              </p>

              <p className="flex items-center gap-1 font-semibold">
                <MdOutlineModeComment className="text-lg" /> {comments.length}
              </p>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className={` leading-3 text-base break-words  font-bold`}
            >
              {post.title.split(" ").slice(0, 13).join(" ")}
              {post.title.split(" ").length > 13 && "..."}
            </Link>

            <div className="flex justify-between text-xs">
              <p>{moment(post?.date).fromNow()} </p>
              <p className="flex items-center gap-1 font-semibold">
                <svg
                  className="w-5 h-5 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>{" "}
                {postView?.view}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Single;
