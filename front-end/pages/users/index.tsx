import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Task, User } from '../../types';
import TaskService from '../../services/TaskService';
import Header from '../../components/header';
import TaskOverview from '../../components/tasks/TaskOverview';
import UserService from '../../services/UserService';
import UserOverview from '../../components/users/UserOverview';
import TasksByUser from '../../components/tasks/TasksByUser';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Users: React.FC = () => {
    const [selectedUser,setSelectedUser] = useState<User>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getUsers = async () =>{
        setErrorMessage(null);
        const response = await UserService.getUsers()
        if (response.ok) {
        const users = await response.json();
        return {users}
      } else {
        setErrorMessage("You are not authorized to view this page.")
        return {users: []};
      }
  };
  const {data, isLoading} = useSWR("users",getUsers);
  useInterval(() => {
    mutate("users",getUsers());
  }, 2000);

  return (
    <>
    <Head>
        <title>Users</title>
    </Head>
    <Header/>
    <main className='d-flex  flex-column '>
    <h1 className='align-self-center'>Users Overview</h1>
    <p className='align-self-center'>Click on the user to see their tasks.</p>
    <section className='align-self-center d-flex flex-row p-2 '>
    {errorMessage && <p className="text-red-800">{errorMessage}</p>}
    {isLoading && <p className="text-green-800">Loading....</p>}
    {data && 
      <UserOverview users={data.users} selectUser={setSelectedUser}></UserOverview>
    }
    </section>
    {selectedUser && (
         <section className='align-self-center d-flex flex-column p-2 '>
         <h2> Tasks from "{selectedUser.username}"</h2>
         <TasksByUser user={selectedUser}></TasksByUser>
       </section>
    )}
    </main>
    </>
  );
};

export default Users;