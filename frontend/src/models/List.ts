export class ListItem {
    id: string;
    text: string;
    isDone: boolean;

    constructor(text: string, ) {
        this.id = crypto.randomUUID();
        this.text = text;
        this.isDone = false;
    }
};

export type Lists = {
    focus: ListItem[],
    selfCare: ListItem[]
};
