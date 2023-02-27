import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../Layout/Layout'
import Hero from '../components/Home/Hero/Hero'
import HomePage from '../components/Home/HomePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <Layout title={'hello'}>
{/* <Hero /> */}
<HomePage />
     </Layout>
  )
}
