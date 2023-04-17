import StringValidator from './validators/StringValidator';

class Validator {
  constructor() {
    this.vlidators = {
      string: StringValidator,
    };
  }

  string() {
    const CurValidator = this.vlidators.string;
    return new CurValidator();
  }
}

export default Validator;
