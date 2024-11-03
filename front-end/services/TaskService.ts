const getAllTasks = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tasks",{
        method:'GET',
        headers: {
            'Content-type':'application/json',
        }
    })

}

const TaskService = {
    getAllTasks,
}

export default TaskService