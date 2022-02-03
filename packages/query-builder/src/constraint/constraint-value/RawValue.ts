import { ConstraintValue } from "..";
import { Raw } from "../../raw";
import { Writer } from "../../writer/writer";

export class RawValue implements ConstraintValue {
    value: Raw;
    
    constructor(value: Raw) {
        this.value = value;
    }
    
    write(writer: Writer) {
        writer.writeWithEndSpace(this.value.value.toString());
    }

}