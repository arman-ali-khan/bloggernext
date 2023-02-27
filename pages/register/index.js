import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {FiEye,FiEyeOff} from 'react-icons/fi'

const Register = () => {
  const { register,formState: { errors } , handleSubmit } = useForm();

const [userCheck,setUserCheck] = useState('')
const [userName,setUserName] = useState([])
// console.log(usernameMatch)
  useEffect(()=>{
    fetch(`http://localhost:5000/username?name=${userCheck}`)
    .then(res=>res.json())
    .then(data=>{
     setUserName(data)
      
    }).catch(err=>{
      setUserName([])
    })
  },[userCheck])
 
 
  const onSubmit = data => {
    console.log(data)
    const userData = {
      name:data.name,
      email: data.email,
      userName: data.name
    }
  }
  
  const [show,setShow] = useState(false)
  // console.log(show)

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>

          <input {...register("name",{ required: true })} type="text" placeholder="name" className="input input-bordered" />
          {errors.name && errors.name.type === "required" && <span>This is required</span>}


        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>

          <input {...register("username")} onChange={(e)=>setUserCheck(e.target.value)} type="text" placeholder="Username" className={`input input-bordered ${userName.length >0 && 'border-error'}`} />

          <p className='text-error my-1'>{userName.length >0 ?  `Already Use this username` : ``}</p>

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email")} type="email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          {/* Password */}
          <input {...register("password",{ required: true, minLength: 6 })} type={show?'password':'text'} placeholder="password" className="input input-bordered" />
         

         
          <button className='absolute top-12 right-2 px-2 text-xl text-blue-400  rounded-full ' onClick={()=>setShow(!show)}>
            {
              show ? <FiEye /> : <FiEyeOff /> 
            }
           
            </button>
            <p className='text-error'> {errors.password && errors.password.type === "minLength" && <span>Min length 6</span> }</p>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create Account</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </form>
    );
};

export default Register;