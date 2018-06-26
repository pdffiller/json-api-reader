'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readAsList = exports.readAsLookup = undefined;

var _entities = require('./entities');

var _fn = require('./fn');

var _entityLookup = require('./entity-lookup');

var _entityResult = require('./entity-result');

var _entityList = require('./entity-list');

var read = function read(createEntities) {
  return function (_ref) {
    var data = _ref.data,
        included = _ref.included;

    var entities = createEntities();
    var result = (0, _entityResult.createResult)();

    (0, _fn.forEach)(data, (0, _fn.compose)(entities.fill, result.fill, _entities.readEntity));
    (0, _fn.forEach)(included, (0, _fn.compose)(entities.fill, _entities.readEntity));

    return {
      entities: entities.get(),
      result: result.get(Array.isArray(data) ? null : 0)
    };
  };
};

var readAsLookup = exports.readAsLookup = read(_entityLookup.createEntitiesLookup);
var readAsList = exports.readAsList = read(_entityList.createEntitiesList);