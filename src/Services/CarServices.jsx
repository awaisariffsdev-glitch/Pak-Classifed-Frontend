// API service — fetches cars by category name from GET /car/category/:category
import axios from "axios"

export const carGetByCategory = async (category) => {
    const response =await axios.get(`https://pak-classifed-backend-production.up.railway.app/car/category/${category}`);
    return response.data.cars;
}