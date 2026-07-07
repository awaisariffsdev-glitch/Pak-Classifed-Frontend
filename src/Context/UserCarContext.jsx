import { Children, createContext, useCallback, useState } from "react";
import { CarByUser } from "../Services/CarFetchUser";

export const UserCarContext = createContext();

export const UserCarProvider = ({ children }) => {
    const [userCars, setUserCar] = useState([]);
    const [carsLoading, setCarsLoading] = useState(false);
    const [carsError, setCarsError] = useState('');


    const fetchUserCars = useCallback(async (userId) => {
        if (!userId) {
            setUserCar([]);
            return;

        }
        setCarsLoading(true);
        setCarsError('')

        try {
            const data = await CarByUser(userId);
            setUserCar(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log(error);
            setCarsError('Could not loading Cars for user');
            setUserCar([]);
        }
        finally {
            setCarsLoading(false)
        }

    }, [])

    const clearUserCars = useCallback(() => {
        setUserCar([]);
        setCarsError('')
    },[])


    return (
        <>
            <UserCarContext.Provider value={{userCars, carsLoading, carsError, fetchUserCars, clearUserCars}}>
                {children}
            </UserCarContext.Provider>

        </>
    )
}

