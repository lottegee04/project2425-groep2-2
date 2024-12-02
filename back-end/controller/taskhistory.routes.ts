/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *       TaskHistory:
 *          type: object
 *          properties:
 *            userId:
 *              type: number
 *              format: int64
 *            description:
 *              type: string
 *              description: Id of the taskhistory's user.
 *            finishedTasks:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Task'
 *              description: a list of user's finished tasks.
 */

import express, { NextFunction, Request, Response } from 'express';
import taskhistoryService from '../service/taskhistory.service';
const taskhistoryRouter = express.Router();
/**
 * @swagger
 * /taskhistory/{userId}:
 *  get:
 *      summary: Get all finished tasks by user.
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *              required: true
 *              description: The user id.
 *      responses:
 *          200:
 *              description: An array of finished tasks.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskhistoryRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allFinishedTasks = await taskhistoryService.getAllFinishedTasksByUser(
            Number(req.params.userId)
        );
        res.status(200).json(allFinishedTasks);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /taskhistory/finishTask/{userId}/{taskId}:
 *  get:
 *      summary: Finish a task and put it in taskHistory.
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *              required: true
 *              description: The user id.
 *          - in: path
 *            name: taskId
 *            schema:
 *              type: integer
 *              required: true
 *              description: The id of the task that will be finished.
 *      responses:
 *          200:
 *              description: Object of the finished Task.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 */
taskhistoryRouter.get(
    '/finishTask/:userId/:taskId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const finishTask = await taskhistoryService.addFinishedTaskToHistoryByUser(
                Number(req.params.userId),
                Number(req.params.taskId)
            );
            res.status(200).json(finishTask);
        } catch (error) {
            next(error);
        }
    }
);

export { taskhistoryRouter };
