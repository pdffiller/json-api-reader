export const map = (value, mapper) => (
  value && typeof value.map === 'function' ? value.map(mapper) :
  value !== undefined ? mapper(value) :
  value
);

export const forEach = (value, iterator) => (
  value && typeof value.forEach === 'function' ? value.forEach(iterator) :
  value !== undefined ? iterator(value) :
  value
);

export const identity = entity => entity;

export const compose = (...fns) => fns.reduce(
  (f, g) => (...args) => f(g(...args))
);

export const getFrom = obj => prop => obj[prop];

export const getAllOrBy = obj => propOrIndex => (
  propOrIndex == null ? obj : obj[propOrIndex]
);

export const mapValues = mapper => obj => Object.keys(obj).reduce(
  (list, key) => list.concat(mapper(obj[key], key)), []
);

export const delProp = (obj, prop) => {
  const nObj = { ...obj };
  delete nObj[prop];
  return nObj;
};

export const addProp = (prop, checker) => (obj, value) => (
  checker(value) ? Object.assign(obj, { [prop]: value }) : obj
);

export const isObject = obj => (
  Object.prototype.toString.call(obj) === '[object Object]'
);

export const isEmptyObject = obj => (
  isObject(obj) && Object.keys(obj).length === 0
);

export const isNotEmptyObject = obj => (
  !isObject(obj) || Object.keys(obj).length > 0
);
