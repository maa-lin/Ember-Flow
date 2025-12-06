export class Todo {
    id: string;
    text: string;
    isDone: boolean;

    constructor(text: string, ) {
        this.id = crypto.randomUUID();
        this.text = text;
        this.isDone = false;
    }
};

export type Todos = {
    focus: Todo[],
    selfCare: Todo[]
};
