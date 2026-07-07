// import axios from "axios";
// import { createContext, useCallback, useState } from "react";

// export const UpdateContext = createContext({
//     updateUser: async () => { },
//     loading: false,
//     error: null
// });


// export default function UpdateProvider({ children }) {
//     // const [updateUser, setUpdateUser] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);


//     const updateUser = useCallback(async (userId, formData) => {
//         setLoading(true);
//             setError(null);

//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.put(`http://localhost:8080/user/update/${userId}`,
//                 formData,

//                 {
//                     // method: "PUT",
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     // formData
//                 }
//             );
//             // if (!response.ok) {
//             //     throw new Error(`Request failed with status code ${response.status}`);
//             // }
//             const result = await response.data;
//             const updatedUser = result.User;

//             localStorage.setItem("User", json.stringify(updatedUser));
//             return result;

//         } catch (err) {
//             console.error("Update error:", err);
//             setError(err.message);
//             throw err;
//         }
//         finally{
//             setLoading(false)
//         }
//     },[]);

//     return(
//         <>
//         <UpdateContext.Provider value={{updateUser,loading,error}}>
//             {children}
//         </UpdateContext.Provider>
        
//         </>
//     )
// }


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
                `http://localhost:8080/user/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = response.data;
            // BUG (fixed): `await response.data` — response.data is already a
            // plain object, not a Promise. Awaiting it was harmless but
            // pointless. Removed the redundant `await`.

            const updatedUser = result.user;
            // BUG (fixed): was `result.User` (capital U). The backend sends
            // back `{ message: ..., user: userFindByIdAndUpdate }` — lowercase
            // `user`. Capital `User` doesn't exist on the response, so this
            // was always `undefined`, meaning nothing useful ever got saved
            // to localStorage even when the request succeeded.

            localStorage.setItem("user", JSON.stringify(updatedUser));
            // BUG (fixed) — THE MAIN CRASH: `json.stringify` — lowercase
            // `json` is never defined or imported anywhere in this file. This
            // threw `ReferenceError: json is not defined` on every single
            // call, even after a fully successful 200 response from the
            // backend. Because this throw happens inside the `try` block,
            // execution jumps to `catch`, `setError(...)` runs, and the
            // error is re-thrown — which is exactly why `EditProfileModal`'s
            // `await updateUser(...)` always rejected and showed
            // "Failed to update profile", and why `setCurrent(result.user)`
            // in EditProfileModal (which runs AFTER this call) never
            // executed — starving both UserContext and the navbar of the
            // updated name. Fixed to the global `JSON.stringify` and the
            // corrected lowercase key.

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