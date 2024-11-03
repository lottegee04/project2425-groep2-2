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


const TaskService = {
    getAllTasks,
    createTask
}


export default TaskService