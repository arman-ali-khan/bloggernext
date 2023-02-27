import React from 'react';
import Pinned from '../Pinned/Pinned';
import Popular from '../RightSide/Popular';
import Recent from './Recent/Recent';

const HomePage = () => {
    return (
        <div className='md:flex w-full '>
            <div className='md:w-9/12 m-4'>
                <Pinned />
                <Recent />
            </div>
            <div className='md:w-3/12 m-4 '>
              <Popular />
            </div>
        </div>
    );
};

export default HomePage;