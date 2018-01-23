'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShareOverlay = require('./ShareOverlay');

var _ShareOverlay2 = _interopRequireDefault(_ShareOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var styles = {
  share: {
    position: 'relative',
    padding: '0.2rem'
  },
  shareButton: {
    background: '#fff',
    padding: '0.2rem',
    borderRadius: '0.1rem',
    border: '1px solid #f1f1f1',
    textAlign: 'center'
  }
};

var CordovaScreenshot = function (_Component) {
  _inherits(CordovaScreenshot, _Component);

  function CordovaScreenshot() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CordovaScreenshot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CordovaScreenshot.__proto__ || Object.getPrototypeOf(CordovaScreenshot)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showShare: false,
      image: null
    }, _this.handleClick = function () {
      try {
        if (!navigator.screenshot) {
          throw new Error('Please install the plugin: cordova-screenshot.');
        }

        var quality = _this.props.quality;

        navigator.screenshot.URI(function (error, res) {
          if (error) {
            console.error(error);
          } else {
            _this.setState({
              showShare: true,
              image: res.URI
            });
          }
        }, quality || 100);
      } catch (error) {
        console.error('CordovaScreenshot error:', error);
      }
    }, _this.handleClose = function (data) {
      var onClose = _this.props.onClose;

      _this.setState({
        showShare: false,
        data: null
      });
      onClose(data);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CordovaScreenshot, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          shareTypes = _props.shareTypes,
          onClose = _props.onClose,
          onError = _props.onError,
          children = _props.children;
      var _state = this.state,
          showShare = _state.showShare,
          image = _state.image;


      return _react2.default.createElement(
        'div',
        null,
        showShare ? _react2.default.createElement(_ShareOverlay2.default, { title: title, description: description, image: image, onClose: this.handleClose, onError: onError }) : null,
        _react2.default.createElement(
          'div',
          { style: styles.share, onClick: this.handleClick },
          children ? children : _react2.default.createElement(
            'div',
            { style: styles.shareButton },
            '\u5206\u4EAB'
          )
        )
      );
    }
  }]);

  return CordovaScreenshot;
}(_react.Component);

// CordovaScreenshot.PropTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   quality: PropTypes.number,
//   shareTypes: PropTypes.array,
//   onClose: PropTypes.func,
//   onError: PropTypes.func,
//   children: PropTypes.element,
// };

exports.default = CordovaScreenshot;