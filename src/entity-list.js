import { $type } from './entities';
import { getAllOrBy } from './fn';

const fillList = entities => entity => {
  const type = entity[$type];
  const e = { ...entity };
  delete e[$type];
  entities[type] = entities[type] || [];
  entities[type].push(e);
  return entity;
};

export const createEntitiesList = (all = {}) => ({
  get: getAllOrBy(all),
  fill: fillList(all),
});
