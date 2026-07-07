import { createContext, useCallback, useState } from "react";

export const CarRefreshContext = createContext();


export const CarRefreshProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);


    const triggerRefresh = useCallback(() => {
        setRefreshKey((prev) => prev + 1);
    }, [])


    return (
        <>
            <CarRefreshContext.Provider value={{refreshKey,triggerRefresh}}>
                {children}
            </CarRefreshContext.Provider>

        </>
    )
}