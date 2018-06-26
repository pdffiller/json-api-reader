import { mapKeys } from './fn';

const lowerCase = str => str.toLowerCase();
const upperCase = str => str.toUpperCase();

export const toCamelCase = str => str
  .replace(/[\s_-](.)/g, upperCase)
  .replace(/[\s_-]/g, '')
  .replace(/^(.)/, lowerCase);

export const toCamelCaseKeys = mapKeys(toCamelCase);
