'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntitiesLookup = exports.fillLookup = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _fn = require('./fn');

var _entities = require('./entities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var addEntityToLookup = function addEntityToLookup(entities) {
  return function (entity) {
    var type = entity[_entities.$type];
    var e = (0, _assign2['default'])({}, entity);
    delete e[_entities.$type];
    entities[type] = entities[type] || {};
    entities[type][entity.id] = e;
    return entity;
  };
};

var fillLookup = exports.fillLookup = function fillLookup(entities) {
  return entities != null ? addEntityToLookup(entities) : _fn.identity;
};

var createEntitiesLookup = exports.createEntitiesLookup = function createEntitiesLookup() {
  var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    get: function () {
      function get() {
        return all;
      }

      return get;
    }(),
    fill: fillLookup(all)
  };
};