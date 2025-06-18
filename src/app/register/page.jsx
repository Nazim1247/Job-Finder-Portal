"use client";
import Link from 'next/link';
import React from 'react';
import registerUser from '../actions/auth/registerUser';
import SocialLogin from '../social/SocialLogin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const RegisterPage = () => {
  const router = useRouter();
    const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const result = await registerUser({ name, email, password,role: "user" });

  if (result.success) {
    toast.success("Registration successful! Logging in...");

    // Sign in the user immediately after registration
    const loginRes = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (loginRes.ok) {
      router.push("/");
    } else {
      toast.error("Login failed after registration");
    }
  } else {
    toast.error("Registration failed");
  }
};

    return (
        <div>
            <div className="hero bg-base-200 min-h-80">
  <div className="hero-content flex-col w-full">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Register now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Name</label>
          <input name='name' type="text" className="input w-full" placeholder="Name" />
          <label className="label">Email</label>
          <input name='email' type="email" className="input w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input w-full" placeholder="Password" />
          
          <button className="btn btn-neutral mt-4">Register</button>
        </form>
        <div className='text-center'>
          <Link href="/login">Have you already Register? Please<span className='text-red-500'>Login</span></Link>
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

export default RegisterPage;