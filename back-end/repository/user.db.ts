import { addDays } from "date-fns";
import { Task } from "../model/task";
import { User } from "../model/user";

const users = [
    new User({
        id:1,
        username:"johnDoe",
        password: "password1234",
        tasks: [ new Task({
            id:1,
            description: "shopping",
            sidenote: "need to do shopping for food.",
            startDate: new Date(),
            deadline: addDays(new Date(),1)
        })]
    }),
    new User({
        id:2,
        username:"OdeMalfait",
        password:"odespassword1324",
        tasks:[
            new Task({
                id:2,
                description:"uploading paper",
                sidenote:"uploading a paper for a certain course",
                startDate: new Date(),
                deadline: addDays(new Date(),4)
            })
        ]
    })
];

const getAllUsers = (): User[] => {
    return users;
};

export default {
    getAllUsers
};
