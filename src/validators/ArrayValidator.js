import _ from 'lodash';

class ArrayValidator {
  constructor(ops, customRules) {
    this.ops = ops ?? [];
    this.customRules = customRules ?? {};
  }

  required() {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => Array.isArray(value)];
    this.ops = newOps;

    return new ArrayValidator(newOps, this.customRules);
  }

  sizeOf(size) {
    const clonedOps = _.cloneDeep(this.ops);
    const newOps = [...clonedOps, (value) => value.length === size];
    this.ops = newOps;

    return new ArrayValidator(newOps, this.customRules);
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

    return new ArrayValidator(newOps, this.customRules);
  }
}

export default ArrayValidator;
