import { useState } from "react";
import { Task } from "../../types";
import Head from "next/head";
import Header from "../../components/header";
import TaskForm from "../../components/tasks/TaskForm";



const addTask: React.FC = () => {
    const [task,setTask] = useState<Task>();
    return (
        <>
        <Head>
        <title>addTask</title>
        </Head>
            <Header/>
            <main className='d-flex  flex-column '>
            <h1 className='align-self-center'>Add a Task</h1>
            <section className='align-self-center w-full max-w-md p-8 rounded-lg mx-auto'>
                <TaskForm></TaskForm>
            </section>
            </main>
        </>
    );
};
export default addTask;