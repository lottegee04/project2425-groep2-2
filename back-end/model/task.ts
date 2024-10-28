import { Priority } from "./priority";

export class Task{
    private id?: number;
    private description: string;
    private sidenote?: string;
    private startDate: Date;
    private endDate: Date | null;
    private deadline: Date;
    private status: boolean;
    private priority: Priority | null;

    constructor(task : {id?:number, description: string, sidenote?: string, startDate: Date, endDate: Date | null, deadline: Date, status: boolean, priority: Priority | null}) {
        this.validate(task)
        this.id = task.id;
        this.description = task.description;
        this.sidenote = task.sidenote;
        this.startDate = task.startDate;
        this.endDate = null;
        this.deadline = task.deadline;
        this.status = true;
        this.priority = null;
    }

    validate(task: { description: string, deadline: Date}) {
        if (!task.description) {
            throw new Error("Description is required.")
        }
        if (!task.deadline) {
            throw new Error("Deadline is required.")
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
    getStatus(): boolean {
        return this.status;
    }
    getPriority() : Priority | null {
        return this.priority;
    }

}