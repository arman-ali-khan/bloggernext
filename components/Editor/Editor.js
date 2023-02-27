import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Layout from "../../Layout/Layout";
import { useContext } from "react";
import { contextProvider } from "../../context/AuthContext";
// React select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useForm } from "react-hook-form";



function Editor() {

  const { register, formState: { errors }, handleSubmit } = useForm();




  let [loaded, setLoaded] = useState(false);
const [postId,setPostId] = useState(0)





// React Select 
const animatedComponents = makeAnimated();

// Category
const [categories,setCategories] = useState([])
console.log(categories)

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


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

const [postBody,setpostBody] = useState('')



const handlePostSubmit = (data)=>{
  const photo = data.photo[0]
  const photoData = new FormData();
    photoData.append("file", photo);
    photoData.append("upload_preset", "nextblog");
    photoData.append("cloud_name", "dcckbmhft");
    fetch("  https://api.cloudinary.com/v1_1/dcckbmhft/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((resp) => resp.json())
      .then((photoData) => {
        const photoUrl = photoData.url;
        const postData = {
          title: data.title,
          thumb: photoUrl,
          categories: categories,
          body: postBody.data,
          id: postId.toString(),
          user:{
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL
          }
        }
        fetch('https://blog-server-sparmankhan.vercel.app/blogs/blogs',{
          method: 'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
        })
      }
      )

// fetch('https://blog-server-sparmankhan.vercel.app/blogs',{
//   method:'POST',
//   headers:{
//     'content-type':'application/json'
//   },
//   body: JSON.stringify(postData)
// }).then(res=>res.json())
// .then(data=>{
//   console.log(data)
// })
}



  if (loaded) {
    
    return (
     <>
     <Layout title={'Add New Post'}>
    <form onSubmit={handleSubmit(handlePostSubmit)} className="lg:w-6/12 md:w-9/12 mx-3 md:mx-auto">
      <div className="flex w-full flex-col">
        {/* Title */}
       <label>
        <p>Title </p>
        <input {...register("title", { required: true })} className="input w-full input-bordered" type="text" />
       </label>

       {/* Category */}
       <label>
        <p>Title </p>
        <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onChange={(e)=>setCategories(e)}
      options={options}
    />
       </label>
       <div className="flex items-center my-2 justify-between gap-2">
       <label className="lg:w-9/12 w-full">
       <p> Featured Image </p>
        <input {...register("photo", { required: true })}  className="file-input file-input-bordered w-full" type="file" />
       </label>
       <div className="">
        <img className="h-24 w-32 rounded-md object-cover" src="https://res.cloudinary.com/dcckbmhft/image/upload/v1673848148/cld-sample-5.jpg" alt="" />
       </div>
       </div>
      </div>
    <CKEditor className='h-96'
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {  // do something when editor's content changed
          const data = editor.getData();
          setpostBody({  data });
          
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
   <div className="flex justify-center">
   <button className="btn " type="submit">Submit</button>
   </div>
    </form>
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