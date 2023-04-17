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

describe('validator number', () => {
  test('unrequired', () => {
    const schema = v.number();
    expect(schema.isValid(null)).toBe(true);
  });

  test('required', () => {
    const schema = v.number();
    schema.required();

    expect(schema.isValid(7)).toBe(true);
    expect(schema.isValid(null)).toBe(false);
  });

  test('positive', () => {
    const schema = v.number();
    schema.required();

    expect(schema.positive().isValid(10)).toBe(true);
  });

  test('range', () => {
    const schema = v.number();
    schema.range(-5, 5);

    expect(schema.isValid(-8)).toBe(false);
    expect(schema.isValid(5)).toBe(true);
  });
});
