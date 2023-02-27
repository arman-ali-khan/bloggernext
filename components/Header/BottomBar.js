import Link from "next/link";
import React, { useContext } from "react";
import {GrHomeOption} from 'react-icons/gr'
import {FiUser} from 'react-icons/fi'
import {RxDashboard} from 'react-icons/rx'
import {RiNotification2Line} from 'react-icons/ri'
import {BiMessageSquareMinus} from 'react-icons/bi'
import Sidebar from "../Modal/Sidebar";
import { contextProvider } from "../../context/AuthContext";
import Logout from "../Modal/Logout";

const BottomBar = () => {
  const {googleLogin,user,logOut} = useContext(contextProvider)

  const handleLogout = ()=>{
    logOut().then(result=>{
      console.log(result)
    })
  }
  
  const handleLogin = ()=>{
    googleLogin().then(result=>{
      console.log(result)
    })
    .then(err=>{
      console.error(err);
    })
  }
  return (
    <div className="w-full   fixed !z-50 object-center items-center justify-center bottom-12 ">
        
      <div className=" fixed backdrop-blur-md	justify-center flex  mx-auto px-3 text-white   bg-opacity-20 bg-blue-900  rounded-full">
       
        <ul className="flex relative justify-center ">
          <li>
         
    {/* <!-- Page content here --> */}
   <label  htmlFor="my-drawer" className="px-6  drawer-button sm:px-8 py-4 flex items-center text-xl text-black hover:bg-blue-100 hover:bg-opacity-30 rounded-full" href={'/'}><RxDashboard /></label>
           
            {/* < className="btn btn-primary drawer-button">Open drawer</> */}
          </li>
          <li>
           
            <div className="dropdown text-black w-full dropdown-top sm:dropdown-end">
  <label tabIndex={1} className="px-6 sm:px-8 py-4 flex items-center text-xl text-black hover:bg-blue-100 hover:bg-opacity-30 rounded-full" href={'/'}><BiMessageSquareMinus /></label>
  <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 overflow-hidden ">
    <li className="flex items-center"><a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
    <li className="flex items-center"> <a> <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/ogw/AAEL6siJ_YKAS_JAeA2_o9euKZRitBtuZj2B8_0LMtG1Hg=s32-c-mo" alt="" /> Arman Ali Khan</a></li>
  </ul>
</div>
          </li>
          <li>
            <Link className="px-6 sm:px-8 py-4 flex items-center text-xl text-black hover:bg-blue-100 hover:bg-opacity-30 rounded-full" href={'/'}><GrHomeOption /></Link>
          </li>
          <li>
            <Link className="px-6 sm:px-8 py-4 flex items-center text-xl text-black hover:bg-blue-100 hover:bg-opacity-30 rounded-full" href={'/'}><RiNotification2Line /></Link>
          </li>
          <li>
           
            <div className="dropdown  dropdown-top dropdown-left sm:dropdown-right sm:dropdown-top text-black">
  <label tabIndex={0} className="px-6 sm:px-8 py-4 flex items-center text-xl text-black hover:bg-blue-100 hover:bg-opacity-30 rounded-full" href={'/'}><FiUser /></label>

  {/* USer Menu */}
{
  user?.uid ? 
  <ul tabIndex={0} className="dropdown-content relative menu p-2 shadow bg-base-100 rounded-box w-52">
  <div>
    <img className="w-16 h-16 rounded-full absolute -top-12 flex justify-center left-16" src={user.photoURL} alt="" />
  </div>
   <div></div>
    <li className=""><a className="text-center flex justify-center">{user.displayName}</a></li>
    <li><a>Settings</a></li>
    <li><a>Dashboard</a></li>
    <li>          
<label className="bg-red-200 text-rose-600" htmlFor="logoutModal">Logout</label></li>
  </ul>
  :
  <ul tabIndex={0} className="dropdown-content relative menu p-2 shadow bg-base-100 rounded-box w-52">
   <div></div>
    <li><a onClick={()=>handleLogin()}>Login</a></li>
    <li><a>Signup</a></li>
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
