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
    TaskService.finishTask({taskId: task.id, userId: 1})
    //!! watch out for the userId, it should be dynamic: you can only finish the task of user 1 (johnDoe) atm
  }
  

  return (
    <>
      {tasks &&
        tasks.map((task, index) => (
          <table
            className={`border border-${task.priority.colour} border-opacity-50 border-4 m-2 bg-secondary bg-opacity-25 container`}
          >
            <tr className="col">
              <td>Description: </td>
              <td>{task.description}</td>
            </tr>
            <tr className="col">
              <td>Sidenote:</td>
              <td>{task.sidenote}</td>
            </tr>
            <tr>
                <td>Priority:</td>
                <td>{task.priority.levelName}</td>
            </tr>
            {!task.done  &&
            <tr>
            <Image 
            src='/images/check-mark.png'
            alt='Check Mark icon'
            width={20}
            height={20}
            onClick={() => {finishTask(task)}}
            />
          </tr>}
            

          </table>
        ))}
      {!tasks && <p>No Active Tasks</p>}
    </>
  );
};

export default TaskOverview;
