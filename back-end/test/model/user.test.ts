import { Task } from "../../model/task";
import { User } from "../../model/user";
// given:
const id = 1;
const username = 'JohnDoe';
const password ="password1234"
const tasks: Task[] = [];

test("given: valid user parameters; when: creating a user; a user with the correct parameters is created;", () => {
    //when:
    const user = new User({id,username,password,tasks});
    //then:
    expect(user.getId()).toEqual(id);
    expect(user.getUsername()).toEqual(username);
    expect(user.getPassword()).toEqual(password);
    expect(user.getTasks()).toEqual(tasks);
}) 