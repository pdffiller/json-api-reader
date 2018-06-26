import { readAsLookup, readAsList } from '../src';

describe('readAsLookup', () => {
  test('should parse json-api message as lookups', () => {
    expect(
      readAsLookup(require('./__fixtures__/base'))
    ).toEqual(
      require('./__fixtures__/base-result')
    );
  });

  test('should parse json-api message as lists', () => {
    expect(
      readAsList(require('./__fixtures__/base'))
    ).toEqual(
      require('./__fixtures__/base-result-list')
    );
  });

  test('should parse json-api message 2 as lists', () => {
    Math.random = jest.fn(
      () => 0.1234567890987654321
    );
    expect(
      readAsList(require('./__fixtures__/channels'))
    ).toEqual(
      require('./__fixtures__/channels-result')
    );
  });
});
