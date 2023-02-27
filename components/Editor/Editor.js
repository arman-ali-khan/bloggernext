import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Layout from "../../Layout/Layout";
import { useContext } from "react";
import { contextProvider } from "../../context/AuthContext";



function Editor() {
  let [loaded, setLoaded] = useState(false);
const [postId,setPostId] = useState(0)
  useEffect(()=>{
    fetch('https://blog-server-sparmankhan.vercel.app/blogs')
    .then(res=>res.json())
    .then(data=>{
      
      setPostId(parseInt(data[0].id)+1)
    })
  },[])
  const {user} = useContext(contextProvider)
  console.log(postId)

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

const [data,setData] = useState('')
const [title,setTitle] = useState('')
const [category,setCategory] = useState('')
const postData = {
  user:{
    name: user?.displayName,
    photo: user?.photoURL
  },
  title: title,
  category: category,
  body: data.data,
  id: postId.toString()
}

const handleSubmit = ()=>{
  
fetch('https://blog-server-sparmankhan.vercel.app/blogs',{
  method:'POST',
  headers:{
    'content-type':'application/json'
  },
  body: JSON.stringify(postData)
}).then(res=>res.json())
.then(data=>{
  console.log(data)
})
}

  if (loaded) {
    return (
     <>
     <Layout>
    <div className="w-9/12 mx-auto">
      <div className="flex w-full ">
       <label>
        Title 
        <input onChange={e=>setTitle(e.target.value)} className="input w-full input-bordered" type="text" />
       </label>
       <label>
        Title 
        <input onChange={e=>setCategory(e.target.value)} className="input w-full input-bordered" type="text" />
       </label>
      </div>
    <CKEditor className='h-96'
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {  // do something when editor's content changed
          const data = editor.getData();
          setData({  data });
          
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
   <div className="flex justify-center">
   <button className="btn " onClick={()=>handleSubmit()}>Submit</button>
   </div>
    </div>
     </Layout>
     <div>
     
     </div>
     </>
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;