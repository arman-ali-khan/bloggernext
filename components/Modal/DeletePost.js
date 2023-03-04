import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';

const DeletePost = ({deleteId}) => {
    const router = useRouter()
    const handleDeletePost = (id) =>{
        fetch(`https://blog-server-sparmankhan.vercel.app/post/${id}`,{
          method:'DELETE',
          headers:{
            'content-type':'application/json'
          }
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          toast.success(`Post Deleted  ${deleteId.title.slice(0,20)}`)
          router.push('/')
        })
       }
    return (
        <div>


{/* Put this part before </body> tag */}
<input type="checkbox" id="deleteModal" className="modal-toggle" />
<label htmlFor="deleteModal" className="modal cursor-pointer">
  <label className="modal-box relative" htmlFor="">
    <h3 className="text-lg font-bold">Delete {deleteId.title}</h3>
    <p className="py-4">Confirm To Delete {deleteId.title}</p>
    <div className='flex gap-1 items-center justify-end'>
 <label htmlFor="deleteModal"  className='btn btn-sm btn-info bg-blue-100 text-blue-600 border-none hover:text-white rounded'>Cancel</label>
  <button className='btn btn-sm btn-error bg-rose-100 text-rose-600 border-none hover:text-white rounded' onClick={()=>handleDeletePost(deleteId._id)}>Confirm</button>
 </div>
  </label>

</label>
        </div>
    );
};

export default DeletePost;