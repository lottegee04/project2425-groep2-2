import { Priority, User } from "../types";

const getAllTasks = async () => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
};
const getActiveTasks = async () => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    try {return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks/active",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
        }
    })}
    catch (error) {
        console.error(error)
    }
};

const getTasksByPriority = async (priority: string) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/tasks/priority/${priority}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
};
const createTask = async (task: { description: string; sidenote: string; deadline: Date; priority: Priority; user: User}) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    try {const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks", {
       method: "POST",
       headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${token}`,
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
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/taskhistory/finishTask/${id.userId}/${id.taskId}` , {
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    return response.json()
}

const getAllFinishedTasksByUser = async (userId: number) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/taskhistory/${userId}`,{
        method:'GET',
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
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