import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { contextProvider } from "../../context/AuthContext";
import Layout from "../../Layout/Layout";
import Lottie from "lottie-react";
import registerLottie from '../../assest/lottie/login.json'

const Register = () => {
  const { createUser, handleUserUpdate } = useContext(contextProvider);
  const [value, setValue] = useState("");

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [userCheck, setUserCheck] = useState("");
  const userNameCase = userCheck.split(" ")
  const [userName, setUserName] = useState([]);
  // console.log(usernameMatch)
  useEffect(() => {
    fetch(
      `https://blog-server-sparmankhan.vercel.app/username?name=${userCheck}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserName(data);
      })
      .catch((err) => {
        setUserName([]);
      });
  }, [userCheck]);

  const onSubmit = (data) => {
    const photo = data.photo[0];

    const name = data.name;
    const email = data?.email;
    const password = data.password;
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
        
        if (photoUrl) {
          createUser(email, password)
            .then((result) => {
              const profile = {
                displayName: name,
                photoURL: photoUrl,
              };
              handleUserUpdate(profile).then((result) => {
                const userData = {
                  name: data.name,
                  email: data?.email,
                  username: data.username,
                  photo: photoUrl,
                  followers: '0',
                  role:'user'

                };

                fetch(`https://blog-server-sparmankhan.vercel.app/user`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(userData),
                });

                router.push("/");
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const [show, setShow] = useState(false);
  // console.log(show)

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hero min-h-screen bg-base-200 block md:grid">
          <div className="hero-content flex flex-col md:flex-row ">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Register</h1>
              <div className="py-6 w-full">
              <Lottie className="hidden md:block" animationData={registerLottie} loop={true} />
              </div>
            </div>
            <div className="card flex-shrink-0  shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>

                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <span>This is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>

                  <input
                    {...register("username")}
                    onChange={(e) =>
                      setUserCheck(e.target.value.toLocaleLowerCase())
                    }
                    type="text"
                    placeholder="Username"
                    className={`input input-bordered ${
                      userName.length > 0 && "border-error"
                    }`}
                  />
                  <p className="text-error my-1">
                    {userNameCase.length > 1 && `Space not alowed`}
                  </p>
                  <p className="text-error my-1">
                    {userName.length > 0 ? `Already Use this username` : ``}
                  </p>
                </div>
                {/* Photo */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>

                  <input
                    {...register("photo")}
                    className="file-input lowercase file-input-bordered"
                    type="file"
                    placeholder="Username"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  {/* Password */}
                  <input
                    {...register("password", { required: true, minLength: 6 })}
                    type={show ? "password" : "text"}
                    placeholder="password"
                    className="input input-bordered"
                  />

                  <div
                    className="absolute top-12 right-2 px-2 text-xl text-blue-400  rounded-full "
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEye /> : <FiEyeOff />}
                  </div>
                  <p className="text-error">
                    {" "}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span>Min length 6</span>
                      )}
                  </p>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    disabled={userName.length > 0}
                    className="btn btn-primary"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
