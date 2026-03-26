import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Storage } from "@ionic/storage";

const storage = new Storage();

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = cargando

  useEffect(() => {
    const check = async () => {
      await storage.create();
      const user = await storage.get("user");
      setAuth(!!user);
    };
    check();
  }, []);

  if (auth === null) return null; // cargando sesión
  return auth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
