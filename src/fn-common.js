import * as FnObj from './fn-obj';
import * as Fn from './fn';

export const map = (value, mapper) => (
  Fn.isObject(value) ? FnObj.mapValues(value, mapper) :
  Fn.map(value, mapper)
);
