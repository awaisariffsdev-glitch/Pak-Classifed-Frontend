// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom"

// API service — searches cars by query string via GET /car/search?q=...
import axios from "axios"

// const Searchesult=()=>{
//     const [searchParams]=useSearchParams();
//     const query=searchParams.get('q'||'');

//     const [cars,setCars]=useState();
//     const [loading,setLoading]=useState(false)
//     const [error,setError]=useState('');


//     useEffect(()=>{
//         if(!query.trim()){
//             setCars([]);
//             return;
//         }

//     })
// }


export const SearchCars = async (query) => {
    try {
        const response = await axios.get("http://localhost:8080/car/search", {
            params: { q: query }
        });
        return response.data.cars;
    } catch (error) {
        console.log(error);
        return [];
    }
}