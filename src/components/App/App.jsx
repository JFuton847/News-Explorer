import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegistrationCompleteModal from "../../components/RegistrationCompleteModal/RegistrationCompleteModal";
import { authorize, checkToken, signup } from "../../utils/auth.js";
import Main from "../../components/Main/Main";
import SavedArticles from "../../components/SavedArticles/SavedArticles";
import { getItems } from "../../utils/api"; // Import the function

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Handle search query
  const [articles, setArticles] = useState([]); // Store search results
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(""); // Error message for validation
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query on input
    setError(""); // Reset error on input change
  };

  const fetchArticles = async (query) => {
    if (!query) {
      setError("Please enter a keyword");
      return;
    }
    setLoading(true);
    try {
      const data = await getItems(query); // Fetch articles using the query
      if (data.length === 0) {
        setError("Nothing Found");
      }
      setArticles(data); // Store articles in state
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    fetchArticles(searchQuery); // Fetch articles when user submits a search
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openRegistrationCompleteModal = () => {
    setActiveModal("RegistrationComplete");
  };

  const onRegister = (values) => {
    return signup(values)
      .then(() => {
        console.log("User registered successfully:", values);
        setIsRegistrationComplete(true); // Ensure state updates after successful registration
        openRegistrationCompleteModal();
      })
      .catch((error) => {
        console.error("Error during registration or login:", error);
      });
  };

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
          onSearch={handleSearch} // Pass search handler
          onSearchSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          isSavedArticlesPage={isSavedArticlesPage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                articles={articles}
                onSearchSubmit={handleSearchSubmit}
                loading={loading}
                error={error}
              />
            }
          />
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
        <RegistrationCompleteModal
          isOpen={activeModal === "RegistrationComplete"}
          onClose={closeActiveModal}
          openLoginModal={openLoginModal}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
