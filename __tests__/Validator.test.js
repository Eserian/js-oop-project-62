import {
  test, expect, beforeEach, describe,
} from '@jest/globals';
import Validator from '../src/Validator';

let v;

beforeEach(() => {
  v = new Validator();
});

describe('validator strings', () => {
  test('unrequired', () => {
    const schema = v.string();
    expect(schema.isValid('')).toBe(true);
    expect(schema.isValid(null)).toBe(true);
  });

  test('required', () => {
    const schema = v.string();
    schema.required();

    expect(schema.isValid('what does the fox say')).toBe(true);
    expect(schema.isValid(null)).toBe(false);
  });

  test('contains', () => {
    const schema = v.string();
    schema.required();

    expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);
  });
});
