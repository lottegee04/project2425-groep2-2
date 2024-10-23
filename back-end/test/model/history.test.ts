import { TaskHistory } from "../../model/taskhistory";
import { User } from "../../model/user";

//given user
const id = 1;
const username = 'JohnDoe';
const password ="password1234"
const user = new User({id,username,password});
test("given valid history parameters; when: creating a new history; then: a history is created with the right parameters;", () => {
    //when:
    const history = new TaskHistory({user});
    //then:
    expect(history.getUser()).toEqual(user);
    expect(history.getFinishedTasks()).toEqual([]);
})