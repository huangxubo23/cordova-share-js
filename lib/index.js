"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareButtons = exports.CordovaScreenshot = undefined;

var _cordovaShare = require("./cordovaShare");

var _cordovaShare2 = _interopRequireDefault(_cordovaShare);

var _CordovaScreenshot = require("./components/CordovaScreenshot");

var _CordovaScreenshot2 = _interopRequireDefault(_CordovaScreenshot);

var _ShareButtons = require("./components/ShareButtons");

var _ShareButtons2 = _interopRequireDefault(_ShareButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");

/**
 * 分享方法
 */
exports.default = _cordovaShare2.default;

/**
 * 分享组件
 */

exports.CordovaScreenshot = _CordovaScreenshot2.default;
exports.ShareButtons = _ShareButtons2.default;