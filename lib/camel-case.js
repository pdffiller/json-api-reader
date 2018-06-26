'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCamelCaseKeys = exports.toCamelCase = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var lowerCase = function lowerCase(str) {
  return str.toLowerCase();
};
var upperCase = function upperCase(str) {
  return str.toUpperCase();
};

var toCamelCase = exports.toCamelCase = function toCamelCase(str) {
  return str.replace(/[\s_-](.)/g, upperCase).replace(/[\s_-]/g, '').replace(/^(.)/, lowerCase);
};

var toCamelCaseKeys = exports.toCamelCaseKeys = function toCamelCaseKeys(obj) {
  return (0, _keys2['default'])(obj).reduce(function (nObj, key) {
    return (0, _assign2['default'])(nObj, (0, _defineProperty3['default'])({}, toCamelCase(key), obj[key]));
  }, {});
};