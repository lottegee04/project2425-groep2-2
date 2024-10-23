import {addDays} from "date-fns";
import { Task } from "../model/task";

const allTasks = [
    new Task({
        id:1,
        description: "shopping",
        sidenote: "need to do shopping for food.",
        startDate: new Date(),
        deadline: addDays(new Date(),1)
    }),
    new Task({
        id:2,
        description:"uploading paper",
        sidenote:"uploading a paper for a certain course",
        startDate: new Date(),
        deadline: addDays(new Date(),4)
    })
]

const getAllTasks = (): Task[]  => {
    return allTasks;
}

export default {
    getAllTasks
}
