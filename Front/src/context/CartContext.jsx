import { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "@ionic/storage";

const storage = new Storage();

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const init = async () => {
      await storage.create();
      const saved = await storage.get("cart");
      if (saved) setCart(saved);
    };
    init();
  }, []);

  const addToCart = async (device) => {
    const exists = cart.find((d) => d.id === device.id);
    const newCart = exists
      ? cart.map((d) =>
          d.id === device.id ? { ...d, qty: d.qty + 1 } : d
        )
      : [...cart, { ...device, qty: 1 }];
    setCart(newCart);
    await storage.set("cart", newCart);
  };

  const removeFromCart = async (id) => {
    const newCart = cart.filter((d) => d.id !== id);
    setCart(newCart);
    await storage.set("cart", newCart);
  };

  const clearCart = async () => {
    setCart([]);
    await storage.set("cart", []);
  };

  const total = cart.reduce((sum, d) => sum + d.precio * d.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
