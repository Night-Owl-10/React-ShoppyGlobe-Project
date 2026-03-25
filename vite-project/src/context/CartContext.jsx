import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    async function fetchCart() {
        if (!user) {
            setCartItems([]);
            return;
        }
        try {
            const response = await axios.get("http://localhost:3000/api/cart", { withCredentials: true });
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.log("Error fetching cart:", error);
            setCartItems([]);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
}
