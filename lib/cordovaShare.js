'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CordovaShare = function () {
  function CordovaShare() {
    _classCallCheck(this, CordovaShare);

    this.initData = {
      title: '',
      description: '',
      image: null,
      url: '',
      success: function success(_success) {
        console.log(_success || 'Share successful');
      },
      error: function error(_error) {
        console.error('Share failed', _error);
      }
    };
  }

  /**
  *
  * @param {object: 分享的数据} data
  * @param {string: friend/article, 好友/朋友圈} target
  * @param {string: image/link/page, 图片/链接/页面} type
  */


  _createClass(CordovaShare, [{
    key: 'wechat',
    value: function wechat(data) {
      var _this = this;

      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'friend';
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image';

      if (!Wechat || !Wechat.share) {
        return this.pluginCheckError('cordova-plugin-wechat');
      }

      var shareData = _extends({}, this.initData, data);

      switch (type) {
        case 'image':
          {
            return Wechat.share({
              message: {
                title: shareData.title,
                description: shareData.description,
                media: {
                  type: Wechat.Type.IMAGE,
                  image: shareData.image
                }
              },
              // 微信好友: Wechat.Scene.SESSION, 朋友圈: Wechat.Scene.TIMELINE
              scene: target === 'friend' ? Wechat.Scene.SESSION : Wechat.Scene.TIMELINE
            }, function () {
              shareData.success(_this.shareSuccessText('Wechat', type));
            }, function (failReason) {
              shareData.error(failReason);
            });
            break;
          }
        case 'page':
        case 'link':
          {
            Wechat.share({
              message: {
                title: shareData.title,
                description: shareData.description,
                media: {
                  type: type === 'page' ? Wechat.Type.WEBPAGE : Wechat.Type.LINK,
                  webpageUrl: shareData.url
                }
              },
              // 微信好友: Wechat.Scene.SESSION, 朋友圈: Wechat.Scene.TIMELINE
              scene: target === 'friend' ? Wechat.Scene.SESSION : Wechat.Scene.TIMELINE
            }, function () {
              shareData.success(_this.shareSuccessText('Wechat', type));
            }, function (failReason) {
              shareData.error(failReason);
            });
          }
        default:
          {
            this.canNotSupport('Wechat', type);
          }
      }
    }

    /**
    *
    * @param {object: 分享的数据} data
    * @param {string: friend/article, 好友/QQ空间} target
    * @param {string: image, 图片} type
    */

  }, {
    key: 'qq',
    value: function qq(data) {
      var _this2 = this;

      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'friend';
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image';

      if (!QQSDK) {
        return this.pluginCheckError('cordova-plugin-qqsdk');
      }

      var shareData = _extends({}, this.initData, data);

      switch (type) {
        case 'image':
          {
            QQSDK.shareImage(function () {
              shareData.success(_this2.shareSuccessText('QQ', type));
            }, function (failReason) {
              shareData.error(failReason);
            }, {
              client: QQSDK.ClientType.QQ,
              scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
              title: shareData.title,
              description: shareData.description,
              image: shareData.image
            });
            break;
          }
        case 'text':
          {
            QQSDK.shareText(function () {
              shareData.success(_this2.shareSuccessText('QQ', type));
            }, function (failReason) {
              shareData.error(failReason);
            }, {
              client: QQSDK.ClientType.QQ,
              scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
              text: shareData.title
            });
            break;
          }
        case 'page':
          {
            QQSDK.shareNews(function () {
              shareData.success(_this2.shareSuccessText('QQ', type));
            }, function (failReason) {
              shareData.error(failReason);
            }, {
              client: QQSDK.ClientType.QQ,
              scene: target === 'friend' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
              url: shareData.url,
              title: shareData.title,
              description: shareData.description,
              image: shareData.image
            });
            break;
          }
        default:
          {
            this.canNotSupport('QQ', type);
            break;
          }
      }
    }

    /**
    *
    * @param {object: 分享的数据} data
    * @param {string: article, 发享到微博} target
    * @param {string: image, 图片} type
    */

  }, {
    key: 'weibo',
    value: function weibo(data) {
      var _this3 = this;

      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'article';
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image';

      if (!WeiboSDK) {
        return this.pluginCheckError('cordova-plugin-weibosdk');
      }

      var shareData = _extends({}, this.initData, data);

      switch (type) {
        case 'image':
          {
            WeiboSDK.shareImageToWeibo(function () {
              shareData.success();
            }, function (failReason) {
              shareData.error(failReason);
            }, {
              image: shareData.image // Support types: network url image, base64(不支持base64比较大的数据)
            });
            break;
          }
        case 'text':
          {
            WeiboSDK.shareTextToWeibo(function () {
              shareData.success(_this3.shareSuccessText('Weibo', type));
            }, function (failReason) {
              shareData.error(failReason);
            }, { text: shareData.title });
            break;
          }
        case 'page':
          {
            WeiboSDK.shareToWeibo(function () {
              shareData.success(_this3.shareSuccessText('Weibo', type));
            }, function (failReason) {
              shareData.error(failReason);
            }, {
              title: shareData.title,
              description: shareData.description,
              url: shareData.url, // Support types: network url page
              image: shareData.image // Support types: network url image
            });
            break;
          }
        default:
          {
            this.canNotSupport('Weibo', type);
            break;
          }
      }
    }
  }, {
    key: 'pluginCheckError',
    value: function pluginCheckError(pluginName) {
      console.error('The plugin \'' + pluginName + '\' is not installed');
    }
  }, {
    key: 'canNotSupport',
    value: function canNotSupport(platform, type) {
      console.warn('Can not support to sharing ' + type + ' to ' + platform + ', please check!');
    }
  }, {
    key: 'shareSuccessText',
    value: function shareSuccessText(platform, type) {
      return 'Share ' + type + ' to ' + platform + ' successfully';
    }
  }]);

  return CordovaShare;
}();

var cordovaShare = new CordovaShare();
exports.default = cordovaShare;