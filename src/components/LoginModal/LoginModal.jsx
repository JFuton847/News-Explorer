import React, { useState, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, onLogin, isOpen, openRegisterModal }) => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginValues);
    console.log("Submitting login with:", loginValues);
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={loginValues.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={loginValues.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__buttons-container">
        <button type="submit" className="modal__submit">
          Sign in
        </button>
        <button
          type="button"
          className="modal__signup-other"
          onClick={openRegisterModal}
        >
          or <span style={{ color: "#2f80ed" }}>Sign up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
