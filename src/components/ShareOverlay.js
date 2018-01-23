import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShareButtons } from './ShareButtons';

const styles = {
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
    flexDirection: 'column',
  },
  shareArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0.2rem',
  },
  shareFooter: {
    padding: '0.2rem',
  },
  shareButton: {
    background: '#fff',
    padding: '0.2rem',
    borderRadius: '0.1rem',
    border: '1px solid #f1f1f1',
    textAlign: 'center',
  },
};

class ShareOverlay extends Component {
  handleColose = () => {
    const { onClose } = this.props;
    onClose({
      success: false,
      result: 'User cancel the sharing',
    });
  }

  render() {
    const { title, description, shareTypes, onClose, image, onError } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.shareArea}>
          {
            <ShareButtons title={title} description={description} shareTypes={shareTypes || ['wechat_friend', 'wechat_article', 'qq_friend', 'qq_article', 'weibo']} image={image} onClose={onClose} onError={onError} />
          }
        </div>
        <div style={styles.shareFooter}>
          <div style={styles.shareButton} onClick={this.handleColose}>取消</div>
        </div>
      </div>
    );
  }
}

ShareOverlay.PropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  quality: PropTypes.number,
  shareTypes: PropTypes.array,
  onClose: PropTypes.func,
  onError: PropTypes.func,
};

export default ShareOverlay;
