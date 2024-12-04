import Link from 'next/link';
import React from 'react';



const Header: React.FC = () => {
  return (
    <>
    <header className=" bg-beige flex flex-row items-center justify-between m-3 p-2 rounded-2xl">
      <h1 className="fs-3 text-decoration-none text-dark-brown">
        DoneDeal
      </h1>
      <nav className="flex flex-row bg-stone-300 m-2 rounded-md justify-evenly px-2">
        <Link href="/" className="nav-link p-2 fs-6 m-1 rounded-md hover:bg-dark-beige">
          Home
        </Link>
        <Link href="/tasks" className="nav-link p-2 fs-6 text-dark  m-1 rounded-md hover:bg-dark-beige">
          All tasks
        </Link>
        <Link href="/users" className="nav-link p-2 fs-6 text-dark m-1 rounded-md hover:bg-dark-beige">
          Users
        </Link>

      </nav>
    </header>
    </>
  );
};

export default Header;
