import { UnauthorizedError } from 'express-jwt';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { AuthenticationResponse, UserInput } from '../../types';
import { generateJwtToken } from '../../util/jwt';
import bcrypt from 'bcrypt';
import taskhistoryDb from '../../repository/taskhistory.db';
import { TaskHistory } from '../../model/taskhistory';

const admin = new User({
    id: 1,
    username: 'johnDoe',
    password: 'password1234',
    role: 'admin',
});

const userInputAdmin: UserInput = {
    id: 1,
    username: 'johnDoe',
    password: 'password1234',
    role: 'admin',
};

const user2 = new User({
    id: 1,
    username: 'johnDoe',
    password: 'password1234',
    role: 'user',
});

const userInput2: UserInput = {
    id: 1,
    username: 'johnDoe',
    password: 'password1234',
    role: 'user',
};
const newUser = new User({
    id: 3,
    username: 'Junior',
    password: 'password1234',
    role: 'user',
});

const newTaskHistory = new TaskHistory({
    user: newUser, 
    finishedTasks: []
});
const userInputNewUser: UserInput = {
    id: 3,
    username: 'Junior',
    password: 'j1234',
    role: 'user',
};
const users = [admin, user2];

const validResponse: AuthenticationResponse = {
    token: 'valid.jwt.token',
    username: 'johnDoe',
    role: 'user',
};

let mockUserDbgetAllUsers: jest.Mock;
let mockUserDbgetUserByUserName: jest.Mock;
let mockUserDbgetUserById: jest.Mock;
let mockUserDbcreateUser: jest.Mock;
let mockTaskHistoryDbCreateTaskHistory: jest.Mock;

const mockBcryptCompare = jest.fn();
bcrypt.compare = mockBcryptCompare;

const mockGenerateJwtToken = jest.fn();
(generateJwtToken as jest.Mock) = mockGenerateJwtToken;

mockUserDbgetAllUsers = jest.fn();
mockUserDbgetUserByUserName = jest.fn();
mockUserDbgetUserById = jest.fn();
mockUserDbcreateUser = jest.fn();
mockTaskHistoryDbCreateTaskHistory = jest.fn();

userDb.getAllUsers = mockUserDbgetAllUsers;
userDb.getUserByUserName = mockUserDbgetUserByUserName;
userDb.getUserById = mockUserDbgetUserById;
userDb.createUser = mockUserDbcreateUser;
taskhistoryDb.createTaskHistory = mockTaskHistoryDbCreateTaskHistory;
beforeEach = () => {
    jest.resetAllMocks();
    jest.clearAllMocks();
};
afterEach = () => {
    jest.clearAllMocks();
};

test('given valid admin role, when getUsers, then all users are returned', async () => {
    //given
    mockUserDbgetAllUsers.mockResolvedValue(users);
    //when:
    const result = await userService.getUsers({
        username: admin.getUsername(),
        role: admin.getRole(),
    });
    //then:
    expect(mockUserDbgetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual(users);
});
test('given valid user role, when getUsers, then only the given user is returned', async () => {
    //given:
    mockUserDbgetUserByUserName.mockResolvedValue(user2);
    //when:
    const result = await userService.getUsers({
        username: user2.getUsername(),
        role: user2.getRole(),
    });
    //then:
    expect(mockUserDbgetUserByUserName).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result).toEqual([user2]);
});
test('given guest role, when getUsers, then unauthorizedError is thrown', async () => {
    //when:
    const result = async () => {
        await userService.getUsers({
            username: user2.getUsername(),
            role: 'guest',
        });
    };
    //then:
    expect(result).rejects.toThrow(
        new UnauthorizedError('credentials_required', {
            message: 'you are not authorized to access this resource.',
        })
    );
});
test('given user role and unknown user, when getUsers, then error is thrown', async () => {
    //given:
    expect.assertions(1);
    mockUserDbgetUserByUserName.mockResolvedValue(null);
    //when:
    const result = userService.getUsers({
        username: 'unknown',
        role: 'user',
    });
    //then:
    await expect(result).rejects.toThrow(`no User found with username: unknown.`);
});
test('given valid list of users, when calling AllUsers, allUsers are returned', async () => {
    //given
    mockUserDbgetAllUsers.mockResolvedValue(users);
    //when:
    const result = await userService.getAllUsers();
    //then:
    expect(mockUserDbgetAllUsers).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result).toEqual(users);
});

