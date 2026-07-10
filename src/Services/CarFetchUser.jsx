// API service — fetches cars belonging to a specific user from GET /car/find/user/:userId
export const CarByUser = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/car/find/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Request filed with status code ${response.status}`);
        }
        // return response.data.carFind;
        const result = await response.json();
        console.log(result);


        return result.carFind || []

    } catch (error) {
        console.log(error);
    }
}