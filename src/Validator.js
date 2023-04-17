import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';
import ArrayValidator from './validators/ArrayValidator';

class Validator {
  constructor() {
    this.validators = {
      string: StringValidator,
      number: NumberValidator,
      array: ArrayValidator,
    };
  }

  string() {
    const CurValidator = this.validators.string;
    return new CurValidator();
  }

  number() {
    const CurValidator = this.validators.number;
    return new CurValidator();
  }

  array() {
    const CurValidator = this.validators.array;
    return new CurValidator();
  }
}

export default Validator;
