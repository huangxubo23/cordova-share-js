'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShareButtons = require('./ShareButtons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var styles = {
  container: {
    position: 'fixed',
    zIndex: 9999,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(51, 51, 51, 0.5)',
    display: 'flex',
    flexDirection: 'column'
  },
  shareArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0.2rem'
  },
  shareFooter: {
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

var ShareOverlay = function (_Component) {
  _inherits(ShareOverlay, _Component);

  function ShareOverlay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShareOverlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShareOverlay.__proto__ || Object.getPrototypeOf(ShareOverlay)).call.apply(_ref, [this].concat(args))), _this), _this.handleColose = function () {
      var onClose = _this.props.onClose;

      onClose({
        success: false,
        result: 'User cancel the sharing'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShareOverlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          shareTypes = _props.shareTypes,
          onClose = _props.onClose,
          image = _props.image,
          onError = _props.onError;


      return _react2.default.createElement(
        'div',
        { style: styles.container },
        _react2.default.createElement(
          'div',
          { style: styles.shareArea },
          _react2.default.createElement(_ShareButtons.ShareButtons, { title: title, description: description, shareTypes: shareTypes || ['wechat_friend', 'wechat_article', 'qq_friend', 'qq_article', 'weibo'], image: image, onClose: onClose, onError: onError })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.shareFooter },
          _react2.default.createElement(
            'div',
            { style: styles.shareButton, onClick: this.handleColose },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }]);

  return ShareOverlay;
}(_react.Component);

// ShareOverlay.PropTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   quality: PropTypes.number,
//   shareTypes: PropTypes.array,
//   onClose: PropTypes.func,
//   onError: PropTypes.func,
// };

exports.default = ShareOverlay;