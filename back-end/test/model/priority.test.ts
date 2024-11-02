import { Priority } from "../../model/priority"

test("given valid priority parameters; when: creating a new priority; then: a priority is created with the right parameters;", () => {
    //given:
    const levelName = "basic"
    const colour = "green"
    //when:
    const basic = new Priority({levelName,colour})
    //then:
    expect(basic.getLevelName()).toEqual(levelName);
    expect(basic.getColour()).toEqual(colour);
})