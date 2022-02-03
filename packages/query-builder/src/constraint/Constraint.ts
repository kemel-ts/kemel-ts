import { ConstraintValue, Operator, Type } from ".";
import { Query } from "../query";
import { Raw } from "../raw";
import { Punctuation } from "../writer/punctuation";
import { Writer } from "../writer/writer";
import { ColumnValue, DefaultConstraint, QueryConstraint, RawValue, SubConstraint, ValueStore, ValueType } from "./constraint-value";

export class Constraint {
    private parentQuery: Query;
    type: Type;
    operator: Operator;
    leftValue: ConstraintValue;
    rightValues: ConstraintValue[] = [];
    
    constructor(query: Query, type: Type, value: ConstraintValue) {
        this.parentQuery = query;
        this.type = type;
        this.leftValue = value;        
    }

    get query() {
        return this.parentQuery;
    }

    private static fromType(query: Query, type: Type, value: any) {
        return new Constraint(query, Type.And, this.parseLeftValue(value));
    }

    static and(query: Query, value: any) {
        return this.fromType(query, Type.And, value);
    }

    static or(query: Query, value: any) {
        return this.fromType(query, Type.Or, value);
    }

    private static parseLeftValue(value: any) {
        return this.parseValue(value, true);
    }

    private static parseRightValue(value: any) {
        return this.parseValue(value, false);
    }

    private static parseValue(value: any, prioritizeColumn: boolean): ConstraintValue {
        if(typeof(value) === 'string') {
            if (prioritizeColumn) {
                return ColumnValue.fromString(value);
            }
            return new DefaultConstraint(value);
        }
        
        if(typeof(value) === 'object') {
            if(value instanceof Raw) return new RawValue(value);
            if(value instanceof Query) return new QueryConstraint(value);

            if(value instanceof ValueStore) {
                switch(value.type) {
                    case ValueType.Column: return ColumnValue.fromString(value.value);
                    default: return new DefaultConstraint(value);
                }
            }
        }

        if(typeof(value) === 'function') {
            const query = new Query();
            value(query);
            return new SubConstraint(query);            
        }
        
        return new DefaultConstraint(value);
    }

    private addValues(values: any[]) {
        values.forEach((value: any) => {
            this.rightValues.push(Constraint.parseRightValue(value));
        });
    }

    private addOperator(operator: Operator, values?: any[]) {
        this.operator = operator;
        values && this.addValues(values);
        return this.parentQuery;
    }

    equal(value: any): Query {
        return this.addOperator(Operator.Equal, [value]);
    }

    different(value: any): Query {
        return this.addOperator(Operator.Different, [value]);
    }

    greaterThan(value: any): Query {
        return this.addOperator(Operator.GreaterThan, [value]);
    }

    lessThan(value: any): Query {
        return this.addOperator(Operator.LessThan, [value]);
    }

    greaterThanOrEqual(value: any): Query {
        return this.addOperator(Operator.GreaterThanOrEqual, [value]);
    }

    lessThanOrEqual(value: any): Query {
        return this.addOperator(Operator.GreaterThanOrEqual, [value]);
    }

    between(startValue: any, endValue: any): Query {
        return this.addOperator(Operator.Between, [startValue, endValue]);
    }

    like(value: any): Query {
        return this.addOperator(Operator.Like, [value]);
    }

    notLike(value: any): Query {
        return this.addOperator(Operator.NotLike, [value]);
    }

    /*startsWith(...values: any[]): Query {
        return this.addOperator(Operators.StartsWith, values);
    }

    endsWith(...values: any[]): Query {
        return this.addOperator(Operators.EndsWith, values);
    }

    contains(...values: any[]): Query {
        return this.addOperator(Operators.Contains, values);
    }*/

    in(...values: any[]): Query {
        return this.addOperator(Operator.In, values);
    }

    notIn(...values: any[]): Query {
        return this.addOperator(Operator.NotIn, values);
    }

    isNull(): Query {
        return this.addOperator(Operator.IsNull, null);
    }

    isNotNull(): Query {
        return this.addOperator(Operator.IsNotNull, null);
    }

    write(writer: Writer, addType: boolean = true) {
        addType && writer.writeWithEndSpace(this.type);
        this.leftValue.write(writer);
        if(this.leftValue instanceof SubConstraint) return;
        
        writer.writeWithEndSpace(this.operator);
        switch(this.operator) {
            case Operator.IsNull:
            case Operator.IsNotNull:
                return;
            case Operator.Between:
                return this.writeBetween(writer);
            case Operator.In:
            case Operator.NotIn:
                return this.writeValues(writer);
            default:
                return this.rightValues[0].write(writer);
        }
    }

    private writeBetween(writer: Writer) {
        this.rightValues[0].write(writer);
        writer.writeWithEndSpace(Type.And); 
        this.rightValues[1].write(writer);
    }

    private writeValues(writer: Writer) {
        const internalWriter = new Writer();
        this.rightValues.forEach((value) => {
            value.write(internalWriter);
        });

        writer.write(Punctuation.OpenParenthesis);
        writer.writeWithEndSpace(
            internalWriter.sqlParts.join(`${Punctuation.Comma} `),
            internalWriter.parameters,
        );
        writer.writeWithEndSpace(Punctuation.CloseParenthesis);
    }

}