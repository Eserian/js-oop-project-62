import _ from 'lodash';

class StringValidator {
  constructor(ops) {
    this.ops = ops ?? [];
  }

  required() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => !!value];
    this.ops = newOps;

    return new StringValidator(newOps);
  }

  contains(string) {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value.includes(string)];
    this.ops = newOps;

    return new StringValidator(newOps);
  }

  isValid(string) {
    return this.ops.reduce((acc, op) => (acc ? op(string) : false), true);
  }
}

export default StringValidator;
