import Link from 'next/link';
import React from 'react';
import { BiBookmarkAlt } from 'react-icons/bi';

const Pinned = () => {
    return (
      <div>
         <div className="w-full px-2 bg-blue-100 text-blue-600 rounded-md my-2 font-bold py-2">
      <h3 className="text-xl ">Featured Posts</h3>
    </div>
        <div className='md:flex gap-2 relative items-center bg-gray-200 my-2 rounded-xl p-3'>
            <p className='absolute top-0 right-0 bg-blue-200 font-semibold text-blue-600 px-3 rounded-xl rounded-br-none rounded-tl-none'> Pinned</p>
     <div>
     <div className='md:w-64 h-32'>
        <img className='rounded-xl w-full h-full object-cover' src="https://1.bp.blogspot.com/-X2Rs7OugqQM/YE-Qv1mcTwI/AAAAAAAACjw/srui_jTAHCM7fVoEhqMBPWy1iyPSj92yACLcBGAsYHQ/w600-h300-p-k-no-nu-rw-e30/FB_IMG_16158268477532132.jpg" alt="" />
      </div>
     </div>
      <div>
        <p><span>in</span> Ghost Story</p>
        <h3 className='text-xl font-bold'> [ভুতের গল্প] ভৌতিক কাহিনী। লেখকঃ গৌরাঙ্গপ্ৰসাদ বসু</h3>
<p> কলকাতা থেকে দার্জিলিং। শিয়ালদা থেকে দার্জিলিং মেলে শিলিগুড়ি। শিলিগুড়ি থেকে ভাড়া-মোটরে দার্জিলিং।
পুজোর ছুটিতে কলকাতা ছেড়ে আমাদের দার্জিলিং আসা। আমাদের মানে‚ আমার ও আমার বন্ধু কমলের।</p>
<div className='flex justify-between'>
<p>Published 12 June 2023   </p> 
<Link href={'#'} >Read More</Link>
</div>
      </div>
        </div>
      </div>
        
    );
};

export default Pinned;