import { getAllOrBy } from './fn';

const fillResult = result => entity => {
  result.push(entity.id);
  return entity;
};

export const createResult = (res = []) => ({
  get: getAllOrBy(res),
  fill: fillResult(res),
});
