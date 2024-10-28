import { Task } from "../model/task";
import taskDb from "../repository/task.db";

const getAllTasks = (): Task[] => taskDb.getAllTasks();

export default { getAllTasks}