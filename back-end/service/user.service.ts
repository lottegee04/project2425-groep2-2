import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';
import bcrypt from 'bcrypt';

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

export default { getAllUsers, getUserById, createUser };
