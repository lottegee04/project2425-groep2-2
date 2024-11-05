import { Priority } from '../model/priority';

type TaskInput = {
    id?: number;
    description: string;
    sidenote?: string;
    deadline: Date;
    startDate?: Date;
    endDate?: Date;
    priority: PriorityInput;
    done?: boolean;
    userId: number;
};

type PriorityInput = {
    levelName: string;
    colour: string;
};

export { TaskInput, PriorityInput };
