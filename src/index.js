import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';
import ArrayValidator from './validators/ArrayValidator';
import ObjectValidator from './validators/ObjectValidator';

class Validator {
  constructor() {
    this.validators = {
      string: StringValidator,
      number: NumberValidator,
      array: ArrayValidator,
      object: ObjectValidator,
    };
    this.customRules = {
      string: null,
      number: null,
      array: null,
    };
  }

  string() {
    const CurValidator = this.validators.string;
    return new CurValidator(null, this.customRules.string);
  }

  number() {
    const CurValidator = this.validators.number;
    return new CurValidator(null, this.customRules.number);
  }

  array() {
    const CurValidator = this.validators.array;
    return new CurValidator(null, this.customRules.array);
  }

  object() {
    const CurValidator = this.validators.object;
    return new CurValidator(null, this.customRules.object);
  }

  addValidator(type, name, cb) {
    this.customRules = { ...this.customRules, [type]: { ...this.customRules[type], [name]: cb } };
  }
}

export default Validator;
