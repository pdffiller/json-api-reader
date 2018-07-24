import { map } from './fn';
import { mapItems, mapKeys } from './fn-obj';
import { toCamelCase } from './camel-case';

export const $type = Symbol('__$type');

const rndId = () => Math.random().toFixed(20).slice(2);

const toRelation = (value, key) => ({
  [toCamelCase(key)]: map(value.data, data => data && data.id)
});

export const readEntity = ({ id, type, attributes, relationships }) => ({
  id: id || rndId(),
  [$type]: toCamelCase(type),
  ...(attributes && mapKeys(attributes, toCamelCase)),
  ...(relationships && mapItems(relationships, toRelation))
});
