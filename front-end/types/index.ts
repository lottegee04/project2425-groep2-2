
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
    status: boolean;
    priority: Priority
  };