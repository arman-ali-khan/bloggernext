import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Layout from "../../Layout/Layout";
import { useContext } from "react";
import CreatableSelect from "react-select/creatable";

import { contextProvider } from "../../context/AuthContext";
// React select
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


function Editor() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [posting, setPosting] = useState(false);

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL?.createObjectURL(e.target.files[0]));
  }

  ClassicEditor
  .create( /* ... */ )
  .then( editor => {
      console.log( editor );
  } )
  .catch( err => {
      console.error( err.stack );
  } );



  let [loaded, setLoaded] = useState(false);
  let [photUploading, setphotUploading] = useState(false);
  const [postId, setPostId] = useState(0);

  // React Select
  const animatedComponents = makeAnimated();

  // Category
  const [categories, setCategories] = useState([]);


  // Tags
  const [tags, setTags] = useState([]);
  

  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("https://blog-server-sparmankhan.vercel.app/category")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://blog-server-sparmankhan.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => {
        setPostId(parseInt(data[0]?.id) + 1);
      });
  }, []);
  const { user,dbUser } = useContext(contextProvider);
  console.log(postId);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  const [postBody, setpostBody] = useState("");

  const handlePostSubmit = (data) => {
    setphotUploading(true)
    const photo = data.photo[0];
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
        setphotUploading(false)
        setPosting(true)
        const photoUrl = photoData.url;
        const postData = {
          title: data.title,
          thumb: photoUrl,
          categories: categories,
          tags: tags,
          body: postBody.data,
          id: postId.toString(),
          view: "0",
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          username: dbUser.username,
          like: '0'
        };
        fetch("https://blog-server-sparmankhan.vercel.app/blogs", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((data) => {
            
            setPosting(false);
            reset();
            toast.success('Post Created!')
          });
      });

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
  };

  if (loaded) {
    return (
      <>
        <Layout title={"Add New Post"}>
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="lg:w-6/12 my-12 md:w-9/12 mx-3 md:mx-auto"
          >
            <div className="flex w-full flex-col">
              {/* Title */}
              <label>
                <p>Title </p>
                <input
                  {...register("title", { required: true })}
                  className="input w-full input-bordered"
                  type="text"
                />
              </label>

              {/* Category */}
              <label>
                <p>Category </p>
                <Select
                  className="py-3 bg-transparent"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={(e) => setCategories(e)}
                  options={options}
                />
              </label>
              <div className="flex items-center my-2 justify-between gap-2">
                <label className=" w-full">
                  <p> Featured Image </p>
                  <div className="flex justify-center">
                  <label>
                  <input
                    accept="image/*"
                    {...register("photo", { required: false })}
                    className="file-input hidden file-input-bordered w-full"
                    type="file"
                    onChange={handleChange}
                  />
                  
                  <div className="flex relative justify-center w-full">
                   {
                    file ?'':  <div className="border border-dashed p-12">
                      <h3>Click and upload</h3>
                    </div>
                   } 
                   </div>
                   </label>
               <div className="relative">
               {
                  file ? <>
                   <img
                  className="h-44 w-44 rounded-md object-cover"
                  src={file}
                  alt=""
                />
                
                  </>:''
                 } {
                    file &&   <button className="absolute  bg-red-100 text-rose-500 px-2 top-0 right-0 rounded-full flex justify-self-center" onClick={()=>setFile('')}>Remove</button>
                  }
               </div>
                  </div>
               
               
                  
                 
                </label>
                
              </div>
            </div>
            <CKEditor
              className="h-96 bg-transparent"
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                // do something when editor's content changed
                const data = editor.getData();
                setpostBody({ data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
            <div className="my-2">
              <p>Tags</p>
              <CreatableSelect
              className="bg-transparent"
                components={animatedComponents}
                isClearable
                isMulti
                options={options}
                onChange={(e) => setTags(e)}
              />
            </div>
            <div className="flex justify-center">
              <button disabled={!file} className={`btn btn-success`} type="submit">
                {posting && "Creating"}
                { photUploading ? 'Photo Uploading' : 'Create Post'}
              </button>
            </div>
          </form>
        </Layout>
        <div></div>
      </>
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;
