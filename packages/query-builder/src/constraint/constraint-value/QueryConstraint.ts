import { ConstraintValue } from "..";
import { Query } from "../../query";
import { Punctuation } from "../../writer/punctuation";
import { Writer } from "../../writer/writer";

export class QueryConstraint implements ConstraintValue {
    value: Query;
    
    constructor(value: Query) {
        this.value = value;
    }
    
    write(writer: Writer) {
        writer.write(Punctuation.OpenParenthesis);
        this.value.write(writer);
        writer.writeWithEndSpace(Punctuation.CloseParenthesis);
    }
}