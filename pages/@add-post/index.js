import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from "react";
import Sidebar from '../../components/Modal/Sidebar';
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { contextProvider } from "../../context/AuthContext";
import Layout from '../../Layout/Layout';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];


export default function Home() {
  const {user,dbUser} = useContext(contextProvider)
// ======================================================

// React hook form
const {
  register,
  reset,
  formState: { errors },
  handleSubmit,
} = useForm();

  // React Select
  const animatedComponents = makeAnimated();

// Post id
const [postId, setPostId] = useState(0);

useEffect(() => {
  fetch("https://blog-server-sparmankhan.vercel.app/blogs")
    .then((res) => res.json())
    .then((data) => {
      setPostId(parseInt(data[0]?.id) + 1);
    });
}, []);

// Tags
const [tags, setTags] = useState([]);

// Category
  const [categories, setCategories] = useState([]);
// Category load
const [category, setCategory] = useState([]);
useEffect(() => {
  fetch("https://blog-server-sparmankhan.vercel.app/category")
    .then((res) => res.json())
    .then((data) => {
      setCategory(data);
    });
}, []);


const [postBody, setpostBody] = useState("");




// Photo upload 
const [uploadedPhoto, setUploadedPhoto] = useState("");
// Uploading...
const [uploadLoad, setUploadPhoto] = useState(false);

  // photo upload error
  const [error, setError] = useState("");
// Photo upload handle
  const handlePhotoUpload = (data) => {
    setUploadPhoto(true);
    const photo = data;
    console.log(photo);
    const photoData = new FormData();
    photoData.append("file", photo);
    photoData.append("upload_preset", "nextblog");
    photoData.append("cloud_name", "dcckbmhft");
    fetch("https://api.cloudinary.com/v1_1/dcckbmhft/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((resp) => resp.json())
      .then((photoData) => {
        const photoUrl = photoData.url;
        setUploadedPhoto(photoUrl);
        setUploadPhoto(false);
        console.log(photoUrl);
      })
      .catch(err=>{
        setError(err.message)
      })
  };

  // posting ...
  const [posting, setPosting] = useState(false);

  // Upload to db
  const handlePostSubmit = (data) => {
    setPosting(true);
    const postData = {
      title: data.title,
      thumb: uploadedPhoto,
      categories: categories,
      tags: tags,
      body: postBody,
      id: postId.toString(),
      view: 0,
      publish: true,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      username: dbUser.username,
      date: new Date(),
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
        toast.success("Post Created!");
      });
  };

// ======================================================
  return (
    <Layout title='Create Post'>
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
                className="py-3 bg-transparent text-black"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                onChange={(e) => setCategories(e)}
                options={category}
              />
            </label>
            <div className="flex items-center my-2 justify-between gap-2">
              <label className=" w-full">
                <p> Featured Image </p>
                <div className="flex justify-center">
                  <label>
                    <input
                      accept="image/*"
                      className="file-input hidden file-input-bordered w-full"
                      type="file"
                      onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    />

                    <div className="flex relative justify-center w-full">
                      {uploadedPhoto || uploadLoad ? (
                        ""
                      ) : (
                        <div className="border border-dashed p-12">
                          <h3>Click and upload</h3>
                        </div>
                      )}
                      {uploadLoad ? (
                        <div className=" flex justify-center bg-base-300 p-12 rounded-md">
                          <div>
                            <div className="flex justify-center">
                              <ButtonLoader w={12} h={12} />
                            </div>
                            <h4>Photo Uploading...</h4>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </label>
                  <div className="relative">
                    {uploadedPhoto ? (
                      <>
                        <img
                          className="h-44 w-44 rounded-md object-cover"
                          src={uploadedPhoto}
                          alt=""
                        />
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {uploadedPhoto && (
                      <button
                        className="absolute  bg-red-100 text-rose-500 px-2 top-0 right-0 rounded-full flex justify-self-center"
                        onClick={() => setUploadedPhoto("")}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-rose-600">{error}</p>
              </label>
            </div>
          </div>
          <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      className="h-96 my-32"
      onChange={(content) => {
        // var htmlToRtf = require('html-to-rtf');
        setpostBody(content);
      }}
    />
          <div className="my-2">
            <p>Tags</p>
            <CreatableSelect
              className="bg-transparent text-black"
              components={animatedComponents}
              isClearable
              isMulti
              options={category}
              onChange={(e) => setTags(e)}
            />
          </div>
          <div className="flex justify-center">
            <button disabled={uploadedPhoto.length===0} className={`btn `} type="submit">
              {posting ? <ButtonLoader w={6} h={6} />:"Create Post"}
             
            </button>
          </div>
        </form>
      
    <Sidebar />
    </Layout>
  );
}