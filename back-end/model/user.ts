import {Task} from './task';
export class User {
    private id?: number;
    private username: string;
    private password: string;
    private tasks : Task[]

    constructor(user : { id?: number; username: string; password: string; tasks: Task[]}) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.tasks = user.tasks;
    }

    getId(): number | undefined {
        return this.id;
    }
    getUsername(): string {
        return this.username
    }
    getPassword() : string {
        return this.password;
    }
    getTasks() : Task[] {
        return this.tasks;
    }
}