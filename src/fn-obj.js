import { createTransduce, mergeReducer, tmap, tfilter } from './fn-trans';
import { compose } from './fn';


export const reduceList = (list, reducer, initialState) => (
  list.reduce(reducer, initialState)
);

export const reduceItems = (obj, reducer, initialState) => Object.keys(obj).reduce(
  (state, key) => reducer(state, obj[key], key, obj),
  initialState !== undefined ? initialState : {}
);

export const transduceItems = createTransduce(reduceItems);

export const keyMapper = mapper => (value, key) => ({ [mapper(key)]: value });
export const valueMapper = mapper => (value, key) => ({ [key]: mapper(value) });

const tKeyMapper = compose(tmap, keyMapper);
const tValueMapper = compose(tmap, valueMapper);

export const mapKeys = (obj, mapper) => transduceItems(
  obj, mergeReducer, {}, tKeyMapper(mapper)
);

export const mapValues = (obj, mapper) => transduceItems(
  obj, mergeReducer, {}, tValueMapper(mapper)
);

export const mapItems = (obj, mapper) => transduceItems(
  obj, mergeReducer, {}, tmap(mapper)
);

export const buildItem = (value, key) => ({ [key]: value });

export const filterKeys = (obj, filter) => transduceItems(
  obj, mergeReducer, {}, tfilter(filter), tmap(buildItem)
);
