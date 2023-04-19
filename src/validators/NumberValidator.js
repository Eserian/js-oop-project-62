import _ from 'lodash';

const isNaN = (value) => value !== +value;

class NumberValidator {
  constructor(ops, customRules) {
    this.ops = ops ?? [];
    this.customRules = customRules ?? {};
  }

  required() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => typeof value === 'number' && !isNaN(value)];
    this.ops = newOps;

    return new NumberValidator(newOps);
  }

  positive() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => typeof value !== 'number' || value > 0];
    this.ops = newOps;

    return new NumberValidator(newOps, this.customRules);
  }

  range(min, max) {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value >= min && value <= max];
    this.ops = newOps;

    return new NumberValidator(newOps, this.customRules);
  }

  isValid(value) {
    return this.ops.reduce((acc, op) => (acc ? op(value) : false), true);
  }

  test(name, arg) {
    const fn = this.customRules[name];

    if (!fn) {
      throw new Error(`No custom rule with name ${name}`);
    }

    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => !!fn(value, arg)];
    this.ops = newOps;

    return new NumberValidator(newOps, this.customRules);
  }
}

export default NumberValidator;
