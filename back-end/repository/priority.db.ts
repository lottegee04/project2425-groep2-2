import { Priority } from "../model/priority";

const allPriorities = [
    new Priority({levelName:"basic", colour:"success"}),
    new Priority({levelName:"neutral", colour: "warning"}),
    new Priority({levelName:"urgent", colour: "danger"})
]

const getAllPriorities= (): Priority[] => {
    return allPriorities
}

const getPriorityByName = ({levelName}: {levelName: string}): Priority | null => {
    return allPriorities.find((priority) => priority.getLevelName() === levelName) || null;
}

export default{
    getAllPriorities,
    getPriorityByName
}