test('given valid user, when calling getUserById, then this user is returned', async () => {
    //given:
    mockUserDbgetUserById.mockResolvedValue(admin);
    //when:
    const result = await userService.getUserById(1);
    //then:
    expect(mockUserDbgetUserById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(admin);
});
test('given unknown user, when calling getUserById', async () => {
    //given:
    mockUserDbgetUserById.mockResolvedValue(null);
    //when:
    const result = async () => await userService.getUserById(1);
    //then:
    expect(mockUserDbgetUserById).toHaveBeenCalledTimes(1);
    await expect(result).rejects.toThrow('User with id 1 does not exists.');
});
test('given new valid user, when calling createUser, then new user is returned', async () => {
    //given:
    mockUserDbgetUserByUserName.mockResolvedValue(null);
    mockUserDbcreateUser.mockResolvedValue(newUser);
    mockTaskHistoryDbCreateTaskHistory.mockResolvedValue(newTaskHistory)
    //when:
    const result = await userService.createUser(userInputNewUser);
    //then:
    expect(mockUserDbgetUserByUserName).toHaveBeenCalled;
    expect(mockUserDbcreateUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual(newUser);
});
test('given extisting user, when calling createUser, then error is thrown', () => {
    mockUserDbgetUserByUserName.mockResolvedValue(user2);
    //when:
    const result = async () => await userService.createUser(userInput2);
    expect(result).rejects.toThrow(
        `User with username ${user2.getUsername()} is already registered.`
    );
});

test('given valid credentials, when authenticate is called, then returns authentication response', async () => {
    // Given
    mockUserDbgetUserByUserName.mockResolvedValue(user2);
    mockBcryptCompare.mockResolvedValue(true);
    mockGenerateJwtToken.mockReturnValue(validResponse.token);

    // When
    const result = await userService.authenticate(userInput2);

    // Then
    expect(mockUserDbgetUserByUserName).toHaveBeenCalled;
    expect(mockUserDbgetUserByUserName).toHaveBeenCalledWith(userInput2.username);
    expect(mockBcryptCompare).toHaveBeenCalledWith(userInput2.password, user2.getPassword());
    expect(mockGenerateJwtToken).toHaveBeenCalledWith({
        username: userInput2.username,
        role: user2.getRole().toString(),
    });
    expect(result).toEqual(validResponse);
});

test('given a unknown username, when authenticate is called, then error is thrown', () => {
    //given:
    mockUserDbgetUserByUserName.mockResolvedValue(null);

    //when:
    const result = async () => await userService.authenticate(userInput2);
    //then:
    expect(result).rejects.toThrow(`User with username: ${userInput2.username} is not found.`);
});

test('given an incorrect password, when authenticate is called, then an error is thrown', () => {
    // Given
    mockUserDbgetUserByUserName.mockResolvedValue(user2);
    mockBcryptCompare.mockResolvedValue(false);

    //when:
    const result = async () => await userService.authenticate(userInput2);
    //then
    expect(result).rejects.toThrow('Incorrect username or password');
});
test('given existing user, when calling userExists, then true is returned', async () => {
    //given:
    mockUserDbgetUserByUserName.mockResolvedValue(admin);
    //when:
    const result = await userService.userExists(admin.getUsername());
    //then:
    expect(result).toBeTruthy();
});
test('given non existing user, when calling userExists, then false is returned', async () => {
    //given:
    mockUserDbgetUserByUserName.mockResolvedValue(null);
    //when:
    const result = await userService.userExists(admin.getUsername());
    //then:
    expect(result).toBeFalsy();
});
