const lowerCase = str => str.toLowerCase();
const upperCase = str => str.toUpperCase();

export const toCamelCase = str => str
  .replace(/[\s_-](.)/g, upperCase)
  .replace(/[\s_-]/g, '')
  .replace(/^(.)/, lowerCase);


export const toCamelCaseKeys = obj => Object.keys(obj).reduce(
  (nObj, key) => Object.assign(nObj, { [toCamelCase(key)]: obj[key] }),
  {}
);
