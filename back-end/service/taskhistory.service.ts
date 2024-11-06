import { Task } from '../model/task';
import taskDb from '../repository/task.db';
import taskhistoryDb from '../repository/taskhistory.db';
import userDb from '../repository/user.db';

const getAllFinishedTasksByUser = (userId: number): Task[] => {
    if (!userId) {
        throw new Error('Userid is required.');
    }
    if (!userDb.getUserById(userId)) {
        throw new Error(`No user found with id ${userId}.`);
    }
    const historyByUser = taskhistoryDb.getTaskHistoryByUser(userId);
    if (!historyByUser) {
        throw new Error('No history found by user.');
    }
    return historyByUser.getFinishedTasks();
};

const addFinishedTaskToHistoryByUser = (userId: number, taskId: number): Task => {
    if (!userId) {
        throw new Error('Userid is required.');
    }
    if (!userDb.getUserById(userId)) {
        throw new Error('no user found with given id.');
    }
    if (!taskId) {
        throw new Error('TaskId is required.');
    }
    if (!taskhistoryDb.getTaskHistoryByUser(userId)) {
        throw new Error('No History found for this User.');
    }

    const taskhistory = taskhistoryDb.getTaskHistoryByUser(userId);
    const finishedTask = taskDb.getTaskById(taskId);
    finishedTask.finishTask();
    taskhistory.addFinishedTask(finishedTask);
    return finishedTask;
};
export default { getAllFinishedTasksByUser, addFinishedTaskToHistoryByUser };
