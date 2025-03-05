import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegistrationCompleteModal = ({ isOpen, onClose, openLoginModal }) => {
  return (
    <ModalWithForm
      title=""
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={openLoginModal}
    >
      <div className="modal__header-container">
        <h2 className="modal__header">Registration Successful!</h2>
        <button
          type="button"
          className="modal__registration-complete-other"
          onClick={openLoginModal}
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegistrationCompleteModal;
