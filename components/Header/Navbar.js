import { contextProvider } from '../../context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import Link from 'next/link';
import axios from 'axios';
import { AiOutlineLogin } from 'react-icons/ai';
import { RiAddCircleFill, RiAddCircleLine } from 'react-icons/ri';

const Navbar = () => {
  const {googleLogin,user,logOut,dbUser} = useContext(contextProvider)


    return (
        <div className="navbar !min-h-8 sm:!min-h-16 sticky top-0 z-50 !p-0">
  <div className='navbar !min-h-8 sm:!min-h-16 bg-base-100 !p-4 !py-0 mx-3 sm:mx-auto border-t-0 border mt-0 md:w-9/12 rounded-b-3xl'>
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li tabIndex={0}>
        <a>
        Android
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2  bg-gray-700 ">
          <li><a>Android Tips</a></li>
          <li><a>Apps Review</a></li>
          <li><a>Android Root</a></li>
        </ul>
      </li>
      <li tabIndex={0}>
        <a>
        Education
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-gray-700 ">
          <li><a>Guidlines</a></li>
          <li><a>Exam Result</a></li>
          <li><a>Pdf Books</a></li>
        </ul>
      </li>
      <li tabIndex={0}>
        <a>
        Programming
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-gray-700 ">
          <li><a>C Programming</a></li>
          <li><a>JavaScript</a></li>
          <li><a>PHP</a></li>
          <li><a>Python</a></li>
          <li><a>Java</a></li>
        </ul>
      </li>
      </ul>
    </div>
    <Link href={'/'} className=" normal-case text-xl">Home</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 bg-transparent">
      <li><a>Home</a></li>
      <li tabIndex={0}>
        <a>
        Android
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2  bg-gray-700 ">
          <li><a>Android Tips</a></li>
          <li><a>Apps Review</a></li>
          <li><a>Android Root</a></li>
        </ul>
      </li>
      
      <li tabIndex={0}>
        <a>
        Education
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-gray-700 ">
          <li><a>Guidlines</a></li>
          <li><a>Exam Result</a></li>
          <li><a>Pdf Books</a></li>
        </ul>
      </li>
      
      <li tabIndex={0}>
        <a>
        Programming
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-gray-700 ">
          <li><a>C Programming</a></li>
          <li><a>JavaScript</a></li>
          <li><a>PHP</a></li>
          <li><a>Python</a></li>
          <li><a>Java</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
   {
    dbUser?.role==='user' ? <Link className="text-3xl hover:tooltip hover:tooltip-open hover:tooltip-bottom" data-tip="Add New Post" href={'/@add-post'}>
      <RiAddCircleLine className='hover:rotate-90 transition-all duration-300 hover:transition-all hover:duration-300' />
      {/* <p className='border rounded-full h-7 w-7 flex justify-center items-center hover:rotate-45'>+</p> */}
    </Link>
    :
    <Link className="text-3xl hover:tooltip hover:tooltip-open hover:tooltip-bottom" data-tip="Login" href={'/login'}>
    <AiOutlineLogin  />
  </Link>
   }
   
  </div>
  </div>
  <BottomBar/>
</div>
    );
};

export default Navbar;