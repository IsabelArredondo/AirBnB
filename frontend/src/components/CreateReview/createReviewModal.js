import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './index';

function ReviewFormModal({spotId1}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    
      <button onClick={() => setShowModal(true)}>Add A Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          
          <CreateReview spotId1={spotId1} />
           <button onClick={() => setShowModal(false)}>Go Back to spot!</button> 
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;