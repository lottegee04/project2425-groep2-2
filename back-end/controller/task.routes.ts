/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *       Task:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            description:
 *              type: string
 *              description: Title of the task.
 *            sidenote:
 *              type: string
 *              description: details of the task.
 *            startDate:
 *              type: string
 *              format: date-time
 *              description: date when the task is made/started.
 *            endDate:
 *              type: string
 *              format: date-time
 *              description: date when the task is completed.
 *            deadline:
 *              type: string
 *              format: date-time
 *              description: due date of the task.
 *            status:
 *              type: boolean
 *              description: status of the task is completed or not.
 *            priority:
 *              type: object
 *              properties:
 *                    levelName:
 *                        type: string
 *                    colour:
 *                        type: string
 *              description: the level of priority of the task.
 *            userId:
 *              type: number
 *              format: int64
 *       TaskInput:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            description:
 *              type: string
 *            sidenote:
 *              type: string
 *            deadline:
 *              type: string
 *              format: date-time
 *              description: due date of the task.
 *            priority:
 *              type: object
 *              properties:
 *                 levelName:
 *                      type: string
 *                 colour:
 *                      type: string
 *            userId:
 *              type: number
 *              format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/task.service';
import { Role, TaskInput } from '../types';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all Tasks.
 *     responses:
 *       200:
 *         description: A list of Tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const tasks = await taskService.getTasks({ username, role });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /tasks/active:
 *   get:
 *     summary: Get a list of all tasks which are not finished/active.
 *     responses:
 *       200:
 *         description: A list of Active Tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/active', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activeTasks = await taskService.getActiveTasks();
        res.status(200).json(activeTasks);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new task for a existing user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskInput'
 *      responses:
 *         200:
 *            description: The created task.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const task = <TaskInput>req.body;
        const result = await taskService.createTask(task, { username, role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /tasks/priority/{levelName}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get Tasks by Priority.
 *      parameters:
 *          - in: path
 *            name: levelName
 *            schema:
 *              type: string
 *              required: true
 *              description: The level name of the priority.
 *      responses:
 *       200:
 *         description: A list of Tasks with the given priority.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/priority/:levelName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const tasks = await taskService.getTasksByPriority(String(req.params.levelName), {
            username,
            role,
        });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /tasks/deleteTask/{taskId}:
 *  delete:
 *      security:
 *       - bearerAuth: []
 *      summary: Delete task by taskId
 *      parameters:
 *          - in: path
 *            name: taskId
 *            schema:
 *              type: integer
 *              required: true
 *              description: The id of the task.
 *      responses:
 *       200:
 *         description: A message when the tasks is succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
taskRouter.delete(
    '/deleteTask/:taskId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request = req as Request & { auth: { username: string; role: Role } };
            const { username, role } = request.auth;
            const success = await taskService.deleteTask(Number(req.params.taskId), {
                username,
                role,
            });
            if (success) {
                res.status(200).json({ message: 'Task successfully deleted!' });
            }
        } catch (error) {
            next(error);
        }
    }
);
/**
 * @swagger
 * /tasks/editTask/{taskId}:
 *   put:
 *      security:
 *       - bearerAuth: []
 *      summary: Edit a task for a existing user.
 *      parameters:
 *          - in: path
 *            name: taskId
 *            schema:
 *              type: integer
 *              required: true
 *              description: The id of the task.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskInput'
 *      responses:
 *         200:
 *            description: The updated task.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.put('/editTask/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const task = <TaskInput>req.body;
        const editedTask = await taskService.editTask(Number(req.params.taskId), task, {
            username,
            role,
        });
        res.status(200).json(editedTask);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a task by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The task id.
 *      responses:
 *          200:
 *              description: A task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const task = await taskService.getTaskById(Number(req.params.id), { username, role });

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

export { taskRouter };
