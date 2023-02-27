import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../Layout/Layout'
import Hero from '../components/Home/Hero/Hero'
import HomePage from '../components/Home/HomePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  return (
     <Layout title={'hello'}>
{/* <Hero /> */}
<HomePage data={data} />
     </Layout>
  )
}
// write a get staticprops function for nextjs dynamic api call
export async function getStaticProps() {
  const res = await fetch(`https://blog-server-sparmankhan.vercel.app/blogs`);
  const data = await res.json();
console.log(data)
  return {
    props: {
      data,
    },
  };
}