"use client";
import Link from 'next/link';
import React from 'react';
import registerUser from '../actions/auth/registerUser';

const RegisterPage = () => {
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const form = e.target;
        const name= form.name.value;
        const email= form.email.value;
        const password= form.password.value;
        registerUser({name,email,password})
        // console.log(name,email,password)
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Register now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </form>
        <Link href="/login">Have you already Register? Please<span className='text-red-500'>Login</span></Link>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default RegisterPage;