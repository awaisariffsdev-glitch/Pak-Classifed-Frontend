// User update context — provides updateUser API call to modify profile data with auth token
import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const UpdateContext = createContext({
    updateUser: async () => { },
    loading: false,
    error: null
});


export default function UpdateProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = useCallback(async (userId, formData) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `https://pak-classifed-backend-production.up.railway.app/user/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = response.data;
           

            const updatedUser = result.user;
           

            localStorage.setItem("user", JSON.stringify(updatedUser));
          

            return result;

        } catch (err) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <UpdateContext.Provider value={{ updateUser, loading, error }}>
            {children}
        </UpdateContext.Provider>
    );
}