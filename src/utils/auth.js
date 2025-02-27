export const authorize = (email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "James",
        email: "fake@example,com",
        _id: "fake-id",
      },
    });
  });
};

export const signup = (values) => {
  return new Promise((resolve) => {
    console.log("Fake signup successful with values:", values);
    resolve({ success: true });
  });
};
