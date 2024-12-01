import Link from 'next/link';
import React, { useEffect, useState } from 'react';



const Header: React.FC = () => {
 const [loggedInUser, setloggedInUser] = useState<string | null>(null);
 useEffect(() => {
  setloggedInUser(sessionStorage.getItem("loggedInUser"));
 }, [loggedInUser]);
 
  return (
    <>
    <header className="p-3 mb-3 ">
      <a className="fs-2 d-flex justify-content-center border-4 border-dark text-dark text-decoration-none ">
        {' '}
        DoneDeal
      </a>
      <nav className="nav d-flex flex-row justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-dark">
          Home
        </Link>
        <Link href="/tasks" className="nav-link px-4 fs-5 text-dark">
          All tasks
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-dark">
          Users
        </Link>
        {!loggedInUser && (
           <Link href="/login" className="nav-link px-4 fs-5 text-dark">
           Login
           </Link>
        )}
       
      {loggedInUser && (
        <>
        <Link href="/login" className="nav-link px-4 fs-5 text-dark"
        onClick={() => {
          sessionStorage.removeItem("loggedInUser");
          setloggedInUser(null);
        }}> Logout</Link>
        <div className="nav-link px-4 fs-5 text-dark">
          Welcome, {loggedInUser}!
        </div>
        </>
      )}
      </nav>
    </header>
    </>
  );
};

export default Header;
