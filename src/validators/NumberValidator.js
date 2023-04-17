import _ from 'lodash';

const isNaN = (value) => value !== +value;

class NumberValidator {
  constructor(ops) {
    this.ops = ops ?? [];
  }

  required() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => typeof value === 'number' && !isNaN(value)];
    this.ops = newOps;

    return new NumberValidator(newOps);
  }

  positive() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value > 0];
    this.ops = newOps;

    return new NumberValidator(newOps);
  }

  range(min, max) {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value >= min && value <= max];
    this.ops = newOps;

    return new NumberValidator(newOps);
  }

  isValid(string) {
    return this.ops.reduce((acc, op) => (acc ? op(string) : false), true);
  }
}

export default NumberValidator;
