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




const Users: React.FC = () => {
    const [users,setUsers] = useState<Array<User>>();
    const [selectedUser,setSelectedUser] = useState<User>();


    const getUsers = async () =>{
        const res = await UserService.getAllUsers()
        const userss = await res.json()
        setUsers(userss)
    }
    useEffect(() => {
        getUsers(),
        []
    })

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
    <UserOverview users={users} selectUser={setSelectedUser}></UserOverview>
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