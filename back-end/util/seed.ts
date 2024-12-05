import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main= async () => {
    await prisma.taskHistory.deleteMany();
    await prisma.task.deleteMany();
    await prisma.priority.deleteMany();
    await prisma.user.deleteMany();

    const ode = await prisma.user.create({
        data: {
            username: 'ode_m',
            password: 'ode123'
        }
    })

    const lotte = await prisma.user.create({
        data: {
            username: 'lotte_g',
            password: 'lotte123'
        }
    })

    const basic = await prisma.priority.create({
        data: {
            levelName: 'basic',
            colour: 'green'
        }
    })

    const neutral = await prisma.priority.create({
        data: {
            levelName: 'neutral',
            colour: 'yellow'
        }
    })

    const urgent = await prisma.priority.create({
        data: {
            levelName: 'urgent',
            colour: 'red'
        }
    })

    const  neutral2 = await prisma.priority.create({
        data: {
            levelName: 'neutral',
            colour: 'yellow'
        }
    })

    const task1 = await prisma.task.create({
        data: {
            description: 'Pack Christmas presents',
            sidenote: 'Wrapping paper is in the closet',
            startDate: new Date('2024-12-10T10:00:00'),
            endDate: null,
            done: false,
            deadline: new Date('2024-12-24T23:59:59'),
            priorityId: basic.id,
            userId: ode.id
        },
        include: {
            priority: true,
            user: true,
        }
    })

    const task2 = await prisma.task.create({
        data: {
            description: 'Buy Christmas presents',
            sidenote: 'Don\'t forget the wrapping paper',
            startDate: new Date('2024-12-05T10:00:00'),
            endDate: null,
            done: true,
            deadline: new Date('2024-12-23T23:59:59'),
            priorityId: neutral.id,
            userId: ode.id
        },
        include: {
            priority: true,
            user: true,
        }
    })

    const task3 = await prisma.task.create({
        data: {
            description: 'Decorate Christmas tree',
            sidenote: 'Use the new lights',
            startDate: new Date('2024-12-15T10:00:00'),
            endDate: null,
            done: false,
            deadline: new Date('2024-12-24T23:59:59'),
            priorityId: urgent.id,
            userId: lotte.id
        },
        include: {
            priority: true,
            user: true,
        }
    })

    const task4 = await prisma.task.create({
        data: {
            description: 'Buy new Christmas tree',
            sidenote: 'Get a fake one',
            startDate: new Date('2024-12-15T10:00:00'),
            endDate: null,
            done: false,
            deadline: new Date('2024-12-24T23:59:59'),
            priorityId: neutral2.id,
            userId: lotte.id
        },
        include: {
            priority: true,
            user: true,
        }
    })
    
    const taskHistory1 = await prisma.taskHistory.create({
        data: {
            userId: ode.id,
            finishedTasks: {
                connect: [{id: task2.id}]
            }
        },
        include: {
            finishedTasks: true
        }
    })
    const taskHistory2 = await prisma.taskHistory.create({
        data: {
            userId: lotte.id,
            finishedTasks: {
                connect: []
            }
        },
        include: {
            finishedTasks: true
        }
    })
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();