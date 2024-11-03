import {addDays} from "date-fns";
import { Task } from "../model/task";
import { Priority } from "../model/priority";

const allTasks = [
    new Task({
        id:1,
        description: "shopping",
        sidenote: "need to do shopping for food.",
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(),1),
        status: true,
        priority: new Priority({levelName:"basic", colour:"green"}),
        userId: 1
    }),
    new Task({
        id:2,
        description:"uploading paper",
        sidenote:"uploading a paper for a certain course",
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(),4),
        status: true,
        priority: new Priority({levelName:"basic", colour:"green"}),
        userId: 2
    })
]

const getAllTasks = (): Task[]  => {
    return allTasks;
}

const addTasktoAllTasks = (newTask: Task): Task => {
    allTasks.push(newTask);
    return newTask;
}

export default {
    getAllTasks,
    addTasktoAllTasks
}
