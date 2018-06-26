import { map } from './fn';
import { toCamelCase, toCamelCaseKeys } from './camel-case';

export const $type = Symbol('__$type');
const readRelation = ({ id }) => id;
const rndId = () => Math.random().toFixed(20).slice(2);

const readRelationships = relationships => Object.keys(relationships).reduce(
  (rel, key) => Object.assign(rel, {
    [toCamelCase(key)]: map(relationships[key].data, readRelation),
  }), {}
);

export const readEntity = ({ id, type, attributes, relationships }) => Object.assign(
  { id: id || rndId(), [$type]: type },
  attributes != null ? toCamelCaseKeys(attributes) : null,
  relationships != null ? readRelationships(relationships) : null
);
