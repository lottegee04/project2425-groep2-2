export class Priority{
    private levelName: string;
    private colour: string;

    constructor(priority : {levelName: string; colour: string}) {
        this.levelName = priority.levelName;
        this.colour = priority.colour;
    }

    getLevelName(): string {
        return this.levelName;
    }
    getcolour(): string {
        return this.colour;
    }
}