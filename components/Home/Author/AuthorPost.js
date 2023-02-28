import React from 'react';

const AuthorPost = () => {
    return (
       <div>
        <div>
            <h4 className='bg-blue-100 mt-3 text-base text-blue-600 px-2 rounded-md my-1'>Some posts by this author</h4>
        </div>
       <div className='sm:flex md:block '>
       <div className='flex  gap-1'>
            <div className='w-20 h-16'>
                <img className='w-20 h-16 rounded-xl' src="http://res.cloudinary.com/dcckbmhft/image/upload/v1677566269/nextblog/mbw2pmncpq1nefuoa7nt.webp" alt="" />
            </div>
            <div className='w-full'>
                <h2 className='text-base font-semibold'>How does does a browser run  browser run JavaScript?</h2>
                <p className='text-xs'>3 Days ago</p>
            </div>
        </div>
        <div className='flex  gap-1'>
            <div className='w-20 h-16'>
                <img className='w-20 h-16 rounded-xl' src="http://res.cloudinary.com/dcckbmhft/image/upload/v1677566269/nextblog/mbw2pmncpq1nefuoa7nt.webp" alt="" />
            </div>
            <div className='w-full'>
                <h2 className='text-base font-semibold'>How does a browser run  browser run JavaScript?</h2>
                <p className='text-xs'>3 Days ago</p>
            </div>
        </div>
       </div>
       </div>
    );
};

export default AuthorPost;