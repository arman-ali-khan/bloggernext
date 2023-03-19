import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { contextProvider } from '../../context/AuthContext'

var Update = dynamic((e) => import("../../components/Editor/Update"), {
  ssr: false
})

export default function Home() {
    const router = useRouter()
    const id = router.query.editId

    const {user} = useContext(contextProvider)
    if(user===null){
       router.push('/login')
    }

    //   Get category and tags

const [editPost,setEditPost] = useState({})
useEffect(()=>{
    axios.get(`http://localhost:5000/post/${id}`)
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