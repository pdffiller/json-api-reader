import { readEntity } from './entities';
import { forEach, compose } from './fn';
import { createEntitiesLookup } from './entity-lookup';
import { createResult } from './entity-result';
import { createEntitiesList } from './entity-list';
import { toCamelCaseKeys } from './camel-case';

const read = createEntities => ({ data, included, meta, links }) => {
  const entities = createEntities();
  const result = createResult();

  forEach(data, compose(entities.fill, result.fill, readEntity));
  forEach(included, compose(entities.fill, readEntity));

  return {
    entities: entities.get(),
    result: result.get(Array.isArray(data) ? null : 0),
    meta: meta && toCamelCaseKeys(meta),
    links: links && toCamelCaseKeys(links),
  };
};

export const readAsLookup = read(createEntitiesLookup);
export const readAsList = read(createEntitiesList);
