import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im'
import { contextProvider } from '../../context/AuthContext';
import ButtonLoader from '../Loader/ButtonLoader';


const Comment = ({post}) => {
const [loading,setLoading] = useState(false)

    const {user,dbUser,commented,setCommented} = useContext(contextProvider)
    //  get comment
const [comments,setComments] = useState({})
useEffect(()=>{
  axios.get(`https://blog-server-sparmankhan.vercel.app/comment/${post._id}`)
  .then(res=>{
    setComments(res.data)
    
  }).catch(function (error) {
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
  
},[post,commented])

const { register,reset, handleSubmit, formState: { errors } } = useForm();
// post comment

const handlePostComment = data =>{
    setLoading(true)
    const commentBody = {
        comment: data.comment,
        name: dbUser.name,
        email: user.email,
        photo: dbUser.photo,
        id: post._id,
        postId: post.id
    }
    fetch(`https://blog-server-sparmankhan.vercel.app/comment`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(commentBody)
    })
    .then(res=>res.json())
    .then(data=>{
        setLoading(false)
        reset()
        toast.success('Comment Added!')
        setCommented(!commented)
    })
}


const handleDeleteComment = id =>{
    fetch(`https://blog-server-sparmankhan.vercel.app/comment/${id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
       
        toast.success('Comment Deleted!')
        setCommented(!commented)
    })
}




    return (
        <div>
{/* Put this part before </body> tag */}
<input type="checkbox" id="postComment" className="modal-toggle" />
<label htmlFor="postComment" className="modal cursor-pointer">
  <label className="modal-box  md:w-7/12 max-w-3xl relative" htmlFor="">
<label className='flex absolute top-2 w-7 h-7 justify-center cursor-pointer items-center right-3  border  rounded-full p-1 ' htmlFor="postComment" >
    <ImCancelCircle className='text-5xl' />
</label>
 

    <h3 className="text-lg font-bold">All Comments of {post.title}</h3>
    <p className="py-2  w-full"></p>
    {
                dbUser.email ? <form onSubmit={handleSubmit(handlePostComment)} className='my-4 flex-col flex border-b py-2  md:flex-row gap-2 items-center'>
          
    <textarea {...register("comment", { required: true })}  type="text" className='textarea textarea-bordered w-full h-20' ></textarea>
<button className=' md:w-40 btn'>{loading?<ButtonLoader w={6} h={6} />:'Add Comment'}</button>
        </form>
        :
        <Link className='my-3 text-blue-400 hover:underline' href={'/login'} >Login to add comment</Link>
            }
        
       { comments.length ?
        comments.map(comment=> <div key={comment._id} className='flex my-2 items-center gap-1'>
        <div className='w-12 h-12 flex justify-center'>
            <img src={comment.photo} className='w-12 h-12 rounded-full' alt="" />
        </div>
        <div className='w-full border-b  py-1'>
            <div className='flex justify-between w-full'>
            <Link href={`#`} className='text-base font-bold'>{comment.name}</Link>
{/* Delete btn */}
          {
            dbUser.email === comment.email &&   <div className="dropdown dropdown-left dropdown-end">
            <label tabIndex={0} className="bg-rose-100 flex  text-rose-600 px-3 py-1 rounded-full hover:bg-rose-200"><AiOutlineDelete className='text-xl' /></label>
            
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 border rounded-xl w-64 sm:w-80 md:w-96 items-center gap-2 !flex flex-row justify-center">
            <p>Confirm to delete <span className='text-blue-400'> {comment.comment.slice(0,20)}</span></p>
             
              <button onClick={()=>handleDeleteComment(comment._id)} className='bg-rose-100 flex hover:bg-rose-200 justify-center text-rose-600 px-3 py-2 rounded-full'>Confirm</button>
            </ul>
          </div>
          }
                </div>
            <p className='text-sm '>{comment.comment}</p>
        </div>
    </div>):''
       }
  </label>
</label>
        </div>
    );
};

export default Comment;