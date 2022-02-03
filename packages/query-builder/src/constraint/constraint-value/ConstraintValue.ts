import { Writer } from "../../writer/writer";

export interface ConstraintValue {
    write(writer: Writer);
}