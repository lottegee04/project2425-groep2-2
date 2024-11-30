import { Priority as PriorityPrisma } from '@prisma/client';

export class Priority{
    private id?: number;
    private levelName: string;
    private colour: string;

    constructor(priority : {levelName: string; colour: string}) {
        this.levelName = priority.levelName;
        this.colour = priority.colour;
    }

    getLevelName(): string {
        return this.levelName;
    }
    getColour(): string {
        return this.colour;
    }
    getId(): number | undefined {
        return this.id;
    }

    static from({levelName, colour}: PriorityPrisma){
        return new Priority({levelName, colour});
    }
}