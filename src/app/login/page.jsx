"use client";
import Link from 'next/link';
import React from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SocialLogin from '../social/SocialLogin';

const LoginPage = () => {
    const router = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const email= form.email.value;
        const password= form.password.value;
        toast("Submitting...")
        try {
           const response = await signIn("credentials", {email,password,callbackUrl: "/",redirect: false})
           if(response.ok){
            toast.success("Login Successfully!")
               router.push("/")
               form.reset();
           }else{
            toast.error("authentication failed")
           }
        // console.log({email,password})
        } catch (error) {
            toast.error("authentication failed")
            console.log(error)
        }
        

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-80">
  <div className="hero-content flex-col w-full">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Login now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Email</label>
          <input name='email' type="email" className="input w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input w-full" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <div className='text-center'>
          <Link href="/register">Are you new? Please<span className='text-red-500'>Register</span></Link>
        </div>
        <div className='divider'>OR</div>
        <SocialLogin />
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default LoginPage;