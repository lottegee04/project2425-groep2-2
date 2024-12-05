import { Head } from "next/document";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskService from "../../services/TaskService";
import TaskOverview from "../../components/tasks/TaskOverview";
import useInterval from "use-interval";

const TaskHistory: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>();

  const getFinishedTasks = async () => {
    const res = await TaskService.getAllFinishedTasksByUser(1);
    //userId is hardcoded to 1 (johnDoe) for now
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
      <main>
        <h1>Task History</h1>
        <p>Here you can find all your finished tasks.</p>
        {tasks && <TaskOverview tasks={tasks} />}
      </main>
    </>
  );
};

export default TaskHistory;
