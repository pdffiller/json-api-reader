import { compose, map, identity, isNotEmptyObject } from '../fn';
import { transduceItems, filterKeys } from '../fn-obj';
import { toSnakeCase } from '../snake-case';
import { mergeReducer, tfilter, tmap } from '../fn-trans';
import { toObj, toArray } from './helpers';


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

const getRelationData = (source, refs, attrs) => (_, key) => ({
  [getName(attrs, key)]: { data: map(source[key], toRelation(getName(refs, key))), },
});

const buildRelations = (refs, attrs, source) => transduceItems(
  refs, mergeReducer, {},
  tfilter((_, key) => source[key] !== undefined),
  tfilter(identity),
  tmap(getRelationData(source, refs, attrs))
);

const addRefs = (attrs, refs) => ([source, dest]) => [source, {
  ...dest,
  relationships: buildRelations(refs, attrs, source),
}];

const buildAttrs = (source, attrs, exclude) => transduceItems(
  attrs, mergeReducer, {},
  tfilter((_, key) => attrs[key] && exclude.indexOf(key) < 0),
  tmap((_, key) => ({ [getName(attrs, key)]: source[key], }))
);

const addAttrs = (attrs, exclude) => ([source, dest]) => [source, {
  ...dest,
  attributes: buildAttrs(source, toObj(attrs || Object.keys(source)), exclude)
}];

const readDest = ([, dest]) => filterKeys(dest, isNotEmptyObject);

export const jsonApiEntity = ({ type, refs, attrs }) => compose(
  readDest,
  addRefs(toObj(attrs), toObj(refs)),
  addAttrs(attrs, toArray(refs).concat('id')),
  addType(toSnakeCase(type)),
  packSource
);
