import { Priority } from "../model/priority";

type TaskInput = {
    id?: number;
    description: string;
    sidenote?: string;
    deadline: Date;
    priority: PriorityInput;
    userId: number;
}

type PriorityInput = {
    levelName: string;
    colour: string;
}

export {
    TaskInput,
    PriorityInput
}