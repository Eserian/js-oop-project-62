import _ from 'lodash';

class ObjectValidator {
  constructor(shape) {
    this.shapeObj = shape ?? {};
  }

  shape(newShape) {
    this.shapeObj = _.cloneDeep(newShape);
    return new ObjectValidator(_.cloneDeep(newShape));
  }

  isValid(obj) {
    return Object.entries(this.shapeObj).reduce((acc, [key, validator]) => {
      const value = obj[key];
      const isValid = validator.isValid(value);

      return acc ? isValid : false;
    }, true);
  }
}

export default ObjectValidator;
