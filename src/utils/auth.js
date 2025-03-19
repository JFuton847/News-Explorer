export const authorize = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve the stored user object

    if (storedUser) {
      // Check both email and password
      if (storedUser.email === email && storedUser.password === password) {
        resolve({ token: "a fake token" });
      } else {
        reject(new Error("Invalid email or password"));
      }
    } else {
      reject(new Error("User not found"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve the stored user object
    if (storedUser) {
      resolve({
        data: {
          name: storedUser.username,
          email: storedUser.email,
          _id: "fake-id",
        },
      });
    } else {
      reject(new Error("User not found"));
    }
  });
};

export const signup = (values) => {
  return new Promise((resolve) => {
    console.log("Fake signup successful with values:", values);
    localStorage.setItem("user", JSON.stringify(values)); // Store user data in localStorage
    resolve({ success: true });
  });
};
