export const login = (username, password) => {
  if (username === "admin" && password === "1234") {
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

export const logout = () => {
  localStorage.removeItem("auth");
};