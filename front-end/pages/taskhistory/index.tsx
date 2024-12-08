import { Head } from "next/document";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { Task, User } from "../../types";
import TaskService from "../../services/TaskService";
import TaskOverview from "../../components/tasks/TaskOverview";
import useInterval from "use-interval";

const TaskHistory: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  useEffect(() => {
   setloggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  const getFinishedTasks = async () => {
    if (!loggedInUser) return;
    const res = await TaskService.getAllFinishedTasksByUser();
    setTasks(res);
  };
  useEffect(() => {
    getFinishedTasks(), [];
  });

  useInterval(() => {
    getFinishedTasks();
  }, 2000);
  
  return (
    <>
      <Header />
      <main >
        <h1 className=" font-bold text-[#534e46] m-2 ">Task History</h1>
        <p className="mx-5">Here you can find all your finished tasks.</p>
        {tasks && <TaskOverview tasks={tasks} />}
      </main>
    </>
  );
};

export default TaskHistory;
