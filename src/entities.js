import { map } from './fn';
import { mapItems, mapKeys } from './fn-obj';
import { toCamelCase } from './camel-case';

export const $type = Symbol('__$type');
export const $meta = '__$meta';

const rndId = () => Math.random().toFixed(20).slice(2);

const toRelation = (value, key) => ({
  [toCamelCase(key)]: map(value.data, data => data && data.id),
});

export const readEntity = ({ id, type, attributes, relationships, meta }) => ({
  id: id || rndId(),
  [$type]: toCamelCase(type),
  ...(meta && { [$meta]: meta }),
  ...(attributes && mapKeys(attributes, toCamelCase)),
  ...(relationships && mapItems(relationships, toRelation)),
});
