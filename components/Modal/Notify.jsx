import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../context/AuthContext';
import ButtonLoader from '../Loader/ButtonLoader';

const Notify = () => {
  const [loading,setLoading]=useState(true)
  const {user} = useContext(contextProvider)
  const [notifies,setNotifies] = useState([])

  useEffect(()=>{
    axios.get(`https://blog-server-sparmankhan.vercel.app/notification?email=${user?.email}`)
    .then(res=>{
      setLoading(false)
      setNotifies(res.data)})
  },[user])

    return (
        <div>
            {/* The button to open modal */}


{/* Put this part before </body> tag */}


<div className='mt-4'>




<input type="checkbox" id="notify" className="modal-toggle" />

<label htmlFor="notify" className="modal cursor-pointer flex-col ">
<div>
<h3 className="text-lg font-bold">Notifications</h3>
<label htmlFor="notify" className="btn btn-sm  absolute right-4 bottom-2">Close</label>
</div>
  <label className="modal-box relative mb-9" htmlFor="notify">
    {
      loading ?<div className='flex justify-center'> <ButtonLoader w={12} h={12} /></div>
      :
      <>
       {
    notifies.map(notify=><Link htmlFor="notify" key={notify._id} href={`/blog/${notify.postId}`}><p className="p-4 rounded-md hover:bg-base-200">{notify.name} {'Like'} your post {notify.title.split(' ').slice(0,5).join(' ')}</p></Link>)
   }
   </>
    }
  
    
    
  </label>
</label>
</div>
        </div>
    );
};

export default Notify;