import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CordovaShare from '../cordovaShare';

const wechatIcon = require('./images/wechat.png');
const wechatArticleIcon = require('./images/wechat_article.png');
const qqIcon = require('./images/qq.png');
const qqZoneIcon = require('./images/qq_zone.png');
const weiboIcon = require('./images/weibo.png');

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.2rem',
    background: '#fff',
    borderRadius: '0.1rem',
  },
  item: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.1rem',
    color: '#999',
    fontSize: '0.26rem',
  },
  icon: {
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    margin: '0.1rem',
  },
};

class ShareButtons extends Component {
  constructor(props) {
    super(props);
    const { title, description, image, onClose, onError } = props;
    this.shareData = {
      title: title || '',
      description: description || '',
      image,
      success: (result) => {
        onClose({
          success: true,
          result,
        });
      },
      ...onError ? { error: onError } : null,
    };
  }

  checkShareImage = () => {
    const promise = new Promise((resolve, reject) => {
      const { image } = this.shareData;
      if (image) {
        resolve(this.shareData);
      } else {
        try {
          if (!navigator.screenshot) {
            throw new Error('Please install the plugin: cordova-screenshot.');
          }

          const { quality } = this.props;
          navigator.screenshot.URI((error, res) => {
            if (error) {
              reject(error);
            } else {
              console.log('==CordovaScreenshot==', res);
              resolve({
                ...this.shareData,
                image: res.URI,
              });
            }
          }, quality || 100);
        } catch (error) {
          console.error('CordovaScreenshot error:', error);
        }
      }
    });
    return promise;
  }

  handleError = (error) => {
    const { onError } = this.props;
    if (onError) {
      onError(error);
    } else {
      console.error('ShareButtons error:', error);
    }
  }

  SharePlatform = {
    wechat_friend: {
      id: 'wechat_friend',
      title: '微信好友',
      icon: wechatIcon,
      onClick: async () => {
        try {
          const shareData = await this.checkShareImage();
          CordovaShare.wechat(shareData, 'friend', 'image');
        } catch (error) {
          this.handleError(error);
        }
      },
    },
    wechat_article: {
      id: 'wechat_article',
      title: '朋友圈',
      icon: wechatArticleIcon,
      onClick: async () => {
        try {
          const shareData = await this.checkShareImage();
          CordovaShare.wechat(shareData, 'article', 'image');
        } catch (error) {
          this.handleError(error);
        }
      },
    },
    qq_friend: {
      id: 'qq_friend',
      title: 'QQ好友',
      icon: qqIcon,
      onClick: async () => {
        try {
          const shareData = await this.checkShareImage();
          CordovaShare.qq(shareData, 'friend', 'image');
        } catch (error) {
          this.handleError(error);
        }
      },
    },
    qq_article: {
      id: 'qq_article',
      title: 'QQ空间',
      icon: qqZoneIcon,
      onClick: async () => {
        try {
          const shareData = await this.checkShareImage();
          CordovaShare.qq(shareData, 'article', 'image');
        } catch (error) {
          this.handleError(error);
        }
      },
    },
    weibo: {
      id: 'weibo',
      title: '新浪微博',
      icon: weiboIcon,
      onClick: async () => {
        try {
          const shareData = await this.checkShareImage();
          CordovaShare.weibo(shareData, 'article', 'image');
        } catch (error) {
          this.handleError(error);
        }
      },
    },
  }

  renderButton = (shareTypes) => {
    const buttons = shareTypes.map((type) => {
      const data = this.SharePlatform[type] || {};
      return (
        <div style={styles.item} key={data.id} onClick={data.onClick}>
          <img src={data.icon} style={styles.icon} />
          <div>{data.title}</div>
        </div>
      );
    });
    return buttons;
  }


  render() {
    const { shareTypes } = this.props;

    return (
      <div style={styles.container}>
        {
          this.renderButton(shareTypes)
        }
      </div>
    );
  }
}

ShareButtons.PropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  shareTypes: PropTypes.array,
  quality: PropTypes.number,
  image: PropTypes.any,
  onClose: PropTypes.func,
  onError: PropTypes.func,
};

export default ShareButtons;
