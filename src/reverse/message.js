import { compose, map, getFrom, delProp } from '../fn';
import { transduceItems } from '../fn-obj';
import { tmap, concatReducer } from '../fn-trans';


const buildMapper = (mappers, entities, type) => (
  entities && entities[type]
    ? compose(mappers[type], getFrom(entities[type]))
    : mappers[type]
);

const mapItemsToEntities = (mappers, entities) => (
  (items, type) => map(items, buildMapper(mappers, entities, type))
);

const packSource = mappers => (values, entities) => [
  values, entities, mapItemsToEntities(mappers, entities), {}
];

const addData = (mappers, mainType) => ([values, entities, toEntities, dest]) => [
  values, entities, toEntities, {
    ...dest, data: toEntities(values[mainType], mainType),
  }
];

const addIncluded = (mappers, mainType) => ([values, entities, toEntities, dest]) => [
  values, entities, toEntities, {
    ...dest,
    included: transduceItems(
      delProp(values, mainType), concatReducer, [], tmap(toEntities)
    ),
  }
];

const readDest = ([,,, { data, included }]) => (
  included.length > 0 ? { data, included } : { data }
);

export const jsonApiMessage = (mappers, mainType) => compose(
  readDest,
  addIncluded(mappers, mainType),
  addData(mappers, mainType),
  packSource(mappers),
);
