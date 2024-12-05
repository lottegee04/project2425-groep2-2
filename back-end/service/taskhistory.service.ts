import { ta } from 'date-fns/locale';
import { Task } from '../model/task';
import taskDb from '../repository/task.db';
import taskhistoryDb from '../repository/taskhistory.db';
import userDb from '../repository/user.db';

const getAllFinishedTasksByUser = async (userId: number): Promise<Task[]> => {
    if (!userId) {
        throw new Error('Userid is required.');
    }
    if (!await userDb.getUserById(userId)) {
        throw new Error(`No user found with id ${userId}.`);
    }
    const historyByUser =  await taskhistoryDb.getTaskHistoryByUser(userId);
    if (!historyByUser) {
        throw new Error('No history found by user.');
    }
    return historyByUser.getFinishedTasks();
};

const addFinishedTaskToHistoryByUser = async (userId: number, taskId: number): Promise<Task|null> => {
    if (!userId) {
        throw new Error('Userid is required.');
    }
    if (!await userDb.getUserById(userId)) {
        throw new Error(`No user found with id ${userId}.`);
    }
    if (!taskId) {
        throw new Error('TaskId is required.');
    }
    const taskhistory = await taskhistoryDb.getTaskHistoryByUser(userId);
    if (!taskhistory) {
        throw new Error('No History found for this User.');
    }

    const finishedTask = await taskDb.getTaskById(taskId);
    if (!finishedTask) {
        throw new Error(`No task found with id ${taskId}.`);
    }
    if (finishedTask.getUser().getId() != userId) {
        throw new Error(`The task is not from owner with id ${userId}.`);
    }
    // finishedTask.finishTask();

    // taskDb.deleteTask(finishedTask);
    return taskhistoryDb.finishTask({task: finishedTask});
};
export default { getAllFinishedTasksByUser, addFinishedTaskToHistoryByUser };
