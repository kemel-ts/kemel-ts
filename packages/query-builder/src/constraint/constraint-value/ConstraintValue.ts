import { Writer } from "../../writer";

export interface ConstraintValue {
  write(writer: Writer);
}