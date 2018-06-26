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

export const mapKeys = mapper => obj => Object.keys(obj).reduce(
  (nObj, key) => Object.assign(nObj, { [mapper(key)]: obj[key] }),
  {}
);

export const mapItems = (keyMapper, valueMapper) => obj => Object.keys(obj).reduce(
  (nObj, key) => {
    const newKey = keyMapper(key);
    if (newKey != null) {
      Object.assign(nObj, { [newKey]: valueMapper(obj[key], key) });
    }
    return nObj;
  },
  {}
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
