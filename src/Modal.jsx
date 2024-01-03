import { useState } from "react";
const Modal =({isOpen,closeModal,data}) => {
    const [modalOpen, setModalOpen] = useState(isOpen);
    const handleCloseModal = () => {
        setModalOpen(false);
        closeModal();
      };
      if (!modalOpen) return null;
    
    return (
        <div className="modal-overlay">
          <div className="modal">        
            <div className="modal-content">{data.encryptionKeys}</div>
            <div className="modal-content">{data.decryptionKeys}</div>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      );
}

export default Modal;