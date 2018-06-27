import { transduce, mergeReducer, tmap } from '../fn-trans';

const keyTrue = key => ({ [key]: true });
const arrayToObj = arr => transduce(arr, mergeReducer, {}, tmap(keyTrue));

export const toObj = obj => (
  typeof obj === 'string' ? { [obj]: true } :
  Array.isArray(obj) ? arrayToObj(obj) :
  typeof obj === 'object' ? obj :
  {}
);

export const toArray = obj => (
  typeof obj === 'string' ? [obj] :
  Array.isArray(obj) ? obj :
  typeof obj === 'object' ? Object.keys(obj) :
  []
);
