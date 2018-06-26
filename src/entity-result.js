import { identity } from './fn';


const addEntityId = result => entity => {
  result.push(entity.id);
  return entity;
};

export const fillResult = result => (
  Array.isArray(result) ? addEntityId(result) : identity
);

export const createResult = (res = []) => ({
  get: index => (index != null ? res[index] : res),
  fill: fillResult(res),
});
