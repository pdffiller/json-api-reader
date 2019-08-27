import * as FnCommon from './fn-common';
import { compose, isObject, getFrom } from './fn';
import { filterKeys } from './fn-obj';


export const map = (entityName, mapper) => data => ({
  ...data,
  entities: {
    ...data.entities,
    [entityName]: FnCommon.map(data.entities[entityName], mapper(data)),
  },
});

export const getValue = from => (
  isObject(from)
    ? getFrom(from)
    : id => from.find(entity => entity.id === id)
);

export const populate = (field, from, asField = field) => data => {
  const getEntity = getValue(data.entities[from]);
  return entity => ({
    ...entity,
    [asField]: getEntity(entity[field]),
  });
};

export const prune = (filter = () => true) => () => {
  return entity => filterKeys(entity, filter);
};

const composeMappers2 = (mapperA, mapperB) => data => compose(
  mapperA(data),
  mapperB(data),
);

export const composeMappers = (...mappers) => mappers.reduce(
  composeMappers2
);
