import { LargeNumberLike } from 'crypto';
import { Task } from '../model/task';
import { TaskHistory } from '../model/taskhistory';

const taskHistories = [new TaskHistory({ userId: 1, finishedTasks: [] })];

const getAllTaskHistories = (): TaskHistory[] => {
    return taskHistories;
};
const getTaskHistoryByUser = ({ userId }: { userId: number }): TaskHistory | null => {
    return taskHistories.find((history) => history.getUserId() === userId) || null;
};

export default {
    getAllTaskHistories,
    getTaskHistoryByUser,
};
