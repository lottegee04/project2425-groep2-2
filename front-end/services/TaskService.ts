import { Priority, User } from "../types";

const getAllTasks = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })
};
const getActiveTasks = async () => {
    try {return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks/active",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })}
    catch (error) {
        console.error(error)
    }
};

const getTasksByPriority = async (priority: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/tasks/priority/${priority}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })
};
const createTask = async (task: { description: string; sidenote: string; deadline: Date; priority: Priority; user: User}) => {
    try {const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks", {
       method: "POST",
       headers: {
           "Content-type": "application/json"
       },
       body: JSON.stringify(task)
    });
    if (!response.ok) {
        throw new Error('Failed to submit task');
      }
      return response.json();}
      catch (error) {
            console.error(error)
      }
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
    getActiveTasks,
    createTask,
    finishTask,
    getAllFinishedTasksByUser,
    getTasksByPriority
}


export default TaskService