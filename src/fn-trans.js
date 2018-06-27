import { compose } from './fn';

export const mergeReducer = (state, item) => Object.assign({}, state, item);
export const concatReducer = (state, item) => state.concat(item);
export const pushReducer = (state, item) => {
  state.push(item);
  return state;
};

export const tmap = mapper => reducer => (state, ...args) => reducer(
  state, mapper(...args)
);

export const tfilter = filter => reducer => (state, ...args) => (
  filter(...args) ? reducer(state, ...args) : state
);

export const createTransduce = reduce => (collection, reducer, initialState, ...transducers) =>
  reduce(
    collection,
    transducers.length > 0 ? compose(...transducers)(reducer) : reducer,
    initialState
  );

export const reduceList = (list, reducer, initialState) => (
  list.reduce(reducer, initialState)
);

export const transduce = createTransduce(reduceList);
