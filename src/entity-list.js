import { identity } from './fn';
import { $type } from './entities';


const addEntityToList = entities => entity => {
  const type = entity[$type];
  const e = { ...entity };
  delete e[$type];
  entities[type] = entities[type] || [];
  entities[type].push(e);
  return entity;
};

export const fillEntitiesList = entities => (
  entities != null ? addEntityToList(entities) : identity
);

export const createEntitiesList = (all = {}) => ({
  get: () => all,
  fill: fillEntitiesList(all),
});
