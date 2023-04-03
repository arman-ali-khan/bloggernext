import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import CreatableSelect from "react-select/creatable";

import { contextProvider } from "../../context/AuthContext";
// React select
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import ButtonLoader from "../../components/Loader/ButtonLoader";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
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
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function Home() {
  const router = useRouter();
  const id = router.query.editId;
  // Get post
  const [editPost, setEditPost] = useState({});

  // Uploading...
  const [uploadLoad, setUploadPhoto] = useState(false);
  // Photo upload
 
  const [uploadedPhoto, setUploadedPhoto] = useState(editPost.thumb ? editPost.thumb : 'https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0=');
  console.log(uploadedPhoto);

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
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    axios
      .get(`https://blog-server-sparmankhan.vercel.app/post/${id}`)
      .then((res) => {
        setEditPost(res.data);
      });
  }, [id,uploadedPhoto]);

  console.log(editPost);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      categories: editPost.categories,
      tags: editPost.categories,
      body: editPost.body,
      thumb: editPost.thumb,
      title: editPost.title,
    },
  });

  const [title, setTitle] = useState(editPost.title);

  const [posting, setPosting] = useState(false);

  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(URL?.createObjectURL(e.target.files[0]));
  }

  let [loaded, setLoaded] = useState(false);
  let [photUploading, setphotUploading] = useState(false);
  const [postId, setPostId] = useState(0);

  // React Select
  const animatedComponents = makeAnimated();

  // Category
  const [categories, setCategories] = useState(editPost.categories);

  // Tags
  const [tags, setTags] = useState(editPost.tags);

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
  const { user, dbUser } = useContext(contextProvider);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  const [postBody, setpostBody] = useState("");

  const handlePostSubmit = (data) => {
    setPosting(true);
    const postData = {
      title: title,
      thumb: uploadedPhoto,
      categories: categories,
      tags: tags,
      body: postBody.data,
    };
    fetch(
      `https://blog-server-sparmankhan.vercel.app/post/${editPost.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosting(false);
        toast.success("Post Update");
      });   
    
  };

  // ================================

  if (user === null) {
    router.push("/login");
  }

  //   Get category and tags

  return (
    <div>
      <Layout title={`Update - ${editPost.title}`}>
        {user?.email === editPost.email ? (
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="lg:w-6/12 my-12 md:w-9/12 mx-3 md:mx-auto"
          >
            <div className="flex w-full flex-col">
              {/* Title */}

              <p>Title </p>

              <input
                type="text"
                className="input w-full input-bordered"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={editPost.title}
              />

              {/* Category */}
              <p>Category </p>
              {editPost.categories && (
                <Select
                  className="py-3 bg-base-200 text-black"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  defaultValue={editPost.categories}
                  onChange={(e) => setCategories(e)}
                  options={options}
                />
              )}
              <div className="flex items-center my-2 justify-between gap-2">
                <label className=" w-full relative">
                  <p> Featured Image </p>
                  <div className="flex justify-center ">
                    <label>
                      <input
                      accept="image/*"
                      className="file-input hidden file-input-bordered w-full"
                      type="file"
                      onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    /> 
                 
                 
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
                        
                        <img
                          className="h-44 w-44 rounded-md object-cover"
                          src='https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0='
                          alt=""
                        />
                      )}
                      {uploadedPhoto && (
                        <button
                          className="absolute  bg-red-100 text-rose-500 px-2 top-0 right-0 rounded-full flex justify-self-center"
                          onClick={() => setUploadedPhoto("")}
                        >
                          Remove
                        </button>
                      )}
                       <div className="flex relative justify-center w-full">
                      {uploadedPhoto || uploadLoad ? (
                        ""
                      ) : (
                      ''
                      )}
                      {uploadLoad ? (
                       <div className=" flex justify-center items-center">
                        <ButtonLoader w={12} h={12} />
                       </div>
                      ) : (
                        ""
                      )}
                    </div>
                    </div>
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <QuillNoSSRWrapper
              defaultValue={editPost.body}
              modules={modules}
              className="h-96 mb-32"
              formats={formats}
              theme="snow"
              onChange={(content) => {
                // var htmlToRtf = require('html-to-rtf');
                setpostBody(content);
              }}
            />
            <div className="my-12">
              <p>Tags</p>
              {editPost?.tags && (
                <CreatableSelect
                  className="text-black"
                  components={animatedComponents}
                  isClearable
                  isMulti
                  defaultValue={editPost?.tags}
                  options={options}
                  onChange={(e) => setTags(e)}
                />
              )}
            </div>
            <div className="flex justify-center">
              <button className="btn " type="submit">
                {posting && "Updating..."}
                {photUploading ? "Photo Uploading..." : "Update Post"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center py-12 "> You can't edit this post</p>
        )}
      </Layout>
    </div>
  );
}
