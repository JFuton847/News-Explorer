import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, onLogin, isOpen, openRegisterModal }) => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (!isOpen) {
      setLoginValues({
        email: "",
        password: "",
      });
      setErrors({ email: "", password: "" }); // Clear errors when modal closes
    }
  }, [isOpen]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      loginValues.email.length >= 5 &&
        loginValues.email.length <= 80 &&
        loginValues.password.length >= 8
    );
  }, [loginValues]);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (loginValues.email.length < 5 || loginValues.email.length > 80) {
      newErrors.email = "Email must be between 5 and 80 characters.";
      isValid = false;
    }

    if (loginValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setLoginValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear the specific error when the user starts typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    onLogin(loginValues);
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
        {errors.email && <p className="modal__error-message">{errors.email}</p>}
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
        {errors.password && (
          <p className="modal__error-message">{errors.password}</p>
        )}
      </label>

      <div className="modal__buttons-container">
        <button
          type="submit"
          className={`modal__submit ${
            isFormValid ? "modal__submit--active" : ""
          }`}
          onClick={handleSubmit}
        >
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
