import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <a href='/about' className="link link-hover">About us</a>
    <a href='/contact' className="link link-hover">Contact us</a>
    <a href='/findJobs' className="link link-hover">Find Jobs</a>
    
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4 text-3xl">
      <a href='https://www.linkedin.com/in/hm-nazim-uddin/'>
        <FaLinkedin />
      </a>
      <a href='https://github.com/Nazim1247'>
        <FaGithub />
      </a>
      <a href='https://web.facebook.com/hm.nazim.uddin.86882'>
       <FaFacebookSquare />
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
        </div>
    );
};

export default Footer;