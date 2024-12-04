
type Role = 'admin' | 'user' | 'guest';

type TaskInput = {
    id?: number;
    description: string;
    sidenote?: string;
    deadline: Date;
    startDate?: Date;
    endDate?: Date;
    priority: PriorityInput;
    done?: boolean;
    user: UserInput;
};

type PriorityInput = {
    levelName: string;
    colour: string;
};

type UserInput = {
    id?: number;
    username: string;
    password: string;
    role: Role;
};
type AuthenticationResponse = {
    token: string;
    username: string;
};



export { TaskInput, PriorityInput, UserInput, AuthenticationResponse, Role };
