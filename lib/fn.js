'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var map = exports.map = function map(value, mapper) {
  return value && typeof value.map === 'function' ? value.map(mapper) : value !== undefined ? mapper(value) : value;
};

var forEach = exports.forEach = function forEach(value, iterator) {
  return value && typeof value.forEach === 'function' ? value.forEach(iterator) : value !== undefined ? iterator(value) : value;
};

var identity = exports.identity = function identity(entity) {
  return entity;
};

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};