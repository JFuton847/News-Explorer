import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import { authorize, checkToken, signup } from "../../utils/auth.js";
import Main from "../../components/Main/Main";
import SavedArticles from "../../components/SavedArticles/SavedArticles";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
    authorize(values)
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  };

  const fetchCurrentUser = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return Promise.reject("No token found");
    }

    return checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.error("Error fetching current user:", err);
      });
  };

  const isSavedArticlesPage = location.pathname === "/saved-articles";

  return (
    <div className="App">
      <div className="App__content">
        <Header
          setActiveModal={setActiveModal}
          onSearch={handleSearch}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          isSavedArticlesPage={isSavedArticlesPage}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/saved-articles"
            element={<SavedArticles currentUser={currentUser} />}
          />
        </Routes>
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
