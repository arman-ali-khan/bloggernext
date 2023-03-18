import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { contextProvider } from '../../context/AuthContext';
import Layout from '../../Layout/Layout';
import Lottie from "lottie-react";
import registerLottie from '../../assest/lottie/login.json'

const index = () => {
    const router = useRouter()
    const {userLogin} = useContext(contextProvider)
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLoginUser = (data)=>{
        const email = data?.email;
        const password = data.password;
        userLogin(email,password).then(result=>{
            router.push('/')
        })
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit(handleLoginUser)} className="hero min-h-screen bg-base-200 block md:grid">
  <div className="hero-content flex flex-col md:flex-row ">
    <div className="text-center w-full ">
      <h1 className="text-5xl font-bold text-center w-full ">Login now!</h1>
      <div className="py-6 w-full">
      <Lottie className="hidden md:block" animationData={registerLottie} loop={true} />
      </div>
    </div>
    <div className="card flex-shrink-0  shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register('email')} type="email" placeholder="email" className="input input-bordered" />
          <p className='text-error'> 
          {errors?.email && errors?.email.type === "required" && <span>Email Required</span>}
          </p>
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register('password', { required: true, minLength: 6 })}  type={`${show?'text':'password'}`} placeholder="password" className="input input-bordered" />
         
     <p className='text-error'> {errors.password && errors.password.type === "minLength" && <span>Min length 6</span> }</p>
          <div
                    className="absolute top-12 right-2 px-2 text-xl text-blue-400  rounded-full "
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEye /> : <FiEyeOff />}
                  </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</form>
        </Layout>
    );
};

export default index;