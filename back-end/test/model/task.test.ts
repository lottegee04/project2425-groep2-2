import {addDays} from "date-fns";
import { Task } from "../../model/task";
import { start } from "repl";

//given:
const id = 1;
const description = "Boodschappen";
const sidenote ="Doe boodschappen";
const startDate = new Date();
//deadline morgen te laten zijn
const deadline = addDays(startDate,1);

test("given: valid task parameters; when: creating a task;then: a task with the correct parameters is created;", () => {
    //when:
    const task = new Task({id,description,sidenote,startDate, endDate: null,deadline, status:true, priority:null})
    //then:
    expect(task.getId()).toEqual(id);
    expect(task.getDescription()).toEqual(description);
    expect(task.getSidenote()).toEqual(sidenote);
    expect(task.getStartDate().toLocaleDateString()).toEqual(startDate.toLocaleDateString());
    expect(task.getEndDate()).toEqual(null);
    expect(task.getDeadline().toLocaleDateString()).toEqual(deadline.toLocaleDateString());
    expect(task.getStatus()).toBeTruthy();
    expect(task.getPriority()).toEqual(null);
}) 

test("given: no description; when: creating a task; then: an error is thrown ", () => {
    //when:
    const task = () => {
        const task = new Task({id,description:"",sidenote,startDate, endDate: null,deadline, status:true, priority:null})
    };
    //then
    expect(task).toThrow("Description is required.");
})