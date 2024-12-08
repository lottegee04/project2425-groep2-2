import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import Image from "next/image";



const Header: React.FC = () => {
 const [loggedInUser, setloggedInUser] = useState<User | null>(null);
 useEffect(() => {
  setloggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
 }, []);
 
  return (
    <>
    <header className=" bg-[#e2dbd3] flex flex-row items-center justify-between m-3 p-2 rounded-2xl">
      <Image
      src='/images/donedeal_logo_transparant.png'
      alt='logo donedeal'
      width={150}
      height={150}
      />
      <nav className="flex flex-row m-2 rounded-md justify-between items-stretch px-2">
        <Link href="/" className="nav-link p-2 fs-6 m-1 rounded-md hover:bg-[#d8cfc4] ">
          Home
        </Link>
        
        
        {!loggedInUser && (
           <Link href="/login" className="nav-link p-2 m-1 fs-6 text-white bg-[#474132] hover:bg-[#655d53] rounded-md">
           Login
           </Link>
        )}
        {loggedInUser?.role === "admin" && (
          <>
          <Link href="/users" className="nav-link p-2 fs-6 text-dark m-1 rounded-md hover:bg-[#d8cfc4] ">
          Users
        </Link>
          </>
        )}


       
      {loggedInUser && (
        <>
        <Link href="/tasks" className="nav-link p-2 fs-6 text-dark  m-1 rounded-md hover:bg-[#d8cfc4]">
          All tasks
        </Link>
        <div className="nav-link p-2  fs-6 mt-1 ml-6 text-[#534e46] italic">
          Welcome, {loggedInUser.username}!
        </div>
        <Link href="/login" className="nav-link p-2 m-1 fs-6 text-white bg-[#474132] hover:bg-[#655d53] rounded-md" 
        onClick={() => {
          sessionStorage.removeItem("loggedInUser");
          localStorage.removeItem("loggedInUser");
          setloggedInUser(null);
        }}> Logout</Link>
        
        </>
      )}
      </nav>
    </header>
    </>
  );
};

export default Header;
