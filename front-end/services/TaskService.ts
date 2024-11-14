import { Priority } from "../types";

const getAllTasks = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })
}
const createTask = async (task: { description: string; sidenote: string; deadline: Date; priority: Priority; userId: number}) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks", {
       method: "POST",
       headers: {
           "Content-type": "application/json"
       },
       body: JSON.stringify(task)
    });
    if (!response.ok) {
        throw new Error('Failed to submit task');
      }
      return response.json();
   };

const finishTask = async (id: { taskId: number; userId:number }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/taskhistory/finishTask/${id.userId}/${id.taskId}` , {
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })
    return response.json()
}

const getAllFinishedTasksByUser = async (userId: number) => {
    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/taskhistory/${userId}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }   
    })
    return response.json()
}

const TaskService = {
    getAllTasks,
    createTask,
    finishTask,
    getAllFinishedTasksByUser,
}


export default TaskService