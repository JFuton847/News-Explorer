import { useState } from "react";
import "./App.css";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import NewsCard from "../../components/NewsCard/NewsCard";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onRegister = (values) => {
    return signup(values)
      .then(() => {
        console.log("User registered successfully:", values);
        return onLogin({ email: values.email, password: values.password });
      })
      .catch((error) => {
        console.error("Error during registration or login:", error);
      });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (values) => {
    signin(values)
      .then((res) => {
        console.log("Login Respons:", res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("User logged in successfully:", res);
          setIsLoggedIn(true);
          closeActiveModal();
          return fetchCurrentUser();
        } else {
          throw new Error("No token received from server");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="App">
      <div className="App__content">
        <Header setActiveModal={setActiveModal} onSearch={handleSearch} />
        <About />
        <NewsCard />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
          openRegisterModal={openRegisterModal}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={onRegister}
          openLoginModal={openLoginModal}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
