import { Parameter } from "./parameter";

export class Writer {
    parameters: Parameter[] = [];
    sqlParts: string[] = [];

    writeWithEndSpace(sqlPart: string, parameters: Parameter[] = []) {
        this.sqlParts.push(sqlPart + ' ');
        this.parameters = [...this.parameters, ...parameters];
    }

    write(sqlPart: string, parameters: Parameter[] = []) {
        this.sqlParts.push(sqlPart);
        this.parameters = [...this.parameters, ...parameters];
    }

    render() {
        return this.sqlParts.join('');
    }

    nextParameterName() {        
        return '$';
    }

    
}