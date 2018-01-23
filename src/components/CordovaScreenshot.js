import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ShareOverlay from './ShareOverlay';

const styles = {
  share: {
    position: 'relative',
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

class CordovaScreenshot extends Component {
  state = {
    showShare: false,
    image: null,
  }

  handleClick = () => {
    try {
      if (!navigator.screenshot) {
        throw new Error('Please install the plugin: cordova-screenshot.');
      }

      const { quality } = this.props;
      navigator.screenshot.URI((error, res) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({
            showShare: true,
            image: res.URI,
          });
        }
      }, quality || 100);
    } catch (error) {
      console.error('CordovaScreenshot error:' , error);
    }
  }

  handleClose = (data) => {
    const { onClose } = this.props;
    this.setState({
      showShare: false,
      data: null,
    });
    onClose(data);
  }

  render() {
    const { title, description, shareTypes, onClose, onError, children } = this.props;
    const { showShare, image } = this.state;

    return (
      <div>
        { showShare ? <ShareOverlay title={title} description={description} image={image} onClose={this.handleClose} onError={onError} /> : null }
        <div style={styles.share} onClick={this.handleClick}>
          {
            children ? children : <div style={styles.shareButton}>分享</div>
          }
        </div>
      </div>
    );
  }
}

// CordovaScreenshot.PropTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   quality: PropTypes.number,
//   shareTypes: PropTypes.array,
//   onClose: PropTypes.func,
//   onError: PropTypes.func,
//   children: PropTypes.element,
// };

export default CordovaScreenshot;
