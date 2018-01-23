'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cordovaShare = require('../cordovaShare');

var _cordovaShare2 = _interopRequireDefault(_cordovaShare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var wechatIcon = require('./images/wechat.png');
var wechatArticleIcon = require('./images/wechat_article.png');
var qqIcon = require('./images/qq.png');
var qqZoneIcon = require('./images/qq_zone.png');
var weiboIcon = require('./images/weibo.png');

var styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.2rem',
    background: '#fff',
    borderRadius: '0.1rem'
  },
  item: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.1rem',
    color: '#999',
    fontSize: '0.26rem'
  },
  icon: {
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    margin: '0.1rem'
  }
};

var ShareButtons = function (_Component) {
  _inherits(ShareButtons, _Component);

  function ShareButtons(props) {
    _classCallCheck(this, ShareButtons);

    var _this = _possibleConstructorReturn(this, (ShareButtons.__proto__ || Object.getPrototypeOf(ShareButtons)).call(this, props));

    _initialiseProps.call(_this);

    var title = props.title,
        description = props.description,
        image = props.image,
        onClose = props.onClose,
        onError = props.onError;

    _this.shareData = _extends({
      title: title || '',
      description: description || '',
      image: image,
      success: function success(result) {
        onClose({
          success: true,
          result: result
        });
      }
    }, onError ? { error: onError } : null);
    return _this;
  }

  _createClass(ShareButtons, [{
    key: 'render',
    value: function render() {
      var shareTypes = this.props.shareTypes;


      return _react2.default.createElement(
        'div',
        { style: styles.container },
        this.renderButton(shareTypes)
      );
    }
  }]);

  return ShareButtons;
}(_react.Component);

// ShareButtons.PropTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   shareTypes: PropTypes.array,
//   quality: PropTypes.number,
//   image: PropTypes.any,
//   onClose: PropTypes.func,
//   onError: PropTypes.func,
// };

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.checkShareImage = function () {
    var promise = new Promise(function (resolve, reject) {
      var image = _this2.shareData.image;

      if (image) {
        resolve(_this2.shareData);
      } else {
        try {
          if (!navigator.screenshot) {
            throw new Error('Please install the plugin: cordova-screenshot.');
          }

          var quality = _this2.props.quality;

          navigator.screenshot.URI(function (error, res) {
            if (error) {
              reject(error);
            } else {
              console.log('==CordovaScreenshot==', res);
              resolve(_extends({}, _this2.shareData, {
                image: res.URI
              }));
            }
          }, quality || 100);
        } catch (error) {
          console.error('CordovaScreenshot error:', error);
        }
      }
    });
    return promise;
  };

  this.handleError = function (error) {
    var onError = _this2.props.onError;

    if (onError) {
      onError(error);
    } else {
      console.error('ShareButtons error:', error);
    }
  };

  this.SharePlatform = {
    wechat_friend: {
      id: 'wechat_friend',
      title: '微信好友',
      icon: wechatIcon,
      onClick: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var shareData;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this2.checkShareImage();

                case 3:
                  shareData = _context.sent;

                  _cordovaShare2.default.wechat(shareData, 'friend', 'image');
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  _this2.handleError(_context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[0, 7]]);
        }));

        return function onClick() {
          return _ref.apply(this, arguments);
        };
      }()
    },
    wechat_article: {
      id: 'wechat_article',
      title: '朋友圈',
      icon: wechatArticleIcon,
      onClick: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var shareData;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _this2.checkShareImage();

                case 3:
                  shareData = _context2.sent;

                  _cordovaShare2.default.wechat(shareData, 'article', 'image');
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  _this2.handleError(_context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[0, 7]]);
        }));

        return function onClick() {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    qq_friend: {
      id: 'qq_friend',
      title: 'QQ好友',
      icon: qqIcon,
      onClick: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var shareData;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _this2.checkShareImage();

                case 3:
                  shareData = _context3.sent;

                  _cordovaShare2.default.qq(shareData, 'friend', 'image');
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](0);

                  _this2.handleError(_context3.t0);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[0, 7]]);
        }));

        return function onClick() {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    qq_article: {
      id: 'qq_article',
      title: 'QQ空间',
      icon: qqZoneIcon,
      onClick: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var shareData;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _this2.checkShareImage();

                case 3:
                  shareData = _context4.sent;

                  _cordovaShare2.default.qq(shareData, 'article', 'image');
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](0);

                  _this2.handleError(_context4.t0);

                case 10:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2, [[0, 7]]);
        }));

        return function onClick() {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    weibo: {
      id: 'weibo',
      title: '新浪微博',
      icon: weiboIcon,
      onClick: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var shareData;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _this2.checkShareImage();

                case 3:
                  shareData = _context5.sent;

                  _cordovaShare2.default.weibo(shareData, 'article', 'image');
                  _context5.next = 10;
                  break;

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5['catch'](0);

                  _this2.handleError(_context5.t0);

                case 10:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this2, [[0, 7]]);
        }));

        return function onClick() {
          return _ref5.apply(this, arguments);
        };
      }()
    }
  };

  this.renderButton = function (shareTypes) {
    var buttons = shareTypes.map(function (type) {
      var data = _this2.SharePlatform[type] || {};
      return _react2.default.createElement(
        'div',
        { style: styles.item, key: data.id, onClick: data.onClick },
        _react2.default.createElement('img', { src: data.icon, style: styles.icon }),
        _react2.default.createElement(
          'div',
          null,
          data.title
        )
      );
    });
    return buttons;
  };
};

exports.default = ShareButtons;