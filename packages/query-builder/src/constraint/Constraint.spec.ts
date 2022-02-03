import { expect } from "chai";
import { describe, it } from "mocha";
import { Constraint } from ".";
import { Query } from "../query";
import { Raw } from "../raw";
import { Writer } from "../writer/writer";
import { ValueStore } from "./constraint-value";

describe('Constraint', () => {
    const query = new Query();

    describe('AND', () => {
        it('should render a column name equals a numeric parameter', () => {
            const constraint = Constraint
                .and(query, 'tbName.colName');
            const param = 10;
            
            constraint.equal(param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND tbName.colName = $ ');
            expect(writer.parameters[0]).to.be.equal(param);
            expect(typeof(writer.parameters[0])).to.be.equal('number');
        });

        it('should render a column name equals a string parameter', () => {
            const constraint = Constraint
                .and(query, 'tbName.colName');
                const param = 'param01';
            
            constraint.equal(param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND tbName.colName = $ ');
            expect(writer.parameters[0]).to.be.equal(param);
            expect(typeof(writer.parameters[0])).to.be.equal('string');
        });

        it('should render a column name equals a date parameter', () => {
            const constraint = Constraint
                .and(query, 'tbName.colName');
                const param = new Date();
            
            constraint.equal(param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND tbName.colName = $ ');
            expect(writer.parameters[0]).to.be.equal(param);
            expect(writer.parameters[0] instanceof Date).to.be.true;
        });

        it('should render a column name equals a other column', () => {
            const constraint = Constraint
                .and(query, 'tbName.colName');
                const param = ValueStore.column('tb2.colName2');
            
            constraint.equal(param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND tbName.colName = tb2.colName2 ');
            expect(writer.parameters).to.be.empty;
        });

        it('should render a column name equals a raw value', () => {
            const constraint = Constraint
                .and(query, 'tbName.colName');
                const param = Raw.from('XR-KD()=');
            
            constraint.equal(param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND tbName.colName = XR-KD()= ');
            expect(writer.parameters).to.be.empty;
        });

        it('should render a column name equals a sub constraint', () => {
            const paramA = 10;
            const paramB = new Date();
            const param = function(q: Query) {
                q.and('tb1.colA').equal(paramA)
                    .and('tb1.colB').equal(paramB);
            };

            const constraint = Constraint
                .and(query, param);

            const writer = new Writer();
            constraint.write(writer);

            expect(writer.render()).to.be.equal('AND (tb1.colA = $ AND tb1.colB = $ ) ');
            expect(writer.parameters).to.be.lengthOf(2);

            expect(writer.parameters[0]).to.be.equal(paramA);
            expect(typeof(writer.parameters[0])).to.be.equal('number');

            expect(writer.parameters[1]).to.be.equal(paramB);
            expect(writer.parameters[1] instanceof Date).to.be.true;
        });
    });
});
