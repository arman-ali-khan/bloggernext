import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import ButtonLoader from "../../Loader/ButtonLoader";



const Single = ({ post }) => {
  // post view load
 const [viewLoad,setViewLoad] = useState(true)

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
    axios.get(`https://blog-server-sparmankhan.vercel.app/post/${post.id}`)
    .then(res=>{
      setPostView(res.data)})
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
      setViewLoad(false)
  },[post])

  return (
    <>
      {post.publish ? (
        <div className="w-full gap-2 items-center backdrop-blur-xl backdrop-hue-rotate-15 backdrop-brightness-90 post md:px-2 shadow-lg border border-base-300 rounded-xl flex sm:block  ">
          <div>
            <div className=" w-24 h-24 sm:w-full sm:h-36  overflow-hidden rounded-xl">
              <img
                className="rounded-xl  w-24 sm:w-full h-24 sm:h-36  hover:scale-105 duration-300   hover:duration-300 object-cover"
                src={post?.thumb}
                alt=""
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-xs flex justify-between mr-2">
              <p>
                <span>in</span> {post?.categories[0]?.label}
              </p>

              <p className="flex items-center gap-1 font-semibold">
                <MdOutlineModeComment className="text-lg" /> {comments.length}
              </p>
            </div>
            <Link
              href={`/blog/${post?.id}`}
              className={` leading-3 text-base break-words  font-bold`}
            >
              {post.title.split(" ").slice(0, 13).join(" ")}
              {post.title.split(" ").length > 13 && "..."}
            </Link>

            <div className="flex justify-between text-xs mr-2">
              <p>{moment(post?.date).fromNow()} </p>
              <div className="flex items-center gap-1 font-semibold">
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
                </svg>
                {
                  viewLoad ? <ButtonLoader w={4} h={4} />
                  :
                  <>
                  {postView?.view}
                  </>
                }
                
              </div>
            </div>
          </div>
        </div>
      ):''
    }
    </>
  );
};

export default Single;
