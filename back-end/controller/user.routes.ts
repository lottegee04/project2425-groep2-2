/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            username:
 *              type: string
 *              description: User name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: User's name.
 *            password:
 *              type: string
 *              description: user's password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *            tasks:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Task'
 *              description: user's list of active tasks.
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [admin,user,guest]
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { Role, UserInput } from '../types';
import { User } from '../model/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const users = await userService.getUsers({ username, role });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a user by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The user id.
 *      responses:
 *          200:
 *              description: A user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /users/login:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Login as a know user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'authentication succesfull', ...response });
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /users/exists/{username}:
 *  get:
 *      summary: Know if a User already exists or not.
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The username
 *      responses:
 *          200:
 *              description: boolean
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: boolean
 */
userRouter.get('/exists/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.userExists(String(req.params.username));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

userRouter.delete('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const user = await userService.getUserByUserName(username);
        const userId = user.getId();
        if (userId === undefined) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        const isValid = await userService.verifyPassword(userInput);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }
        const deletion = await userService.deleteUser(userId);
        if (deletion) {
            res.status(200).json({ message: `User with id ${req.params.id} deleted.` });
        } else {
            res.status(404).json({ message: `No user deleted.` });
        }
    }
    catch (error) {
        next(error);
    }


})

userRouter.put('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const { userName, oldPassword, role, newPassword } = req.body;

        
        if (!newPassword || oldPassword === newPassword) {
            return res.status(400).json({ message: "New password must be provided and different from the old password." });
        }

        const isVerified = await userService.verifyPassword({ username, password: oldPassword, role });
        if (!isVerified) {
            return res.status(401).json({ message: "Authentication failed. Incorrect old password." });
        }

        userService.changePassword(username, newPassword)

        

        res.status(200).json({ message: "Password updated successfully." });
    } 
    catch (error) {
        next(error);
    }
})


export { userRouter };
