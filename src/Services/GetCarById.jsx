// API service — fetches a single car by ID from GET /car/find/:carId
// ASSUMPTION: no backend route for a single car was provided, so this mirrors the
// existing CarByUser pattern (`/car/find/user/:userId` -> `carFind`).
// If your real endpoint or response key differs, this is the one place to change.
export const GetCarById = async (carId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://pak-classifed-backend-production.up.railway.app/car/find/${carId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Falls back across a few likely response shapes.
        return result.carFindById || result.car || result.carFind || null;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default GetCarById;