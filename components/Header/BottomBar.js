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
import Notify from "../Modal/Notify";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const BottomBar = () => {
  const {googleLogin,user,logOut,dbUser,category,setCategory} = useContext(contextProvider)

  // Bottom bar

  const [prevScrollPos, setPrevScrollPos] = useState(0);
const [visible, setVisible] = useState(true)

const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if(currentScrollPos > prevScrollPos){
        setVisible(false)
    }else{
        setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
}

useEffect( () => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
})

// back to top


const [topprevScrollPos, setTopPrevScrollPos] = useState(0);
const [topvisible, setTopVisible] = useState(false)

const topHandleScroll = () => {
    const currentScrollPos = window.scrollY

    if(currentScrollPos > topprevScrollPos){
        setTopVisible(false)
    }else{
        setTopVisible(true)
    }

    setTopPrevScrollPos(currentScrollPos)
}

useEffect( () => {
    window.addEventListener('scroll', topHandleScroll);

    return () => window.removeEventListener('scroll', topHandleScroll)
})


const [theme, setTheme] = React.useState(typeof window !== 'undefined' && localStorage.getItem('theme'));
const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme',theme === 'dark' ? 'light' : 'dark')
};
// initially set the theme and "listen" for changes to apply them to the HTML tag
React.useEffect(() => {
  document.querySelector('html').setAttribute('data-theme', theme);
}, [theme]);


  return (
    <div className={`${visible ? ' fixed bottom-5 sm:bottom-12  duration-500 transition-all' : 'hidden md:fixed -top-44 md:bottom-12 translate-y-10 md:translate-y-0 duration-500 transition-all'} w-full duration-500 transition-all !z-50 object-center items-center justify-center md:fixed md:bottom-12 sm:bottom-12 `} >

      
      
      <div className=" fixed backdrop-blur-md	justify-center flex  mx-auto px-3 text-base md:bg-opacity-70 bg-base-300  opacity-90 md:bg-base-200  rounded-full">
    
        <ul className="flex relative justify-center ">
          <li className="list-none">
         
    {/* <!-- Page content here --> */}
   <label onClick={()=>setCategory(!category)} htmlFor="my-drawer" className="px-6  drawer-button sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Categories" href={'/'}><RxDashboard /></label>
           
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
            <Link className="sm:px-6 px-2 w-full md:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Home" href={'/'}><img className="w-6 h-6" src='https://res.cloudinary.com/dcckbmhft/image/upload/v1677914511/fav_dtornq.svg' alt="" /></Link>
          </li>
          {/* Notifications */}
          <li className="list-none">
            <label htmlFor="notify" className="px-6 sm:px-8 py-4 flex items-center text-xl text- hover:bg-gray-500 hover:bg-opacity-30 rounded-full hover:tooltip hover:block tooltip-open tooltip-top"  data-tip="Notification" href={'/'}><RiNotification2Line /></label>
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
{/* Day Night */}
<label className="swap swap-rotate !place-content-start px-4 py-3">
      <input onClick={toggleTheme}  type="checkbox" />
    <div className="swap-on flex items-center justify-start gap-2 "><MdDarkMode className="text-2xl" />Light </div>
      <div className="swap-off flex items-center justify-start gap-2 "><MdLightMode className="text-2xl" /> Dark</div>
    
    </label>

   
    <li className="list-none">          
<label className="bg-red-200 text-rose-600" htmlFor="logoutModal">Logout</label></li>
  </ul>
  :
  <ul tabIndex={0} className="dropdown-content border relative menu p-2 shadow bg-base-100 rounded-box w-52">
   <div></div>
    <li className="list-none"><Link href={'/login'}>Login</Link></li>
    <li className="list-none"><Link href={'/register'}>Signup</Link></li>
 {/* Day Night */}
    <label className="swap swap-rotate !place-content-start px-4 py-3">
      <input onClick={toggleTheme}  type="checkbox" />
    <div className="swap-on flex items-center justify-start gap-2 "><MdDarkMode className="text-2xl" />Light </div>
      <div className="swap-off flex items-center justify-start gap-2 "><MdLightMode className="text-2xl" /> Dark</div>
    
    </label>
  </ul>
}
</div>
          </li>
        </ul>
      </div>
      <Sidebar />
      <Logout />
      <Notify />
      {/* Back to top */}
      <a href="#top" className={` ${topvisible ? '   -translate-y-10':'-translate-y-14'} fixed -translate-y-14 right-6 bg-base-100 rounded-full px-2`}>Top</a>
    </div>
  );
};

export default BottomBar;
