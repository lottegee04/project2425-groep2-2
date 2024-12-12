import { Task } from "../../types";
import { table } from "console";
import React, { useEffect } from "react";
import Image from "next/image";
import TaskService from "../../services/TaskService";
type Props = {
  tasks: Array<Task>;
};

const TaskOverview: React.FC<Props> = ({ tasks}) => {
  const finishTask = (task: Task) => {
    //fetch request to update task.done to true:
    TaskService.finishTask({taskId: task.id, userId: task.user.id});
    //!! watch out for the userId, it should be dynamic: you can only finish the task of user 1 (johnDoe) atm
  }
  const deleteTask = (task: Task) => {
    TaskService.deleteTask({taskId: task.id, userId: task.user.id})
  }
  if (!tasks || tasks.length === 0) {
    return <p>No Active Tasks</p>;
  }

  const determineColour = (task: Task) => {
    if (task.priority.colour === "green") {
      return "#4daa2b";
    } else if (task.priority.colour === "yellow") {
      return "#e19e4c";
    } else if (task.priority.colour === "red") {
      return "#d34e4e";
    }
    else {
      return "#ffffff";
    }
  }
  return (
    <>
    <ul className="grid grid-cols-4 gap-6">
      {Array.isArray(tasks) &&
        tasks.map((task, index) => (
          <li
            key={index}
            className={` m-2 bg-[#dfceba] bg-opacity-25 container rounded shadow border`}
          >
            <div className="flex items-center mb-3">
                    <span 
                    style={{backgroundColor: determineColour(task)}}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize" >
                        {task.priority.levelName}
                    </span>
                    <p className="font-mono text-xs font-normal opacity-75 pt-2 text-black">{new Date(task.startDate).toLocaleDateString()}</p>
                </div>
            <p className="font-display max-w-sm text-2xl font-bold leading-tight">
                    <span className=" text-black">
                        {task.description}
                    </span>
                </p>
                <p className="font-display max-w-sm text-md  leading-tight">
                    <span className=" text-black">
                        {task.sidenote}
                    </span>
                </p>
                <div className="flex justify-between ">
                <p className="font-mono text-xs font-normal opacity-75 pt-2 text-black underline"> DEADLINE: {new Date(task.deadline).toLocaleDateString()} </p>
            {!task.done  &&
            <Image 
            className="cursor-pointer rounded bg-[#b1a27b] hover:bg-[#9d8e68] m-2 p-2"
            src='/images/check-mark.png'
            alt='Check Mark icon'
            width={40}
            height={40}
            onClick={() => {finishTask(task)}}
            />
          }
           {task  &&
            <Image 
            className="cursor-pointer rounded bg-[#b1a27b] hover:bg-[#9d8e68] m-2 p-2"
            src='/images/bin.png'
            alt='Check Mark icon'
            width={40}
            height={40}
            onClick={() => (deleteTask(task))}
            />}
          </div>
            

          </li>
          
        ))}
        </ul>
    </>
  );
};

export default TaskOverview;
