import { ConstraintValue } from "..";
import { Writer } from "../../writer";

export class DefaultConstraint implements ConstraintValue {
  value: any;

  constructor(value: any) {
    this.value = value;
  }

  write(writer: Writer) {
    writer.writeWithBeginSpace(writer.nextParameterName(), [this.value]);
  }
}
