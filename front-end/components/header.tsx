import Link from 'next/link';
import React from 'react';



const Header: React.FC = () => {
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
        <Link href="/login" className="nav-link px-4 fs-5 text-dark">
        Login</Link>

      </nav>
    </header>
    </>
  );
};

export default Header;
