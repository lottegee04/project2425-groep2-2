import { addDays } from 'date-fns';
import { Priority } from '../../model/priority';
import { Task } from '../../model/task';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import taskhistoryDb from '../../repository/taskhistory.db';
import { TaskHistory } from '../../model/taskhistory';
import taskhistoryService from '../../service/taskhistory.service';
import taskDb from '../../repository/task.db';

const task = new Task({
    id: 4,
    description: 'walking',
    sidenote: 'walking the dog.',
    startDate: new Date(),
    endDate: null,
    deadline: addDays(new Date(), 1),
    done: false,
    priority: new Priority({ levelName: 'basic', colour: 'success' }),
    userId: 1,
});
const user = new User({
    id: 1,
    username: 'johnDoe',
    password: 'password1234',
    tasks: [task],
});
const finishedTask = new Task({
    id: 3,
    description: 'finishedTask',
    sidenote: 'finished this task.',
    startDate: new Date(),
    endDate: null,
    deadline: addDays(new Date(), 1),
    done: true,
    priority: new Priority({ levelName: 'basic', colour: 'success' }),
    userId: 1,
});
const taskHistory = new TaskHistory({ userId: 1, finishedTasks: [finishedTask] });

let mockUserDbgetUserById: jest.Mock;
let mockTaskHistoryDbGetTaskHistoryByUser: jest.Mock;
let mockTaskDbGetTaskById: jest.Mock;

beforeEach(() => {
    mockUserDbgetUserById = jest.fn();
    mockTaskHistoryDbGetTaskHistoryByUser = jest.fn();
    mockTaskDbGetTaskById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given valid task and user; when getting finished tasks from user's taskhistory; then finished tasks are returned", () => {
    //given:
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(user);
    taskhistoryDb.getTaskHistoryByUser =
        mockTaskHistoryDbGetTaskHistoryByUser.mockReturnValue(taskHistory);
    //when:
    taskhistoryService.getAllFinishedTasksByUser(1);
    //then:
    expect(mockUserDbgetUserById).toHaveBeenCalledTimes(1);
    expect(mockTaskHistoryDbGetTaskHistoryByUser).toHaveBeenCalledTimes(1);
});

test('given unknkown userid; when getting finished tasks from takshistory; then error is thrown', () => {
    //given:
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(null);
    //when:
    const testing = () => taskhistoryService.getAllFinishedTasksByUser(505);
    //then:
    expect(testing).toThrow(`No user found with id 505.`);
});

test('given invalid userId; when getting finished tasks from taskhistory, then error is thrown;', () => {
    //when
    const testing = () => taskhistoryService.getAllFinishedTasksByUser(0);
    //then:
    expect(testing).toThrow('Userid is required.');
});
test('given user without history; when getting finished tasks from taskhistory, then error is thrown;', () => {
    //given
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(user);
    taskhistoryDb.getTaskHistoryByUser =
        mockTaskHistoryDbGetTaskHistoryByUser.mockReturnValue(null);
    //when
    const testing = () => taskhistoryService.getAllFinishedTasksByUser(1);
    //then:
    expect(testing).toThrow('No history found by user.');
});

test('given valid user and task; when adding task to taskhistory; then task is pushed to taskhistory and returned', () => {
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(user);
    taskhistoryDb.getTaskHistoryByUser =
        mockTaskHistoryDbGetTaskHistoryByUser.mockReturnValue(taskHistory);
    taskDb.getTaskById = mockTaskDbGetTaskById.mockReturnValue(task);
    task.finishTask();
    //when:
    taskhistoryService.addFinishedTaskToHistoryByUser(1, 4);
    //then
    expect(mockTaskDbGetTaskById).toHaveBeenCalledTimes(1);
    expect(mockTaskHistoryDbGetTaskHistoryByUser).toHaveBeenCalledTimes(1);
    expect(mockTaskDbGetTaskById).toHaveBeenCalledTimes(1);
});

test('given invalid userId; when adding task to history; then: error is thrown;', () => {
    const testing = () => taskhistoryService.addFinishedTaskToHistoryByUser(0, 3);
    //then:
    expect(testing).toThrow('Userid is required.');
});

test('given invalid taskId; when when adding task to history; then: error is thrown;', () => {
    const testing = () => taskhistoryService.addFinishedTaskToHistoryByUser(1, 0);
    //then:
    expect(testing).toThrow('TaskId is required.');
});

test('given unknkown userid; when when adding task to history; then error is thrown', () => {
    //given:
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(null);
    //when:
    const testing = () => taskhistoryService.addFinishedTaskToHistoryByUser(505, 1);
    //then:
    expect(testing).toThrow(`No user found with id 505.`);
});
test('given unknkown taskid; when when adding task to history; then error is thrown', () => {
    //given:
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(user);
    taskhistoryDb.getTaskHistoryByUser =
        mockTaskHistoryDbGetTaskHistoryByUser.mockReturnValue(taskHistory);
    taskDb.getTaskById = mockTaskDbGetTaskById.mockReturnValue(null);
    //when:
    const testing = () => taskhistoryService.addFinishedTaskToHistoryByUser(1, 505);
    //then:
    expect(testing).toThrow(`No task found with id 505.`);
});

test('given task that is not from user; when adding task to taskhistory; then task is pushed to taskhistory and returned', () => {
    const user2Task = new Task({
        id: 5,
        description: 'walking',
        sidenote: 'walking the dog.',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 1),
        done: false,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 2,
    });
    userDb.getUserById = mockUserDbgetUserById.mockReturnValue(user);
    taskhistoryDb.getTaskHistoryByUser =
        mockTaskHistoryDbGetTaskHistoryByUser.mockReturnValue(taskHistory);
    taskDb.getTaskById = mockTaskDbGetTaskById.mockReturnValue(user2Task);
    //when:
    const testing = () => taskhistoryService.addFinishedTaskToHistoryByUser(1, 4);
    //then
    expect(testing).toThrow('The task is not from owner with id 1.');
});
