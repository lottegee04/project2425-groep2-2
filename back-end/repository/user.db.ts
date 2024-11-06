import { addDays } from 'date-fns';
import { Task } from '../model/task';
import { User } from '../model/user';
import { Priority } from '../model/priority';

const users = [
    new User({
        id: 1,
        username: 'johnDoe',
        password: 'password1234',
        tasks: [
            new Task({
                id: 1,
                description: 'shopping',
                sidenote: 'need to do shopping for food.',
                startDate: new Date(),
                endDate: null,
                deadline: addDays(new Date(), 1),
                done: false,
                priority: new Priority({ levelName: 'basic', colour: 'green' }),
                userId: 1,
            }),
        ],
    }),
    new User({
        id: 2,
        username: 'OdeMalfait',
        password: 'odespassword1324',
        tasks: [
            new Task({
                id: 2,
                description: 'uploading paper',
                sidenote: 'uploading a paper for a certain course',
                startDate: new Date(),
                endDate: null,
                deadline: addDays(new Date(), 4),
                done: false,
                priority: new Priority({ levelName: 'basic', colour: 'green' }),
                userId: 2,
            }),
        ],
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

const addTasktoUser = ({ user }: { user: User }, { task }: { task: Task }): void => {
    user.addTask(task);
};

export default {
    getAllUsers,
    getUserById,
    addTasktoUser,
};
