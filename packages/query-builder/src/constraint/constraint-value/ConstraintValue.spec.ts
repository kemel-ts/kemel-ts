import { expect } from "chai";
import { describe, it } from "mocha";
import { ColumnValue, DefaultConstraint, QueryConstraint, RawValue } from ".";
import { Query } from "../../query";
import { Raw } from "../../raw";
import { Writer } from "../../writer/writer";

describe('ConstraintValue', () => {
    describe('ColumnValue', () => {
        it('should render a column', () => {
            const writer = new Writer();
            const value = ColumnValue.fromString('columnName');
            value.write(writer);

            expect(writer.render()).to.be.equal('columnName ');
        });

        it('should render a column with table', () => {
            const writer = new Writer();
            const value = ColumnValue.fromString('tableName.columnName');
            value.write(writer);

            expect(writer.render()).to.be.equal('tableName.columnName ');
        });
    });

    describe('DefaultConstraint', () => {
        it('should render a parameter and store the number', () => {
            const writer = new Writer();
            const value =  new DefaultConstraint(1);
            value.write(writer);

            expect(writer.render()).to.be.equal('$ ');
            expect(writer.parameters[0]).to.be.equal(1);
        });

        it('should render a parameter and store the date', () => {
            const NOW = new Date();
            const writer = new Writer();
            const value =  new DefaultConstraint(NOW);
            value.write(writer);

            expect(writer.render()).to.be.equal('$ ');
            expect(writer.parameters[0]).to.be.equal(NOW);
        });

        it('should render a parameter and store the string', () => {
            const NOW = new Date();
            const writer = new Writer();
            const value =  new DefaultConstraint('value');
            value.write(writer);

            expect(writer.render()).to.be.equal('$ ');
            expect(writer.parameters[0]).to.be.equal('value');
        });
    });

    describe('QueryConstraint', () => {
        it('should render a sub query', () => {
            const writer = new Writer();
            const value =  new QueryConstraint(new Query());
            value.write(writer);

            expect(writer.render()).to.be.equal('(--- ---) ');
        });
    });

    describe('RawValue', () => {
        it('should render a raw string', () => {
            const writer = new Writer();
            const value =  new RawValue(new Raw('test'));
            value.write(writer);

            expect(writer.render()).to.be.equal('test ');
        });
    });
});
