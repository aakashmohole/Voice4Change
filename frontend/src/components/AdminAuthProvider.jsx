import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user || user?.user.user_type !== "ADMIN") {
    return <Login />;
  }

  return <>{children}</>;
}

export default AdminAuthProvider;
