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

    constructor(task : {id?:number,description: string, sidenote?: string, startDate: Date, deadline: Date}) {
        this.id = task.id;
        this.description = task.description;
        this.sidenote = task.sidenote;
        this.startDate = task.startDate;
        this.endDate = null;
        this.deadline = task.deadline;
        this.status = false;
        this.priority = null;
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