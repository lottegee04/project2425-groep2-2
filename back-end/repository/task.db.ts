import { addDays } from 'date-fns';
import { Task } from '../model/task';
import { Priority } from '../model/priority';

const allTasks = [
    new Task({
        id: 1,
        description: 'shopping',
        sidenote: 'need to do shopping for food.',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 1),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 1,
    }),
    new Task({
        id: 2,
        description: 'uploading paper',
        sidenote: 'uploading a paper for a certain course',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 4),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 2,
    }),
];

const getAllTasks = (): Task[] => {
    return allTasks;
};

const getActiveTasks = (): Task[] => {
   const activeTasks = allTasks.filter((task) => task.getDone() === false);
   return activeTasks;
}

const getTaskById = (id: number): Task => {
    const result = allTasks.find((task) => task.getId() === id) || null;
    if (!result) {
        throw new Error(`No Task found with id ${id}.`);
    }
    return result;
};
const getTaskByPriority = (levelName: string): Task[] => {
    const result = allTasks.filter((task) => task.getPriority().getLevelName() === levelName);
    return result;
}
const addTasktoAllTasks = (newTask: Task): Task => {
    allTasks.push(newTask);
    return newTask;
};

const deleteTask = (task: Task): void => {
    const index = allTasks.indexOf(task);
    allTasks.splice(index, 1);
};

export default {
    getAllTasks,
    addTasktoAllTasks,
    getTaskById,
    deleteTask,
    getActiveTasks,
    getTaskByPriority
};
