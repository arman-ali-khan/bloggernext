import React from 'react';

const Dashboard = () => {
    return (
        <div className='grid md:grid-cols-3 gap-2 mx-2 mt-4'>
  {/* Users */}
    <div className='bg-base-100 rounded-md p-3 md:p-6 border w-full'>
        <p className='flex justify-between w-full text-xs md:text-base'>Total Users : <span>45K</span></p>
        <div className='flex justify-between w-full gap-1'>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Active  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Banned  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Deactive  <span>23K</span></p>
        </div>
    </div>
    {/* Posts */}
    <div className='bg-base-200 rounded-md p-3 md:p-6 border'>
    <p className='flex justify-between w-full text-xs md:text-base'>Total Posts : <span>45K</span></p>
        <div className='flex justify-between w-full gap-1'>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Published  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>UnPublish  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Riview  <span>23K</span></p>
        </div>
    </div>
    {/* Comments */}
    <div className='bg-base-300 rounded-md p-3 md:p-6 border'>
    <p className='flex justify-between w-full text-xs md:text-base'>Total Comments : <span>45K</span></p>
        <div className='flex justify-between w-full gap-1'>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Replay  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Spams  <span>23K</span></p>
        <p className='flex flex-col bg-blue-500 p-1 md:p-3 rounded-md text-xs w-full'>Banned  <span>23K</span></p>
        </div>
    </div>
  </div>
    );
};

export default Dashboard;