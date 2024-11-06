import { LargeNumberLike } from 'crypto';
import { Task } from '../model/task';
import { TaskHistory } from '../model/taskhistory';

const taskHistories = [new TaskHistory({ userId: 1, finishedTasks: [] })];

const getAllTaskHistories = (): TaskHistory[] => {
    return taskHistories;
};
const getTaskHistoryByUser = (userId: number): TaskHistory => {
    const result = taskHistories.find((history) => history.getUserId() === userId) || null;
    if (!result) {
        throw new Error(`No taskhistory found for user with id ${userId}`);
    }
    return result;
};

export default {
    getAllTaskHistories,
    getTaskHistoryByUser,
};
