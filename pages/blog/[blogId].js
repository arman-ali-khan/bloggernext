
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
import { BiCommentDots, BiFolder, BiHeart } from 'react-icons/bi';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import Comment from '../../components/Modal/Comment';
import axios from 'axios';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi2'
import Categories from '../../components/Categories/Categories';
import { v4 as uuidv4 } from 'uuid';
import { FiEye } from 'react-icons/fi';
import Lottie from "lottie-react";
import gettingLike from '../../assest/lottie/love.json'
import ButtonLoader from '../../components/Loader/ButtonLoader';



const blog = ({data}) => {


  // like update
  const [likeUpdate,setLikeUpdate] = useState(false)
  const {user,commented,dbUser} = useContext(contextProvider)
  //   likes
  const [likes,setLikes] = useState([])

  const router = useRouter()
  const id = router.query.blogId
  const [postView,setPostView] =  useState({})
   // Post view update
  // const [view,setView] = useState(postView.view+1)
const [viewLoading,setViewLoading] = useState(true)

//   useEffect(()=>{
//     if(typeof(id) ==='string'){
//       axios.get(`http://localhost:5000/post/${id}`)
//     .then(res=>{
//       setPostView(res.data)
//       setViewLoading(false)
//     })
//     }
//   },[])
// console.log(postView);


// const [datar, setDatar] = useState({datar: {}});

const [err, setErr] = useState('');

useEffect(() => {
  // 👇️ this only runs once
  console.log('useEffect ran');

  // 👇️ fetch data from remote API
  async function getUsers() {
    try {
      const response = await fetch(`http://localhost:5000/post/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));
      setPostView(result);
      setViewLoading(false)
    } catch (err) {
      setErr(err.message);
    }
  }

  getUsers();
}, []); 



// like loading
const [likeLoading,setLikeLoading] = useState(false)





// like update
useEffect(()=>{
  axios.get(`http://localhost:5000/likes/${data._id}`)
  .then(res=>{
    setLikes(res.data)
  })
},[likeUpdate])

// Get like 

const [userLike,setUserLike] = useState({})
useEffect(()=>{
  axios.get(`http://localhost:5000/like/${data._id}?email=${user?.email}`)
  .then(res=>{
    setUserLike(res.data)
  })
},[data,user?.email,likeUpdate])




const handleLike = e =>{
  setLikeLoading(true)
  const likeData = {
    name: dbUser.name,
    email: dbUser.email,
    postEmail: data.email,
    postId: data.id,
    id: e,
    title: data.title
  }
  fetch(`http://localhost:5000/like`,{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(likeData)
  })
  .then(res=>res.json())
  .then(data=>{
    setLikeUpdate(!likeUpdate)
    toast.success('Liked',{
      icon: '❤️',
    })
    setLikeLoading(false)
  })
}


// unlike

const handleUnLike= id =>{
  fetch(`http://localhost:5000/like/${id}?email=${user?.email}`,{
    method:'DELETE',
  })
  .then(res=>res.json())
  .then(data=>{
    toast.error('Unliked',{
  icon: '💔',
})
setLikeUpdate(!likeUpdate)
  })
}
  
 const post = data.body
 const socialBody = post.replace(/<\/?[^>]+>/gi, '')


 const [deleteId,setDeleteId] = useState({})

 const [commentShow,setCommentShow] = useState(true)


 const [comments,setComments] = useState({})
 useEffect(()=>{
   axios.get(`http://localhost:5000/comment/${data._id}`)
   .then(res=>{
     setComments(res.data)
   })
   
 },[data._id,commented])

    return (
        <Layout title={`${data.title} || Next Blogger`} description={socialBody} body={data.body} thumb={data.thumb}>
           <Categories />
           <div className='md:flex w-full '>
            <div className='md:w-full m-2'>
            <div className="mx-auto md:p-2 dark:bg-gray-800 ">
	<div className="flex flex-col mx-auto overflow-hidden rounded relative">
		<img src={data.thumb} alt="" className="w-full h-60 sm:h-96 object-cover object-center dark:bg-gray-500" />
    <div className='absolute top-4 flex justify-between w-full '>
      <Link href={`/category/${data.categories[0].value}`} className='flex items-center gap-2 ml-3 bg-base-100 px-2 py-1 rounded-full'><BiFolder />{data.categories[0].label}</Link>
      <div className='flex items-center mr-3 gap-2 bg-base-100 px-2 py-1 rounded-full'><FiEye />
      {
        viewLoading ? <ButtonLoader w={4} h={4} />
        :
        <div>{postView?.view}</div>
      }
      </div>
    </div>
		<div className="p-2 pb-12 mx-auto -mt-16 space-y-6 sm:px-3 sm:mx-3 lg:mx-12 rounded-xl border bg-base-100">
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



{/* Desktop Comment */}
 <div className={`md:flex flex-col border shadow-lg gap-2 left-0 hidden py-4 fixed  top-1/2 mx-3  items-center  bg-base-100 px-2 rounded-lg duration-300 transition-all `}>
  {/* Like */}

  {
    user?.email ? <div className="flex flex-col items-center gap-2">
  {/* onClick={()=>handleUnLike(data._id)}  */}
    {
      userLike?.email ? 
     <>
      {
        likeLoading ? 
        <div className='w-9 h-9 overflow-hidden'>
          <Lottie className='w-9 h-9 overflow-hidden' animationData={gettingLike} loop={false} />
        </div>
         :
          <div  className=" hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Unlike">
         <RiHeart3Fill onClick={()=>handleUnLike(data._id)} className="text-rose-200 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-600 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1  " />
      </div>
      }
     </>
     
     
      :

      <>
      {
        likeLoading ?  <div  className='w-9 h-9 overflow-hidden'>
        <Lottie className='w-9 h-9 overflow-hidden' animationData={gettingLike} loop={false} />
      </div>
      :  <div className="hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Like">
        <RiHeart3Line onClick={()=>handleLike(data._id)} className="text-rose-600 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-200 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1 " />
      </div>
      }
      </>
    
    }
   
    <p >{likes?.length}</p>
  </div>
    :
    <div className="flex flex-col items-center gap-2">
    
     
        <div  className=" hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Login to like">
           <RiHeart3Fill  className="text-rose-200 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-600 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1  " />
        </div>
     
      <p >{likes?.length}</p>
    </div>
  }
  
  <label htmlFor="postComment" onClick={()=>setDeleteId(data)} className="flex flex-col items-center hover:bg-base-300  rounded-lg  gap-2 hover:tooltip hover:flex hover:tooltip-open hover:tooltip-right" data-tip="Comments">
   {/* Comments */}
    <div  className=" ">
       <BiCommentDots  className="text-4xl transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1" /> 
    </div>
    <p>{comments?.length}</p>
  </label>
 
  </div> 


            </div>
            <div className='md:w-4/12 m-4 '>
              <Author data={data} />
            </div>



            <DeletePost deleteId={deleteId} />
            <Comment post={deleteId} />
        </div>


{/* Mobile Like comment */}
        <div className={`flex gap-2 md:hidden py-4 fixed duration-300 transition-all top-1/2 ${commentShow?'':'ml-12'}  items-center`}>
 <div className={`flex flex-col gap-2 py-4 fixed  top-1/2 mx-3  items-center  bg-base-100 px-2 rounded-lg duration-300 transition-all ${commentShow ? '-left-20':'left-0'}`}>
  {/* Like */}
  {
    user?.email ? <div className="flex flex-col items-center gap-2">
  {/* onClick={()=>handleUnLike(data._id)}  */}
    {
      userLike?.email ? 
      <>
      {
        likeLoading ? 
        <div className='w-9 h-9 overflow-hidden'>
          <Lottie className='w-9 h-9 overflow-hidden' animationData={gettingLike} loop={false} />
        </div>
         :
          <div  className=" hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Unlike">
         <RiHeart3Fill onClick={()=>handleUnLike(data._id)} className="text-rose-200 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-600 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1  " />
      </div>
      }
     </>
     
      :
      <>
      {
        likeLoading ?  <div  className='w-9 h-9 overflow-hidden'>
        <Lottie className='w-9 h-9 overflow-hidden' animationData={gettingLike} loop={false} />
      </div>
      :  <div className="hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Like">
        <RiHeart3Line onClick={()=>handleLike(data._id)} className="text-rose-600 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-200 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1 " />
      </div>
      }
      </>
    }
   
    <p >{likes?.length}</p>
  </div>
    :
    <div className="flex flex-col items-center gap-2">
    
     
        <div  className=" hover:tooltip hover:tooltip-open hover:tooltip-right  hover:flex" data-tip="Login to like">
           <RiHeart3Fill  className="text-rose-200 hover:text-red-300 hover:bg-rose-600 text-4xl bg-rose-600 transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1  " />
        </div>
     
      <p >{likes?.length}</p>
    </div>
  }
  <label htmlFor="postComment" onClick={()=>setDeleteId(data)} className="flex flex-col items-center hover:bg-base-100 rounded-lg  gap-2 hover:tooltip hover:flex hover:tooltip-open hover:tooltip-right" data-tip="Comments">
   {/* Comments */}
    <div  className=" ">
       <BiCommentDots  className="text-4xl transition-all duration-200 hover:transition-all hover:duration-200 rounded-full p-1" /> 
    </div>
    <p className='text-white'>{comments?.length}</p>
  </label>
 
  </div> 
{/* Show hide btn */}
  <div onClick={()=>setCommentShow(!commentShow)} className={`bg-gray-600 text-white py-6 rounded-r-full  ${commentShow?'':'ml-4'}`}>
    {
      commentShow ? <HiOutlineChevronDoubleRight /> : <HiOutlineChevronDoubleLeft />
    }

</div>

 </div>

        </Layout>
    );
};

export default blog;




export const getStaticPaths = async () => {

    //fetch data from api
    const res = await fetch(`http://localhost:5000/blogs`);
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
    const res = await fetch(`http://localhost:5000/post/${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    };
  }
