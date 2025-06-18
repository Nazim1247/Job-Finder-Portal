"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const {data: session, status} = useSession();
  // console.log(session);
    const links = <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
    <Link className='flex md:hidden text-xl text-blue-600 font-bold' href="/">Job Finder Portal</Link>
    <Link href="/">Home</Link>
    <Link href="/findJobs">Find Jobs</Link>
    {/* <Link href="/postJobs">Post a Jobs</Link> */}
    {/* <Link href="/my-posted-jobs">My Posted Jobs</Link> */}
    {/* <Link href="/all-applications">All Applications</Link> */}
    <Link href="/saved-jobs">Saved jobs</Link>
    <Link href="/my-applications">My Applications</Link>
    <Link href="/#about">About Us</Link>
    <Link href="/#contact">Contact Us</Link>
    
    </div>
    return (
        <div className='bg-white dark:bg-base-200 sticky top-0 z-50 shadow-md'>
            <div className="navbar max-w-6xl mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        {links}
      </ul>
    </div>
    <Link className="text-xl font-bold hidden md:flex" href='/'>Job Finder Portal</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

      {links}
    </ul>
  </div>
  <div className="navbar-end">
  {/* User Image as Dropdown Toggle */}
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      {session?.user?.image ? (
        <div className="w-10 rounded-full">
          <Image
            src={session?.user?.image}
            width="40"
            height="40"
            alt="User"
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      )}
    </div>

    <ul
      tabIndex={0}
      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
    >
      <li><ThemeToggle /></li>

      {status === "authenticated" ? (
        <>
          <li>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
          </li>
          <li><a href="/admin">Admin Panel</a></li>
          <li><a href="/profile">Profile</a></li>
        </>
      ) : (
        <li><Link href="/login">Login</Link></li>
      )}
    </ul>
  </div>
</div>

</div>
        </div>
    );
};

export default Navbar;