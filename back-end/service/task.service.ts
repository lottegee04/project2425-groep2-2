import { Task } from '../model/task';
import priorityDb from '../repository/priority.db';
import taskDb from '../repository/task.db';
import userDb from '../repository/user.db';
import { TaskInput } from '../types';

const getAllTasks = (): Task[] => taskDb.getAllTasks();

const createTask = ({
    id,
    description,
    sidenote,
    deadline,
    priority: priorityInput,
    userId,
}: TaskInput): Task => {
    if (!description) {
        throw new Error('Description is required.');
    }
    if (!deadline) {
        throw new Error('Deadline is required.');
    }
    if (!userId) {
        throw new Error('userId is required.');
    }
    const user = userDb.getUserById(userId);
    if (!user) {
        throw new Error(`User not found with given userId: ${userId}.`);
    }
    const priority = priorityDb.getPriorityByName({ levelName: priorityInput.levelName });
    if (!priority) {
        throw new Error('Priority does not exist.');
    }
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
        userId,
    });
    userDb.addTasktoUser({ user }, { task });
    return taskDb.addTasktoAllTasks(task);
};

export default { getAllTasks, createTask };
