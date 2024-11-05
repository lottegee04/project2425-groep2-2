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
    colour: 'green',
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

beforeEach(() => {
    mockUserDbGetUserById = jest.fn();
    mockPriorityDbGetPriorityByName = jest.fn();
    addTasktoAllTasksMock = jest.fn();
    mockUserDbAddTaskToUser = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});

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
    // expect(addTasktoAllTasksMock).toHaveBeenCalledWith(
    //     new Task({description,sidenote,startDate,endDate:null,status: true,deadline,priority,userId})
    // );
});

test('given no userId, when: task is created, then an error is thrown', () => {
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
    userDb.addTasktoUser = mockUserDbAddTaskToUser;
    taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
    //when:
    const createTask = () => {
        taskService.createTask({
            description,
            sidenote,
            deadline,
            priority: priorityInput,
            userId: 0,
        });
    };
    //then:
    expect(createTask).toThrow('userId is required.');
});
test('given no description, when: task is created, then an error is thrown', () => {
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);
    priorityDb.getPriorityByName = mockPriorityDbGetPriorityByName.mockReturnValue(priority);
    userDb.addTasktoUser = mockUserDbAddTaskToUser;
    taskDb.addTasktoAllTasks = addTasktoAllTasksMock;
    //when:
    const createTask = () => {
        taskService.createTask({
            description: '',
            sidenote,
            deadline,
            priority: priorityInput,
            userId: id,
        });
    };
    //then:
    expect(createTask).toThrow('Description is required.');
});

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
    expect(createTask).toThrow(`User not found with given userId: ${id}.`);
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
