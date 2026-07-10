// export default async function GetCars() {
//     try {
//         const token = localStorage.getItem("token");

//         const response = await fetch("http://localhost:8080/car/findAll", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
//         if (!response.ok) {

//         }


//         const json =await response.json();
//     } catch (error) {

//     }

// }

// API service — fetches all cars from GET /car/findAll with toast notifications
import { toast } from "react-toastify";

export default async function GetCars() {
    try {
        // const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/car/findAll", {
            method: "GET",
            
        });
        if (response.status === 204) {
            toast.info("No cars found");
            return [];
        }

        const json = await response.json();
        
        // console.log(JSON.stringify(json));
        // return json.cars;

        if (!response.ok) {
            toast.error(json.message || "Failed to fetch cars");
            return null;
        }

        toast.success(json.message || "Cars fetched successfully");
        return json.findAll

    } catch (error) {
        const message = error?.message || "Something went wrong while fetching cars";
        toast.error(message);
        return null;
    }
}