import { Priority } from '../model/priority';
import { Task } from '../model/task';
import priorityDb from '../repository/priority.db';
import taskDb from '../repository/task.db';
import userDb from '../repository/user.db';
import { TaskInput } from '../types';

const getAllTasks = async (): Promise<Task[]>=> await taskDb.getAllTasks();

const getActiveTasks = async (): Promise<Task[]>  => {
  return await taskDb.getActiveTasks();
}

const createTask = async ({
    id,
    description,
    sidenote,
    deadline,
    priority: priorityInput,
    user: userInput,
}: TaskInput): Promise<Task> => {
    // if (!description) {
    //     throw new Error('Description is required.');
    // }
    // if (!deadline) {
    //     throw new Error('Deadline is required.');
    // }
    if (!userInput.id) {
        throw new Error('userId is required.');
    }
    const user = await userDb.getUserById(userInput.id);
    if (!user) {
        throw new Error(`User not found with given userId: ${userInput.id}.`);
    }
    const priority = new Priority(priorityInput);
    const createPriority = await priorityDb.createPriority(priority);
    const startDate = new Date();
    const task = new Task({
        id,
        description,
        sidenote,
        startDate,
        endDate: null,
        done: false,
        deadline,
        priority,
        user,
    });
    return taskDb.createTask(task);
};

const getTasksByPriority = async(levelName: string): Promise<Task[]> => {
    const priority = await priorityDb.getPriorityByName({levelName});
    if (!priority) {
        throw new Error(`No Priority found with levelName: ${levelName}.`)
    }
    return taskDb.getTasksByPriority(levelName);
}

export default { getAllTasks, getActiveTasks, createTask, getTasksByPriority };
