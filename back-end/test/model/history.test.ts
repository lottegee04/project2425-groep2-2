import { addDays } from 'date-fns';
import { Task } from '../../model/task';
import { TaskHistory } from '../../model/taskhistory';
import { User } from '../../model/user';
import { Priority } from '../../model/priority';
import { finished } from 'stream';

test('given valid history parameters; when: creating a new history; then: a history is created with the right parameters;', () => {
    //when:
    const history = new TaskHistory({ userId: 1, finishedTasks: [] });
    //then:
    expect(history.getUserId()).toEqual(1);
    expect(history.getFinishedTasks()).toEqual([]);
});

test('given: valid finished task, when adding task to taskHistory, then task is added to finishedTasks list', () => {
    //given:
    const history = new TaskHistory({ userId: 1, finishedTasks: [] });
    const finishedTask = new Task({
        id: 3,
        description: 'walking',
        sidenote: 'walking the dog.',
        startDate: new Date(),
        endDate: null,
        deadline: addDays(new Date(), 1),
        done: true,
        priority: new Priority({ levelName: 'basic', colour: 'success' }),
        userId: 1,
    });
    finishedTask.finishTask();
    //when:
    history.addFinishedTask(finishedTask);
    //then:
    expect(history.getFinishedTasks().length).toEqual(1);
    expect(history.getFinishedTasks()).toContain(finishedTask);
});
