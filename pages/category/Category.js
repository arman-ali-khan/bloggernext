import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { MdOutlineModeComment } from 'react-icons/md';
import Categories from '../../components/Categories/Categories';

const Category = ({category}) => {
  
    return (
        <div className='flex md:mx-12 mx-4 gap-4 md:w-9/12 my-2 rounded-lg bg-base-200 px-2 py-2'>
                <div className='md:w-44 md:h-32 w-24 h-20'>
                <img className='w-full h-full object-cover rounded-md' src={category?.thumb} alt="" />
                </div>
                <div className='w-full'>
                <div className="text-xs flex justify-between">
              <p>
                <span>in</span> {category?.categories[0]?.label}
              </p>

              <p className="flex items-center gap-1 font-semibold">
                <MdOutlineModeComment className="text-lg" /> 4
                {/* {comments.length} */}
              </p>
            </div>
            <Link
              href={`/blog/${category?.id}`}
              className={` leading-3 text-base break-words  font-bold`}
            >
              {category?.title.split(" ").slice(0, 13).join(" ")}
              {category?.title.split(" ").length > 13 && "..."}
            </Link>
                    {/* <h3 className='text-base md:text-lg'>{category?.title}</h3> */}
                    <p className='hidden md:block'>{category?.body.replace(/<\/?[^>]+>/gi, '').split(' ').slice(0,30).join(' ')}</p>
                    <div className="flex justify-between text-xs">
              <p>{moment(category?.date).fromNow()} </p>
              <p className="flex items-center gap-1 font-semibold">
                <svg
                  className="w-5 h-5 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>{" "}
                {category?.view}
              </p>
            </div>
                </div>
                <Categories />
        </div>
    );
};

export default Category;