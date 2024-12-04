import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exists.`);
    return user;
};

const createUser = async ({ username, password }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUserName(username);
    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    const newUser = await userDb.createUser(user);
    return newUser;
};

const authenticate = async ({username,password}:UserInput):Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUserName(username);
    if (!user) {
        throw new Error(`User with username: ${username} is not found.`);
    }
    const invalidPassword = await bcrypt.compare(password,user.getPassword());
    if (!invalidPassword) {
        throw new Error("Incorrect username or password");
    }
    return {
        token: generateJwtToken({username}),
        username: username,
    }
}

export default { getAllUsers, getUserById, createUser,authenticate };
