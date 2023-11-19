import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.modules.css';

class Modal extends Component {
  handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className="Overlay" onClick={this.handleBackdropClose}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  largeImageURL: 'https://picsum.photos/100%/260',
  tags: 'This is a default image. I am sorry, the image you searched is not available.',
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
