import { createContext, useState } from "react";

const AuthContext = createContext(null);

// localStorage থেকে initial value সরাসরি নাও — useEffect লাগবে না
const getInitialUser = () => {
  try {
    const saved = localStorage.getItem("ut_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  return localStorage.getItem("ut_token") || null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("ut_token", authToken);
    localStorage.setItem("ut_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ut_token");
    localStorage.removeItem("ut_user");
  };

  const isAdmin = user?.role === "admin";
  const isDeveloper = user?.role === "developer";
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAdmin,
        isDeveloper,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
