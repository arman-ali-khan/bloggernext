import Link from 'next/link';
import React, { useContext } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { contextProvider } from '../../context/AuthContext';

const Categories = () => {
    const {category,setCategory} = useContext(contextProvider)
    return (
       <div className={`${category ?"flex ":''}`}>
         <div  className={`fixed ${category ? 'transition-all duration-300 left-0 ':'transition-all duration-300 -left-96 '}  items- top-0 h-full z-[99999999]`}>

<ul className=' bg-base-200 py-7 rounded-r-xl h-full overflow-y-auto '>
  <Link href={'#'} ><li className="text-lg py-2 px-12 hover:bg-base-300 list-none font-semibold">Layout</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Containers</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Flexbox</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Grid</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Spacing</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Typography</li></Link>
  <Link href={'#'} ><li className="text-lg py-2 px-12 hover:bg-base-300 list-none font-semibold">Components</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Alerts</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Buttons</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Cards</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Forms</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Navigation</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Tables</li></Link>
  <Link href={'#'} ><li className="text-lg py-2 px-12 hover:bg-base-300 list-none font-semibold">Utilities</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Animations</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Backgrounds</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Borders</li></Link>
  <Link href={'#'} ><li className="text-base py-2 px-12 hover:bg-base-300 list-none">Display</li></Link>
  </ul>


        </div>
        <div onClick={()=>setCategory(!category)} className={` ${category ? 'left-0 fixed z-50 w-full bg- h-full ':'hidden w-0  h-0 absolute top-0'}`}></div>
       </div>
    );
};

export default Categories;