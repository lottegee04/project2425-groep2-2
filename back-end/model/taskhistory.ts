import { Task } from './task';
import { User } from './user';

export class TaskHistory {
    private userId: number;
    private finishedTasks: Task[];

    constructor(task: { userId: number; finishedTasks: Task[] }) {
        this.userId = task.userId;
        this.finishedTasks = task.finishedTasks;
    }

    getUserId(): number {
        return this.userId;
    }
    getFinishedTasks(): Task[] {
        return this.finishedTasks;
    }
    addFinishedTask(task: Task): void {
        if (task.getDone() === false) {
            throw new Error('Task is not done.');
        } else {
            this.finishedTasks.push(task);
        }
    }
}
