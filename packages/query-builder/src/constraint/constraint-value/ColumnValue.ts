import { ConstraintValue } from "..";
import { Punctuation } from "../../writer/punctuation";
import { Writer } from "../../writer/writer";

export class ColumnValue implements ConstraintValue {
    table: string;
    column: string;
    constructor(table: string, column: string) {
        this.table = table;
        this.column = column;
    }
    
    static fromString(column: string) {
        const values = column.split('.');
        return values.length === 1 ?
            new ColumnValue(null, values[0]) :
            new ColumnValue(values[0], values[1]);
    }
    
    write(writer: Writer) {
        if(this.table) {
            writer.write(this.table);
            writer.write(Punctuation.Dot);
        }
        writer.writeWithEndSpace(this.column);
    }

}