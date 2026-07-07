export const CarByUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/car/find/${userId}`);
        if (!response.ok) {
            throw new Error(`Request filed with status code ${response.status}`);
        }
        // return response.data.carFind;
        const result = await response.json();

        return result.carFind

    } catch (error) {
        console.log(error);
    }
}