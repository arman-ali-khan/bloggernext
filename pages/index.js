import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../Layout/Layout'
import Hero from '../components/Home/Hero/Hero'
import HomePage from '../components/Home/HomePage'
import Categories from '../components/Categories/Categories'
import useSWRInfinite from 'swr/infinite'
import useSWR from 'swr'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `https://blog-server-sparmankhan.vercel.app/blogs?page=${pageIndex}&size=4`                   // SWR key
  }

const {data:pageData,size,setSize} = useSWRInfinite(getKey)
console.log({pageData});
  return (
     <Layout title={'Home || Next Blog'}>
{/* <Hero /> */}
<Categories />
<HomePage data={data} />
  <button onClick={()=>setSize(size+1)}>Load More</button>    
     </Layout>
  )
}
// write a get staticprops function for nextjs dynamic api call
export async function getStaticProps() {
  const res = await fetch(`https://blog-server-sparmankhan.vercel.app/blogs`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}