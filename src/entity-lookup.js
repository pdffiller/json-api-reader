import { $type } from './entities';
import { getAllOrBy } from './fn';

const fillLookup = entities => entity => {
  const type = entity[$type];
  const e = { ...entity };
  delete e[$type];
  entities[type] = entities[type] || {};
  entities[type][entity.id] = e;
  return entity;
};

export const createEntitiesLookup = (all = {}) => ({
  get: getAllOrBy(all),
  fill: fillLookup(all),
});
