import { Head } from "next/document";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { Task, User } from "../../types";
import TaskService from "../../services/TaskService";
import TaskOverview from "../../components/tasks/TaskOverview";
import useInterval from "use-interval";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TaskHistory: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();
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
        <h1 className=" font-bold text-[#534e46] m-2 ">{t('taskHistory.title')} </h1>
        <p className="mx-5">{t('taskHistory.p')} </p>
        {tasks && <TaskOverview tasks={tasks} />}
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}

export default TaskHistory;
