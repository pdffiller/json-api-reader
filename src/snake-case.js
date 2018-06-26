import { mapKeys } from './fn';

export const toSnakeCase = str => str
  .replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase())
  .replace(/^_+/g, '');

export const toSnakeCaseKeys = mapKeys(toSnakeCase);
