import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        async function validateSession() {
            try {
                const response = await axios.get("http://localhost:3000/api/user/me", {
                    withCredentials: true,
                });
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } catch {
                localStorage.removeItem("user");
                setUser(null);
            }
        }

        validateSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
