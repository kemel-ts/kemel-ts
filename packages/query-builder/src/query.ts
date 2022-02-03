import { Constraint } from "./constraint";
import { Writer } from "./writer";

export class Query {

  constraints: Constraint[] = [];

  private addConstraint(constraint: Constraint) {
    this.constraints.push(constraint);
    return constraint;
  }

  whereObject(value: object): Query {
    Object.keys(value)
      .forEach((key) => {
        const propValue = value[key];
        Array.isArray(propValue) ?
          this.and(key).in(...propValue) :
          this.and(key).equal(propValue);
      })
    return this;
  }

  where(value: any): Constraint {
    return this.addConstraint(Constraint.and(this, value));
  }

  and(value: any): Constraint {
    return this.addConstraint(Constraint.and(this, value));
  }

  or(value: any): Constraint {
    return this.addConstraint(Constraint.or(this, value));
  }

  write(writer: Writer) {
    writer.write('---');
    this.writeConstraints(writer);
    writer.write('---');
  }

  writeConstraints(writer: Writer) {
    this.constraints.forEach((constraint, index) => constraint.write(writer, index !== 0));
  }
}