import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  onClose,
  onRegister,
  isOpen,
  openLoginModal,
  isRegistrationComplete, // Receive success state
  setIsRegistrationComplete, // Receive setter for the success state
}) => {
  const [createUserValues, setCreateUserValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form fields when modal is closed
      setCreateUserValues({ email: "", password: "", username: "" });
      setErrors({ email: "", password: "", username: "" });
      setIsRegistrationComplete(false); // Reset the success state when modal is closed
    }
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      createUserValues.email.length >= 5 &&
        createUserValues.email.length <= 80 &&
        createUserValues.password.length >= 8 &&
        createUserValues.username.length >= 5 &&
        createUserValues.username.length <= 25
    );
  }, [createUserValues]);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", username: "" };

    if (
      createUserValues.email.length < 5 ||
      createUserValues.email.length > 80
    ) {
      newErrors.email = "Email must be between 5 and 80 characters.";
      isValid = false;
    }

    if (createUserValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    if (
      createUserValues.username.length < 5 ||
      createUserValues.username.length > 25
    ) {
      newErrors.username = "Username must be between 5 and 25 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setCreateUserValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error message when user starts typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsSubmitting(true);

    onRegister(createUserValues).finally(() => setIsSubmitting(false)); // Make sure to stop the submission process
  };

  return (
    <ModalWithForm
      title={
        isRegistrationComplete
          ? "Registration successfully completed!"
          : "Register"
      }
      buttonText={
        isRegistrationComplete
          ? "Sign in"
          : isSubmitting
          ? "Submitting Registration..."
          : "Register"
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={isRegistrationComplete ? openLoginModal : handleSubmit}
    >
      {console.log("RegisterModal render", isRegistrationComplete)}
      {isRegistrationComplete ? (
        <div>
          <p>Registration successfully completed!</p>
        </div>
      ) : (
        <>
          <label htmlFor="register-email" className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              id="register-email"
              placeholder="Email"
              name="email"
              value={createUserValues.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="modal__error-message">{errors.email}</p>
            )}
          </label>

          <label htmlFor="register-password" className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              id="register-password"
              name="password"
              placeholder="Password"
              value={createUserValues.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="modal__error-message">{errors.password}</p>
            )}
          </label>

          <label htmlFor="username" className="modal__label">
            Username
            <input
              type="text"
              className="modal__input"
              id="username"
              placeholder="Username"
              name="username"
              value={createUserValues.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="modal__error-message">{errors.username}</p>
            )}
          </label>
        </>
      )}

      {!isRegistrationComplete && (
        <div className="modal__buttons-container">
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid ? "modal__submit--active" : ""
            }`}
          >
            {isSubmitting ? "Submitting Registration..." : "Sign up"}
          </button>
          <button
            type="button"
            className="modal__submit-other"
            onClick={openLoginModal}
          >
            or <span style={{ color: "#2f80ed" }}>Log in</span>
          </button>
        </div>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;
