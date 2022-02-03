import { ConstraintValue } from "..";
import { Punctuation } from "../..";
import { Writer } from "../../writer";

export class ColumnValue implements ConstraintValue {
  table: string;
  column: string;
  constructor(table: string, column: string) {
    this.table = table;
    this.column = column;
  }

  static fromString(column: string) {
    const values = column.split(Punctuation.Dot);
    return values.length === 1 ?
      new ColumnValue(null, values[0]) :
      new ColumnValue(values[0], values[1]);
  }

  write(writer: Writer) {
    writer.writeSpace();
    if (this.table) {
      writer.write(this.table);
      writer.write(Punctuation.Dot);
    }
    writer.write(this.column);
  }

}