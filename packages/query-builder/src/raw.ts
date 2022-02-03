export class Raw {
    value: string;
    constructor(value: string) {
        this.value = value;
    }

    static from(value: string) {
        return new Raw(value);
    }
}
