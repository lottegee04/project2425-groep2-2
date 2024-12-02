import {Task} from './task';
import { User as UserPrisma, 
    Task as TaskPrisma
} from '@prisma/client';
export class User {
    private id?: number;
    private username: string;
    private password: string;


    constructor(user : { id?: number; username: string; password: string; }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
    }
    validate(user: {username: string, password: string}) {
        if (!user.username) {
            throw new Error('Username is required.')
        }
        if (!user.password) {
            throw new Error("Password is required.")
        }
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
    equals(user: User): boolean {
        return this.username === user.getUsername() && this.password === user.getPassword();
    }




    static from({id, username,password}: UserPrisma){
        return new User({id, username, password});
    }
}