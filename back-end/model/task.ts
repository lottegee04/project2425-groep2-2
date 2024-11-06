import { Priority } from './priority';
import { User } from './user';

export class Task {
    private id?: number;
    private description: string;
    private sidenote?: string;
    private startDate: Date;
    private endDate: Date | null;
    private deadline: Date;
    private done: boolean;
    private priority: Priority;
    private userId: number;

    constructor(task: {
        id?: number;
        description: string;
        sidenote?: string;
        startDate: Date;
        endDate: Date | null;
        deadline: Date;
        done: boolean;
        priority: Priority;
        userId: number;
    }) {
        this.validate(task);
        this.id = task.id;
        this.description = task.description;
        this.sidenote = task.sidenote;
        this.startDate = task.startDate;
        this.endDate = null;
        this.deadline = task.deadline;
        this.done = false;
        this.priority = task.priority;
        this.userId = task.userId;
    }

    validate(task: { startDate: Date; description: string; deadline: Date; userId: number }) {
        if (!task.description) {
            throw new Error('Description is required.');
        }
        if (!task.deadline) {
            throw new Error('Deadline is required.');
        }
        if (task.startDate > task.deadline) {
            throw new Error('Deadline has to be after startDate.');
        }
        if (!task.userId) {
            throw new Error('UserId is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }
    getDescription(): string {
        return this.description;
    }
    getSidenote(): string | undefined {
        return this.sidenote;
    }
    getStartDate(): Date {
        return this.startDate;
    }
    getEndDate(): Date | null {
        return this.endDate;
    }
    getDeadline(): Date {
        return this.deadline;
    }
    getDone(): boolean {
        return this.done;
    }
    getPriority(): Priority {
        return this.priority;
    }
    getUserId(): number {
        return this.userId;
    }
    finishTask(): void {
        this.done = true;
        this.endDate = new Date();
    }
}
