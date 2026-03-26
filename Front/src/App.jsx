import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Login from "./modules/Login";
import Home from "./modules/Home";
import Admin from "./modules/AdminPanel";
import Users from "./modules/Users";
import Cart from "./modules/Cart";
import PrivateRoute from "./routes/PrivateRoute";
import { CartProvider } from "./context/CartContext";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <CartProvider>
        <Router>
          <IonRouterOutlet>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/carrito"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </IonRouterOutlet>
        </Router>
      </CartProvider>
    </IonApp>
  );
}

export default App;



