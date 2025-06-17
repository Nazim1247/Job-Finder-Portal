"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const {data: session, status} = useSession();
  // console.log(session);
    const links = <div className='space-x-4'>
    <Link href="/">Home</Link>
    <Link href="/findJobs">Find Jobs</Link>
    <Link href="/postJobs">Post a Jobs</Link>
    <Link href="/my-posted-jobs">My Posted Jobs</Link>
    <Link href="/my-applications">My Applications</Link>
    <Link href="/all-applications">All Applications</Link>
    <Link href="/saved-jobs">Saved jobs</Link>
    
    </div>
    return (
        <div className='bg-white dark:bg-base-200 sticky top-0 z-50 shadow-md'>
            <div className="navbar max-w-6xl mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        {links}
      </ul>
    </div>
    <Link className="text-xl" href='/'>Job Finder Portal</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <ThemeToggle />
    {status == 'authenticated'? (
      <>
      <li onClick={()=> signOut({callbackUrl: "/login"})} className="btn">Log out</li>
      {session?.user?.image ? 
      <Image src={session?.user?.image} width="40" height="40" alt='Logo' className='rounded-full' /> : <div className="w-10 h-10 rounded-full bg-gray-300" />}
      
      </>
    ):(
      <Link className="btn" href="/login">Login</Link>
    )}
    
  </div>
</div>
        </div>
    );
};

export default Navbar;