import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';

class Validator {
  constructor() {
    this.validators = {
      string: StringValidator,
      number: NumberValidator,
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
}

export default Validator;
