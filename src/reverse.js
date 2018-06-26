import { compose, map, mapItems, identity, getFrom, mapValues, delProp, addProp } from './fn';
import { toSnakeCase } from './snake-case';


const packSource = source => [source, {}];

const addType = type => ([source, dest]) => [source, {
  ...dest,
  id: source.id,
  type
}];

const getName = (refs, key) => (
  typeof refs[key] === 'string' ? refs[key] : toSnakeCase(key)
);

const toRelation = type => id => ({ type, id });

const buildRelations = (refs, source) => (rels, key) => (
  Boolean(refs[key]) ? Object.assign(rels, {
    [toSnakeCase(key)]: { data: map(source[key], toRelation(getName(refs, key))) },
  }) : rels
);

const __addRefs = (refs, keys) => ([source, dest]) => [source, {
  ...dest,
  relationships: keys.reduce(buildRelations(refs, source), {}),
}];

const _addRefs = refs => {
  const keys = Object.keys(refs);
  return keys.length > 0 ? __addRefs(refs, keys) : identity;
};

const toObj = refs => (
  typeof refs === 'string' ? { [refs]: toSnakeCase(refs) } :
  Array.isArray(refs) ? refs.reduce(
    (nr, key) => Object.assign(nr, { [key]: toSnakeCase(key) }), {}
  ) :
  typeof refs === 'object' ? refs :
  {}
);

const toArray = refs => (
  typeof refs === 'string' ? [refs] :
  Array.isArray(refs) ? refs :
  typeof refs === 'object' ? Object.keys(refs) :
  []
);

const addRefs = compose(_addRefs, toObj);

const readDest = ([, dest]) => dest;

const buildAttrs = (attrs, exclude) => mapItems(
  key => (exclude.includes(key) || !attrs[key] ? null : getName(attrs, key)),
  identity
);

const addAttrs = (attrs, exclude) => ([source, dest]) => [source, {
  ...dest,
  attributes: buildAttrs(toObj(attrs || Object.keys(source)), exclude)(source)
}];

export const jsonApiEntity = ({ type, refs, attrs }) => compose(
  readDest,
  addRefs(refs),
  addAttrs(attrs, toArray(refs).concat('id')),
  addType(toSnakeCase(type)),
  packSource
);

const buildMapper = (mappers, entities, type) => (
  entities && entities[type]
    ? compose(mappers[type], getFrom(entities[type]))
    : mappers[type]
);

const addIncluded = addProp('included', included => included && included.length > 0);

const getIncluded = (mappers, entities, values) => mapValues(
  (items, type) => map(items, buildMapper(mappers, entities, type))
)(values);

export const jsonApiMessage = (mappers, mainType) => (values, entities) => addIncluded(
  {
    data: map(values[mainType], buildMapper(mappers, entities, mainType)),
  },
  getIncluded(mappers, entities, delProp(values, mainType))
);
