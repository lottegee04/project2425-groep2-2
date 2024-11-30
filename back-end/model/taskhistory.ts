import { Task } from './task';
import { User } from './user';
import { TaskHistory as TaskHistoryPrisma,
    User as UserPrisma,
    Task as TaskPrisma,
    Priority as PriorityPrisma
 } from '@prisma/client';

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

    addFinishedTask(task: Task): void {
        this.finishedTasks.push(task);
    }

    static from({ user, finishedTasks }: TaskHistoryPrisma & { user: UserPrisma; finishedTasks: (TaskPrisma & { priority: PriorityPrisma; user: UserPrisma})[] }) {
        return new TaskHistory({ 
            user: User.from(user),
            finishedTasks: finishedTasks.map(task => Task.from(task))
         });
    }
    
}
