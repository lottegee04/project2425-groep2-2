
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import TaskService from '../../services/TaskService';
import Header from '../../components/header';
import TaskOverview from '../../components/tasks/TaskOverview';
import Link from 'next/link';
import useInterval from 'use-interval';
import useSWR, { mutate } from 'swr';




const Tasks: React.FC = () => {
  const [priority, setPriority] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const getTasks = async () => {
    setError(null);
    if (priority === "all"){
    const response = await TaskService.getAllTasks();
    if (response.ok) {
      const tasks = await response.json();
     return {tasks}
    } else {
      setError("You are not authorized to view this page.")
      return {tasks: []};
    }
  } else {
    const response = await TaskService.getTasksByPriority(priority);
    if (response.ok) {
      const tasks = await response.json();
      return {tasks}
    }}
  };
  const {data, isLoading} = useSWR( "tasks", getTasks)

  // useEffect(() => {
  //   getTasks();
  // }, [priority]);

  useInterval(() => {
    mutate("tasks", getTasks());
  }, 2000);
  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>
      <Header />
      <main className="d-flex  flex-column ">
        <h1 className="align-self-start font-['Open_Sans']">Tasks</h1>
        <section className='flex flex-row justify-between'>
        <div className='flex flex-column self-start m-3 border p-2 rounded bg-beige'>
          <button className="  m-1 p-2 rounded-lg hover:bg-[#473c2f] duration-150 text-[#000000] hover:text-[#ffffff]" onClick={() => {setPriority("all")}}>
            All</button>
          <button className='  m-1 p-2 rounded-lg hover:bg-[#d34e4e] duration-150 text-[#000000] hover:text-[#ffffff]' onClick={() =>  {setPriority("urgent")}}>
            Urgent</button>
          <button className='  m-1 p-2 rounded-lg hover:bg-[#e19e4c] duration-150 text-[#000000] hover:text-[#ffffff]' onClick={() => {setPriority("neutral")}}>
            Neutral</button>
          <button className =' m-1 p-2 rounded-lg hover:bg-[#4ed368] duration-150 text-[#000000] hover:text-[#ffffff]' onClick={() => {setPriority("basic")}}>
            Basic</button>
        </div>
        <section className="align-self-center d-flex flex-row p-2  self-center">
          {error && <p className="text-[#b62626]">{error}</p>}
          {isLoading && <p className="text-[#2866da]">Loading....</p>}
          {data &&
          <TaskOverview tasks={data.tasks}/>
          }
          <Link href="/tasks/addTask">
            <button>+</button>
          </Link>
        </section>
      <section>
      <Link href='/taskhistory'><button>History</button></Link>
      </section>
    </section>
      </main>
    </>
  );
};

export default Tasks;
