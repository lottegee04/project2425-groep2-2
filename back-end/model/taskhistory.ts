import { Task } from './task';
import { User } from './user';

export class TaskHistory {
    private user: User;
    private finishedTasks: Task[];

    constructor(task: { user: User; finishedTasks: Task[] }) {
        this.user = task.user;
        this.finishedTasks = task.finishedTasks;
    }

    getUser(): User {
        return this.user;
    }
    getFinishedTasks(): Task[] {
        return this.finishedTasks;
    }
    
}
