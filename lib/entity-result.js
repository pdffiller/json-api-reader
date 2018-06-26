'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createResult = exports.fillResult = undefined;

var _fn = require('./fn');

var addEntityId = function addEntityId(result) {
  return function (entity) {
    result.push(entity.id);
    return entity;
  };
};

var fillResult = exports.fillResult = function fillResult(result) {
  return Array.isArray(result) ? addEntityId(result) : _fn.identity;
};

var createResult = exports.createResult = function createResult() {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    get: function () {
      function get(index) {
        return index != null ? res[index] : res;
      }

      return get;
    }(),
    fill: fillResult(res)
  };
};