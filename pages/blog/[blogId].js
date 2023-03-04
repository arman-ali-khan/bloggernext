
import Popular from '../../components/RightSide/Popular'
import Layout from '../../Layout/Layout';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';
import Author from '../../components/Home/Author/Author';
import { contextProvider } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import DeletePost from '../../components/Modal/DeletePost';
import { BiCommentDots, BiHeart } from 'react-icons/bi';
import { RiHeart3Fill } from 'react-icons/ri';
import Comment from '../../components/Modal/Comment';
import axios from 'axios';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi2'


const blog = ({data}) => {
 const {user,commented} = useContext(contextProvider)
 const post = data.body
 const socialBody = post.replace(/<\/?[^>]+>/gi, '')
 const router = useRouter()
 const id = router.query.blogId

 const [deleteId,setDeleteId] = useState({})

 const [commentShow,setCommentShow] = useState(true)


 const [comments,setComments] = useState({})
 useEffect(()=>{
   axios.get(`https://blog-server-sparmankhan.vercel.app/comment/${data._id}`)
   .then(res=>{
     setComments(res.data)
   })
   
 },[data,commented])

    return (
        <Layout title={`${data.title} || Next Blogger`} description={socialBody} body={data.body} thumb={data.thumb}>
           <div className='md:flex w-full '>
            <div className='md:w-full m-4'>
            <div className="mx-auto md:p-2 dark:bg-gray-800 ">
	<div className="flex flex-col mx-auto overflow-hidden rounded">
		<img src={data.thumb} alt="" className="w-full h-60 sm:h-96 object-cover object-center dark:bg-gray-500" />
		<div className="p-2 pb-12 mx-auto -mt-16 space-y-6 sm:px-3 sm:mx-3 lg:mx-12 rounded-xl border bg-gray-900">
			<div className="space-y-2 ">
				<h4  className="inline-block text-2xl font-semibold sm:text-3xl">{data.title}</h4>
      {/* Post action */}
     {
      data?.email === user?.email &&  <div className='flex items-center gap-3'>
      <Link className='bg-blue-100 text-blue-600 px-3 rounded-full py-1' href={`/edit/${data.id}`}>Edit</Link>
      <label onClick={()=>setDeleteId(data)} htmlFor="deleteModal" className="bg-rose-100 text-rose-600 px-3 rounded-full py-1">Delete</label>
      </div>
     }


				<p className="text-sm ">By{" "}
					<Link rel="noopener noreferrer" href="#" className="text-xs hover:underline">{data.name}</Link>
				</p>
			</div>
			<div className="">
				<div className='postbody text-lg'>
               {parse(post)}
                </div>
			</div>
		</div>
	</div>
</div>
 <div className={`flex gap-2 md:hidden py-4 fixed duration-300 transition-all top-1/2 ${commentShow?'':'ml-12'}  items-center`}>
 <div className={`flex flex-col gap-2 py-4 fixed  top-1/2 mx-3  items-center  bg-gray-600 px-2 rounded-lg duration-300 transition-all ${commentShow ? '-left-20':'left-0'}`}>
  {/* Like */}
  <div className="flex flex-col items-center gap-2  hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Like">
    <RiHeart3Fill className="text-rose-600 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-200 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1 " />
    <p className='text-white'>{data.like}</p>
  </div>
  <label htmlFor="postComment" onClick={()=>setDeleteId(data)} className="flex flex-col items-center hover:bg-gray-700 rounded-lg  gap-2 hover:tooltip hover:flex hover:tooltip-open hover:tooltip-right" data-tip="Comments">
   {/* Comments */}
    <div  className=" ">
       <BiCommentDots  className="text-4xl transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1" /> 
    </div>
    <p className='text-white'>{comments?.length}</p>
  </label>
 
  </div> 

  <div onClick={()=>setCommentShow(!commentShow)} className='bg-gray-600 text-white py-6 rounded-full' >
    {
      commentShow ? <HiOutlineChevronDoubleRight /> : <HiOutlineChevronDoubleLeft />
    }

</div>
 </div>


{/* Desktop Comment */}
 <div className={`md:flex flex-col gap-2 left-0 hidden py-4 fixed  top-1/2 mx-3  items-center  bg-gray-600 px-2 rounded-lg duration-300 transition-all `}>
  {/* Like */}
  <div className="flex flex-col items-center gap-2  hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Like">
    <RiHeart3Fill className="text-rose-600 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-200 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1 " />
    <p className='text-white'>{data.like}</p>
  </div>
  <label htmlFor="postComment" onClick={()=>setDeleteId(data)} className="flex flex-col items-center hover:bg-gray-700 rounded-lg  gap-2 hover:tooltip hover:flex hover:tooltip-open hover:tooltip-right" data-tip="Comments">
   {/* Comments */}
    <div  className=" ">
       <BiCommentDots  className="text-4xl transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1" /> 
    </div>
    <p className='text-white'>{comments?.length}</p>
  </label>
 
  </div> 


            </div>
            <div className='md:w-4/12 m-4 '>
              <Author data={data} />
            </div>
            <DeletePost deleteId={deleteId} />
            <Comment post={deleteId} />
        </div>
        </Layout>
    );
};

export default blog;




export const getStaticPaths = async () => {

    //fetch data from api
    const res = await fetch(`https://blog-server-sparmankhan.vercel.app/blogs`);
    const data = await res.json();
 
    //create paths for each item in the data
    const paths = data.map(item => ({
      params: {
        blogId: item.id.toString(),
      },
    }));
  
    //return paths
    return {
      paths,
      fallback: false,
    };
  };
  
  
  // write a get staticprops function for nextjs dynamic api call
  export async function getStaticProps(context) {
    const id = context.params.blogId
    const res = await fetch(`https://blog-server-sparmankhan.vercel.app/post/${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    };
  }
