import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignUpFormPage'
import './LoginForm.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='LogInBttn' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;