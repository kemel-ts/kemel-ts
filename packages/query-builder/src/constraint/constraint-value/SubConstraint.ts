import { ConstraintValue } from "..";
import { Punctuation, Query } from "../..";
import { Writer } from "../../writer";

export class SubConstraint implements ConstraintValue {
  value: Query;

  constructor(value: Query) {
    this.value = value;
  }

  write(writer: Writer) {
    writer.writeWithBeginSpace(Punctuation.OpenParenthesis);
    this.value.writeConstraints(writer);
    writer.write(Punctuation.CloseParenthesis);
  }
}
