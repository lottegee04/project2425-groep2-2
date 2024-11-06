import { LargeNumberLike } from 'crypto';
import { Task } from '../model/task';
import { TaskHistory } from '../model/taskhistory';
import { addDays } from 'date-fns';
import { Priority } from '../model/priority';
const finishedTask = new Task({
    id: 3,
    description: 'finishedTask',
    sidenote: 'finished this task.',
    startDate: new Date('2024-10-01'),
    endDate: null,
    deadline: addDays(new Date(), 1),
    done: false,
    priority: new Priority({ levelName: 'basic', colour: 'success' }),
    userId: 1,
});
finishedTask.finishTask();

const taskHistories = [
    new TaskHistory({
        userId: 1,
        finishedTasks: [finishedTask],
    }),
];

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
