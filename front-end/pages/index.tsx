import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Header from "../components/header";
import UserTableHome from "../components/users/UserTableHome";
import UserService from "../services/UserService";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";


const Home: React.FC = () => {
  const data = [
    {username: "admin",
      password: "admin123",
      role: "admin"},
      {
        username: "ode_m",
            password: "ode123",
            role: "user"
      },
      {
        username: "lotte_g",
        password: "lotte123",
        role: "user"
      },
      {
        username: "guest",
            password:"guest132",
            role: "guest"
      }
  ]
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header/>
      <main className="">
      <div className="flex justify-center">
        {data &&
        <UserTableHome users={data}/>
        }
        </div>
      </main>

    </>
  );
};

export default Home;