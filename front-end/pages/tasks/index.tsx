
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import TaskService from '../../services/TaskService';
import Header from '../../components/header';
import TaskOverview from '../../components/tasks/TaskOverview';
import Link from 'next/link';
import useInterval from 'use-interval';




const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [priority, setPriority] = useState<string>("all");

  const getTasks = async () => {
    if (priority === "all"){
    const res = await TaskService.getActiveTasks();
    const taskss = await res.json();
    setTasks(taskss);
  } else {
    const res = await TaskService.getTasksByPriority(priority);
    const taskss = await res.json();
    setTasks(taskss);
  }
  };
  useEffect(() => {
    getTasks();
  }, [priority]);

  useInterval(() => {
    getTasks();
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
          <TaskOverview tasks={tasks}></TaskOverview>
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
