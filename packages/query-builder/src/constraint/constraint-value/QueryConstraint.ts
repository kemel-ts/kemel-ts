import { ConstraintValue } from "..";
import { Punctuation, Query } from "../..";
import { Writer } from "../../writer";

export class QueryConstraint implements ConstraintValue {
  value: Query;

  constructor(value: Query) {
    this.value = value;
  }

  write(writer: Writer) {
    writer.writeWithBeginSpace(Punctuation.OpenParenthesis);
    this.value.write(writer);
    writer.write(Punctuation.CloseParenthesis);
  }
}