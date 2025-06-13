"use client";
import Link from 'next/link';
import React from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const email= form.email.value;
        const password= form.password.value;
        try {
            await signIn("credentials", {email,password,callbackUrl: "/"})
            router.push("/")
        // console.log({email,password})
        } catch (error) {
            console.log(error)
        }
        

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <Link href="/register">Are you new? Please<span className='text-red-500'>Register</span></Link>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default LoginPage;