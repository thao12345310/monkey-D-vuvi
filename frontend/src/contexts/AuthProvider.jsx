import React, { createContext, useContext, useState } from "react";

// Tạo Context
const AuthContext = createContext();

// Provider chính
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    // (Tuỳ chọn) Lưu vào localStorage nếu muốn giữ login khi reload
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // (Tuỳ chọn) Lấy lại từ localStorage nếu người dùng đã login trước đó
  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để dùng
export const useAuth = () => useContext(AuthContext);
