import { Priority } from '../../model/priority';
import { Task } from '../../model/task';
import { User } from '../../model/user';
import priorityDb from '../../repository/priority.db';
import taskDb from '../../repository/task.db';
import userDb from '../../repository/user.db';
import taskService from '../../service/task.service';
import { PriorityInput } from '../../types';
import { addDays } from 'date-fns';

const priorityInput: PriorityInput = {
    levelName: 'basic',
    colour: 'succes',
};

const priority = new Priority({
    ...priorityInput,
});
let id = 1;
const user = new User({
    id: id,
    username: 'johnDoe',
    password: 'password1234',
    tasks: [],
});

const description = 'shopping 2.0';
const sidenote = 'even more shopping for food.';
const deadline = addDays(new Date(), 1);
const startDate = new Date();
const done = false;
const userId = 1;

let addTasktoAllTasksMock: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockPriorityDbGetPriorityByName: jest.Mock;
let mockUserDbAddTaskToUser: jest.Mock;
let mockTaskDbGetActiveTasks: jest.Mock;
let mockTaskDbGetAllTasks: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserById = jest.fn();
    mockPriorityDbGetPriorityByName = jest.fn();
    addTasktoAllTasksMock = jest.fn();
    mockUserDbAddTaskToUser = jest.fn();
    mockTaskDbGetActiveTasks = jest.fn();
    mockTaskDbGetAllTasks = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});
test('given all tasks, when:getting all tasks, then all tasks are returned', () => {
    //given:
    const tasks = [ new Task({
        id: 1,
        description: 'shopping',
        sidenote: 'need to do shopping for food.',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 1),
        done: true,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 1,
    }),
    new Task({
        id: 2,
        description: 'uploading paper',
        sidenote: 'uploading a paper for a certain course',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 4),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 2,
    })]
    taskDb.getAllTasks = mockTaskDbGetAllTasks.mockReturnValue(tasks);

    //when:
    const result = taskService.getAllTasks();
    //then:
    expect(mockTaskDbGetAllTasks).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(tasks);
})
test('given: valid task, when: task is created, then task is created with those values', () => {
    //given:
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
    userDb.addTasktoUser = mockUserDbAddTaskToUser;
    taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
    //when:
    taskService.createTask({
        description,
        sidenote,
        deadline,
        priority: priorityInput,
        userId,
    });
    //then:
    expect(addTasktoAllTasksMock).toHaveBeenCalledTimes(1);
    expect(mockPriorityDbGetPriorityByName).toHaveBeenCalledTimes(1);
    expect(mockUserDbAddTaskToUser).toHaveBeenCalledTimes(1);
    expect(addTasktoAllTasksMock).toHaveBeenCalledTimes(1);
});

// test('given no userId, when: task is created, then an error is thrown', () => {
//     userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
//     priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
//     userDb.addTasktoUser = mockUserDbAddTaskToUser;
//     taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
//     //when:
//     const createTask = () => {
//         taskService.createTask({
//             description,
//             sidenote,
//             deadline,
//             priority: priorityInput,
//             userId: 0,
//         });
//     };
//     //then:
//     expect(createTask).toThrow('UserId is required.');
// });
// test('given no description, when: task is created, then an error is thrown', () => {
//     userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
//     priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
//     userDb.addTasktoUser = mockUserDbAddTaskToUser;
//     taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
//     //when:
//     const createTask = () => {
//         taskService.createTask({
//             description: '',
//             sidenote,
//             deadline,
//             priority: priorityInput,
//             userId: id,
//         });
//     };
//     //then:
//     expect(createTask).toThrow('Description is required.');
// });

test('given no user, when: task is created, then an error is thrown', () => {
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(null);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
    userDb.addTasktoUser = mockUserDbAddTaskToUser;
    taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
    id = 404;
    //when:
    const createTask = () => {
        taskService.createTask({
            description,
            sidenote,
            deadline,
            priority: priorityInput,
            userId: id,
        });
    };
    //then:
    expect(createTask).toThrow(`User not found with given userId: 404.`);
});
test('given no priority, when: task is created, then an error is thrown', () => {
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(null);
    userDb.addTasktoUser = mockUserDbAddTaskToUser;
    taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
    //when:
    const createTask = () => {
        taskService.createTask({
            description,
            sidenote,
            deadline,
            priority: priorityInput,
            userId,
        });
    };
    //then:
    expect(createTask).toThrow('Priority does not exist.');
});

test('given active tasks, when:getting all active tasks, then all active tasks are returned', () => {
    //given:
    const activeTasks = [ new Task({
        id: 1,
        description: 'shopping',
        sidenote: 'need to do shopping for food.',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 1),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 1,
    }),
    new Task({
        id: 2,
        description: 'uploading paper',
        sidenote: 'uploading a paper for a certain course',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 4),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 2,
    })]
    taskDb.getActiveTasks = mockTaskDbGetActiveTasks.mockReturnValue(activeTasks);

    //when:
    const result = taskService.getActiveTasks();
    //then:
    expect(mockTaskDbGetActiveTasks).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(activeTasks);
})

test('given active tasks, when:getting all active tasks, then all active tasks are returned', () => {
    //given:
    taskDb.getActiveTasks = mockTaskDbGetActiveTasks.mockReturnValue(null);

    //when:
    const result = taskService.getActiveTasks();
    //then:
    expect(mockTaskDbGetActiveTasks).toHaveBeenCalledTimes(1);
    expect(result).toEqual("There are at this moment no new active tasks.");
})