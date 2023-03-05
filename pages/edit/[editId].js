import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

var Update = dynamic((e) => import("../../components/Editor/Update"), {
  ssr: false
})

export default function Home() {
    const router = useRouter()
    const id = router.query.editId


    //   Get category and tags

const [editPost,setEditPost] = useState({})
useEffect(()=>{
    axios.get(`https://blog-server-sparmankhan.vercel.app/post/${id}`)
    .then(res=>{
        setEditPost(res.data)
    })
},[id])
  return (
    <div >
      <Update editPost={editPost} />
    </div>
  )
}