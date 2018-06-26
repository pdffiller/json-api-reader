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
