import { createContext, useContext, useState } from "react";
// import { UserContext } from "./UserContext";
import { UserCarContext } from "./UserCarContext";
import axios from "axios";
// import {fetchUserCars} from './'

export const CarUpdateContext = createContext();

export const CarUpdateProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { fetchUserCars } = useContext(UserCarContext);

    const updateCar = async (id, formData, userId) => {

        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");

            const response = await axios.put(`http://localhost:8080/car/update/${id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            if (userId) {
                await fetchUserCars(userId);

            }


            return {
                success: true,
                message: response.data.message,
            }

        } catch (err) {
            console.log(err);

            setError(
                err.response?.data?.message || "Failed to update car."
            );

            return {
                success: false,
                message:
                    err.response?.data?.message || "Failed to update car.",
            };

        } finally {
            setLoading(false)
        }
    }


    const deleteCar = async (id, userId) => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8080/car/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            if (userId) {
                await fetchUserCars(userId);
            }

            return {
                success: true,
                message: response.data.message
            }

        } catch (err) {
            console.log(err);

            setError(
                err.response?.data?.message || "Failed to delete car."
            );

            return {
                success: false,
                message:
                    err.response?.data?.message || "Failed to delete car.",
            };
        }
        finally {
            setLoading(false)
        }


    }
    return (
        <>
            <CarUpdateContext.Provider value={{ loading, error, updateCar, deleteCar }}>
                {children}
            </CarUpdateContext.Provider >

        </>
    )
}