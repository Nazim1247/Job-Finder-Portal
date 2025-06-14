"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const {data: session, status} = useSession();
  // console.log(session);
    const links = <div className='space-x-4'>
    <Link href="/">Home</Link>
    <Link href="/find-jobs">Find Jobs</Link>
    <Link href="/postJobs">Post a Jobs</Link>
    <Link href="/my-application">My Application</Link>
    <Link href="/saved-jobs">Saved jobs</Link>
    
    </div>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
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
    {status == 'authenticated'? (
      <>
      <li onClick={()=> signOut()} className="btn">Log out</li>
      <Image src={session?.user?.image} width={40} height={40} alt='user-logo' className='rounded-full'/>
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