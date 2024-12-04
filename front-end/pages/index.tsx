import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Header from '../components/header';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header/>
      <main className=''>

      </main>

    </>
  );
};

export default Home;