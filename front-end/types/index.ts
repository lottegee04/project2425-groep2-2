
export type Priority = {
    levelName: string;
    colour: string;
}

export type Task = {
    id: number;
    description: string;
    sidenote: string;
    startDate: Date;
    endDate: Date;
    deadline: Date;
    done: boolean;
    priority: Priority
  };

export type User = {
    id: number;
    username: string;
    tasks: Task[];
}

export type StatusMessage = {
    message: string,
    type: "error" | "success";
}