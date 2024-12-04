import { mock } from 'node:test';
import { Priority } from '../../model/priority';
import { Task } from '../../model/task';
import { User } from '../../model/user';
import priorityDb from '../../repository/priority.db';
import taskDb from '../../repository/task.db';
import userDb from '../../repository/user.db';
import taskService from '../../service/task.service';
import { PriorityInput } from '../../types';
import { UserInput } from '../../types';
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
    role: "user"
});

const userInput: UserInput =  {
    id: id,
    username: 'johnDoe',
    password: 'password1234',
    role:"user"
};

const description = 'shopping 2.0';
const sidenote = 'even more shopping for food.';
const deadline = addDays(new Date(), 1);
const startDate = new Date();
const done = false;
const userId = 1;

const tasks = [ new Task({
    id: 1,
    description: 'shopping',
    sidenote: 'need to do shopping for food.',
    startDate: new Date(),
    endDate: null,
    deadline: addDays(new Date(), 1),
    done: true,
    priority: new Priority({ levelName: 'basic', colour: 'success' }),
    user,
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
    user,
})]


let mockUserDbGetUserById: jest.Mock;
let mockPriorityDbGetPriorityById: jest.Mock;
let mockTaskDbGetActiveTasks: jest.Mock;
let mockTaskDbGetAllTasks: jest.Mock;
let mockTaskDbGetTasksByPriority: jest.Mock;
let mockTaskDbCreateTask: jest.Mock;
let mockPriorityDbGetPriorityByName: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserById = jest.fn();
    mockPriorityDbGetPriorityById = jest.fn();
    mockTaskDbGetActiveTasks = jest.fn();
    mockTaskDbGetAllTasks = jest.fn();
    mockTaskDbGetTasksByPriority = jest.fn();
    mockTaskDbCreateTask = jest.fn();
    mockPriorityDbGetPriorityByName = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});
test('given all tasks, when:getting all tasks, then all tasks are returned',async () => {
    //given:
    taskDb.getAllTasks = mockTaskDbGetAllTasks.mockResolvedValue(tasks);

    //when:

    const result = await taskService.getAllTasks();
    //then:
    expect(mockTaskDbGetAllTasks).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(tasks);
})
test('given: valid task, when: task is created, then task is created with those values', async () => {
    //given:
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(user);
    taskDb.createTask = mockTaskDbCreateTask
    //when:
    const result =  await taskService.createTask({
        description,
        sidenote,
        deadline,
        priority: priorityInput,
        user: userInput,
    });
    //then:
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockTaskDbCreateTask).toHaveBeenCalledTimes(1);
    expect(mockTaskDbCreateTask).toHaveBeenCalledWith(new Task({
        description,
        sidenote,
        startDate: expect.any(Date), //had to do it like this because the the little tiny fraction of a second difference in the date object between the creation and the check with this object
        endDate: null,
        done: false,
        deadline,
        priority: priority,
        user,}))
    
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

test('given no user, when: task is created, then an error is thrown', async () => {
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(null);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityById.mockResolvedValue(priority);

    id = 404;
    const userInput: UserInput = {
        id,
        username: 'johnDoe',
        password: 'password1234',
        role:'user'
    }
    //when:
    const createTask = async () => {
        await taskService.createTask({
            description,
            sidenote,
            deadline,
            priority: priorityInput,
            user: userInput,
        });
    };
    //then:
    expect(createTask).rejects.toThrow(`User not found with given userId: 404.`);
});
test('given no priority, when: task is created, then an error is thrown',async () => {
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(user);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityById.mockResolvedValue(null);

    //when:
    const createTask = async () => {
        await taskService.createTask({
            description,
            sidenote,
            deadline,
            priority: priorityInput,
            user: userInput,
        });
    };
    //then:
    expect(createTask).rejects.toThrow('Priority does not exist.');
});

test('given active tasks, when:getting all active tasks, then all active tasks are returned', async () => {
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
        user,
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
        user,
    })]
    taskDb.getActiveTasks = mockTaskDbGetActiveTasks.mockResolvedValue(activeTasks);

    //when:
    const result =await taskService.getActiveTasks();
    //then:
    expect(mockTaskDbGetActiveTasks).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(activeTasks);
});

test('given active tasks, when:getting all active tasks, then all active tasks are returned', async () => {
    //given:
    taskDb.getActiveTasks = mockTaskDbGetActiveTasks.mockResolvedValue([]);

    //when:
    const result = await taskService.getActiveTasks();
    //then:
    expect(mockTaskDbGetActiveTasks).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
});

test("given valid levelName, when: getting Tasks By Priority, then those tasks are returned", async () => {
    //given:
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockResolvedValue([priority]);
    taskDb.getTasksByPriority = mockTaskDbGetTasksByPriority.mockResolvedValue(tasks)
    //when:
    const result = await taskService.getTasksByPriority("basic");
    //then:
    expect(mockPriorityDbGetPriorityByName).toHaveBeenCalledTimes(1);
    expect(mockTaskDbGetTasksByPriority).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(tasks);
});
test("given valid levelName with no tasks, when: getting Tasks By Priority, then empty list is returned",async () => {
    //given:
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockResolvedValue([priority]);
    taskDb.getTasksByPriority = mockTaskDbGetTasksByPriority.mockReturnValue([])
    //when:
    const result = await taskService.getTasksByPriority("urgent");
    //then:
    expect(mockPriorityDbGetPriorityByName).toHaveBeenCalledTimes(1);
    expect(mockTaskDbGetTasksByPriority).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
});
test("given unknown levelName, when: getting Tasks By Priority, then an error is thrown", async () => {
    //given:
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockResolvedValue(null);
    //when:
    const result = async () =>  await taskService.getTasksByPriority("notALevel");
    //then:
    expect(result).rejects.toThrow("No Priority found with levelName: notALevel.")
});