import {
  test, expect, beforeEach, describe,
} from '@jest/globals';
import Validator from '../src/Validator.js';

let v;

beforeEach(() => {
  v = new Validator();
});

describe('string', () => {
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

describe('number', () => {
  test('unrequired', () => {
    const schema = v.number();
    expect(schema.isValid(null)).toBe(true);
    expect(schema.positive().isValid(null)).toBe(true);
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
    expect(schema.positive().isValid(null)).toBe(false);
  });

  test('range', () => {
    const schema = v.number();
    schema.range(-5, 5);

    expect(schema.isValid(-8)).toBe(false);
    expect(schema.isValid(5)).toBe(true);
  });
});

describe('array', () => {
  test('unrequired', () => {
    const schema = v.array();
    expect(schema.isValid(null)).toBe(true);
  });

  test('required', () => {
    const schema = v.array();
    schema.required();

    expect(schema.isValid(['hexlet'])).toBe(true);
    expect(schema.isValid(null)).toBe(false);
  });

  test('sizeof', () => {
    const schema = v.array();
    schema.sizeof(2);

    expect(schema.isValid(['hexlet'])).toBe(false);
    expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true);
  });
});

describe('object', () => {
  test('shape', () => {
    const schema = v.object();

    schema.shape({
      name: v.string().required(),
      age: v.number().positive(),
    });

    expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
    expect(schema.isValid({ name: 'maya', age: null })).toBe(true);
    expect(schema.isValid({ name: '', age: null })).toBe(false);
    expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false);
  });
});

describe('custom', () => {
  test('strings', () => {
    const fn = (value, start) => value.startsWith(start);
    v.addValidator('string', 'startWith', fn);

    const schema = v.string().test('startWith', 'H');
    expect(schema.isValid('exlet')).toBe(false);
    expect(schema.isValid('Hexlet')).toBe(true);
  });
  test('numbers', () => {
    const fn = (value, min) => value >= min;
    v.addValidator('number', 'min', fn);

    const schema = v.number().test('min', 5);
    expect(schema.isValid(4)).toBe(false);
    expect(schema.isValid(6)).toBe(true);
  });
});
