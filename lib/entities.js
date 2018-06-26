'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readEntity = exports.$type = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _fn = require('./fn');

var _camelCase = require('./camel-case');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var $type = exports.$type = (0, _symbol2['default'])('__$type');
var readRelation = function readRelation(_ref) {
  var id = _ref.id;
  return id;
};
var rndId = function rndId() {
  return Math.random().toFixed(20).slice(2);
};

var readRelationships = function readRelationships(relationships) {
  return (0, _keys2['default'])(relationships).reduce(function (rel, key) {
    return (0, _assign2['default'])(rel, (0, _defineProperty3['default'])({}, (0, _camelCase.toCamelCase)(key), (0, _fn.map)(relationships[key].data, readRelation)));
  }, {});
};

var readEntity = exports.readEntity = function readEntity(_ref2) {
  var id = _ref2.id,
      type = _ref2.type,
      attributes = _ref2.attributes,
      relationships = _ref2.relationships;
  return (0, _assign2['default'])((0, _defineProperty3['default'])({ id: id || rndId() }, $type, type), attributes != null ? (0, _camelCase.toCamelCaseKeys)(attributes) : null, relationships != null ? readRelationships(relationships) : null);
};