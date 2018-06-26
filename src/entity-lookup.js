import { identity } from './fn';
import { $type } from './entities';

const addEntityToLookup = entities => entity => {
  const type = entity[$type];
  const e = { ...entity };
  delete e[$type];
  entities[type] = entities[type] || {};
  entities[type][entity.id] = e;
  return entity;
};

export const fillLookup = entities => (
  entities != null ? addEntityToLookup(entities) : identity
);

export const createEntitiesLookup = (all = {}) => ({
  get: () => all,
  fill: fillLookup(all),
});
