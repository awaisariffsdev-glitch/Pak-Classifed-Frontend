// Auth context — provides user state, login/logout functions, and persists session to localStorage
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => { },
    loggedIn: false,
    setLoggodIn: () => { },
    logout: () => { },
    

})

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggodIn] = useState(false);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser != "undefined") {
            try {
                setCurrent(JSON.parse(storedUser))
            } catch (error) {
                console.log("Invalid user data in localStorage, clearing it");
                localStorage.removeItem("user");
            }

            if (token&&token!="undefined") {
                setLoggodIn(true)
            }
        }
    }, [])


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setCurrent(null)
        setLoggodIn(false)
    }


    return (
        <>
            <UserContext.Provider value={{
                user,
                setUser,
                loggedIn,
                setLoggodIn,
                logout,
                setCurrent,
                current
            }}>
                {children}
            </UserContext.Provider>

        </>
    )
}