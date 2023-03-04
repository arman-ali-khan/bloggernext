import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {GrHomeOption} from 'react-icons/gr'
import {FiUser} from 'react-icons/fi'
import {RxDashboard} from 'react-icons/rx'
import {RiNotification2Line} from 'react-icons/ri'
import {BiMessageSquareMinus} from 'react-icons/bi'
import Sidebar from "../Modal/Sidebar";
import { contextProvider } from "../../context/AuthContext";
import Logout from "../Modal/Logout";
import axios from "axios";
import logo from '../../logo/logo.svg'

const BottomBar = () => {
  const {googleLogin,user,logOut,dbUser} = useContext(contextProvider)

  

  return (
    <div className="w-full fixed !z-50 object-center items-center justify-center bottom-12 ">
        
      <div className=" fixed backdrop-blur-md	justify-center flex  mx-auto px-3 text-white md:bg-opacity-70 bg-gray-600  opacity-90 md:bg-gray-600  rounded-full">
       
        <ul className="flex relative justify-center ">
          <li className="list-none">
         
    {/* <!-- Page content here --> */}
   <label  htmlFor="my-drawer" className="px-6  drawer-button sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Categories" href={'/'}><RxDashboard /></label>
           
            {/* < className="btn btn-primary drawer-button">Open drawer</> */}
          </li>
          <li className="list-none">
           
            <div className="dropdown text- w-full dropdown-top sm:dropdown-end">
  <label tabIndex={1} className="px-6 sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:flex tooltip-open tooltip-top"  data-tip="Message" href={'/'}><BiMessageSquareMinus /></label>
  <ul tabIndex={1} className="dropdown-content border menu p-2 shadow bg-base-100 rounded-box w-64 overflow-hidden ">
    <li className="flex items-center"><a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
  </ul>
</div>
          </li>
          {/* HOme  */}
          <li className="list-none">
            <Link className="px-6 sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Home" href={'/'}><img className="w-6 h-6" src='https://res.cloudinary.com/dcckbmhft/image/upload/v1677842885/Mediamodifier-Design_tcxawk.svg' alt="" /></Link>
          </li>
          {/* Notifications */}
          <li className="list-none">
            <Link className="px-6 sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Notification" href={'/'}><RiNotification2Line /></Link>
          </li>
          <li className="list-none">
           
            <div className="dropdown  dropdown-top dropdown-left sm:dropdown-right sm:dropdown-top text-">
  <label tabIndex={0} className="px-6 sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:flex tooltip-open tooltip-top"  data-tip="Profile" href={'/'}><FiUser /></label>

  {/* USer Menu */}
{
  dbUser  ? 
  <ul tabIndex={0} className="dropdown-content border relative menu p-2 shadow bg-base-100 rounded-box w-52">
  <div>
    <img className="w-16 h-16 rounded-full absolute -top-12 flex justify-center left-16" src={dbUser.photo} alt="" />
  </div>
   <div></div>
    <li className=""><a className="text-center flex justify-center">{dbUser.name}</a></li>
    <li className="list-none"><a>Settings</a></li>
    <li className="list-none"><a>Dashboard</a></li>
    <li className="list-none">          
<label className="bg-red-200 text-rose-600" htmlFor="logoutModal">Logout</label></li>
  </ul>
  :
  <ul tabIndex={0} className="dropdown-content border relative menu p-2 shadow bg-base-100 rounded-box w-52">
   <div></div>
    <li className="list-none"><Link href={'/login'}>Login</Link></li>
    <li className="list-none"><Link href={'/register'}>Signup</Link></li>
  </ul>
}
</div>
          </li>
        </ul>
      </div>
      <Sidebar />
      <Logout />
    </div>
  );
};

export default BottomBar;
