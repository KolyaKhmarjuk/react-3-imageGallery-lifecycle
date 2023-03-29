import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toogleModal();
    }
  };

  render() {
    const { onModal, largeImage } = this.props;

    return createPortal(
      <div className={s.modal} onClick={onModal}>
        <div className={s.modal_img}>
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modalRef
    );
  }
}

Modal.propTypes = {
  onModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
