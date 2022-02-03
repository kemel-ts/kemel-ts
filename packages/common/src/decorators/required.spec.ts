import { expect } from "chai";
import { describe, it } from "mocha";
import { isRequired, required } from "./required";

class Tst1 {

  @required()
  reqProp: number;

  @required(true)
  otherReqProp: number;

  @required(false)
  unneededProp: number;

  forgetProp: number;
}

describe('decorators', () => {
  describe('required', () => {
    it('should works all required value', () => {
      const obj = new Tst1();
      const message = (key) => `wrong decoration value for ${key} prop`;

      expect(isRequired(obj, 'reqProp'), message('reqProp')).to.be.true;
      expect(isRequired(obj, 'otherReqProp'), message('otherReqProp')).to.be.true;
      expect(isRequired(obj, 'unneededProp'), message('unneededProp')).to.be.false;
      expect(isRequired(obj, 'forgetProp'), message('forgetProp')).to.be.false;
    });
  });
});