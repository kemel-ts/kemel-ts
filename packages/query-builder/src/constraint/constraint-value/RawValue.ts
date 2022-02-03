import { ConstraintValue } from "..";
import { Raw } from "../../raw";
import { Writer } from "../../writer";

export class RawValue implements ConstraintValue {
  value: Raw;

  constructor(value: Raw) {
    this.value = value;
  }

  write(writer: Writer) {
    writer.writeWithBeginSpace(this.value.value.toString());
  }

}