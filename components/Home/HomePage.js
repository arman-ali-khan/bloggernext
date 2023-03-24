import React from 'react';
import Sidebar from '../Modal/Sidebar';
import Pinned from '../Pinned/Pinned';
import Popular from '../RightSide/Popular';
import Recent from './Recent/Recent.js';

const HomePage = ({data}) => {
    return (
        <div className='md:flex w-full'>
            <div className='md:w-9/12 m-4'>
                <Pinned />
               <div className='md:hidden'>
               <Popular />
               </div>
                <Recent data={data} />
            </div>
            
            <div className='md:w-3/12 md:block m-4 hidden'>
              <Popular />
            </div>
           
        </div>
    );
};

export default HomePage;