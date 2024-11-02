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
import express, {NextFunction, Request, Response} from 'express';
import taskService from '../service/task.service';
import { TaskInput } from '../types';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
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
taskRouter.get('/', async ( requ: Request, res:Response, next: NextFunction) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
});

/**
 * @swagger
 * /tasks:
 *   post:
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
taskRouter.post("/",async(req:Request, res:Response) => {
    const task = <TaskInput>req.body;
    const result = await taskService.createTask(task);
    res.status(200).json(result);
}) ;

export {taskRouter}