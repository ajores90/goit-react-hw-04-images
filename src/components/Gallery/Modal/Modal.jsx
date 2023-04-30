import { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Modal = ({ onClose, largeImageUrl }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={clsx('Overlay')} onClick={handleBackdropClick}>
      <div className={clsx('Modal')}>
        <img src={largeImageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};

export default Modal;
