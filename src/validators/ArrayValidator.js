import _ from 'lodash';

class ArrayValidator {
  constructor(ops) {
    this.ops = ops ?? [];
  }

  required() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => Array.isArray(value)];
    this.ops = newOps;

    return new ArrayValidator(newOps);
  }

  sizeOf(size) {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value.length === size];
    this.ops = newOps;

    return new ArrayValidator(newOps);
  }

  isValid(string) {
    return this.ops.reduce((acc, op) => (acc ? op(string) : false), true);
  }
}

export default ArrayValidator;
