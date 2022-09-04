import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [open, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        current location data
      </button>
      <ReactModal isOpen={open}>
        <h2>Modal</h2>
        <button type="button" onClick={() => setIsOpen(false)}>close</button>
      </ReactModal>
    </div>

  );
};

export default Modal;
