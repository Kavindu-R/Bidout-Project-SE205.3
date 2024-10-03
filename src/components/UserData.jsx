// UserData.jsx
export const setUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserData = () => {
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const clearUserData = () => {
  localStorage.removeItem("userData");
};
