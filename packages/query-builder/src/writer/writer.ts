import { Parameter } from ".";
import { Punctuation } from "..";

export class Writer {
  parameters: Parameter[] = [];
  sqlParts: string[] = [];

  write(sqlPart: string, parameters: Parameter[] = []) {
    this.sqlParts.push(sqlPart);
    this.parameters = [...this.parameters, ...parameters];
  }

  writeSpace() {
    this.sqlParts.push(Punctuation.Space);
  }

  writeWithEndSpace(sqlPart: string, parameters: Parameter[] = []) {
    this.write(sqlPart, parameters);
    this.writeSpace();
  }

  writeWithBeginSpace(sqlPart: string, parameters: Parameter[] = []) {
    this.writeSpace();
    this.write(sqlPart, parameters);
  }

  render() {
    return this.sqlParts.join('');
  }

  nextParameterName() {
    return '$';
  }
}
