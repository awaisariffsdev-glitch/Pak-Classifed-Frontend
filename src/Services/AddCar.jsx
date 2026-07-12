// API service — adds a new car via POST /car/add with FormData (image + fields)
export default async function AddCar(carData) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        Object.keys(carData).forEach((key) => {
            if (carData[key] !== undefined && carData[key] !== null) {
                formData.append(key, carData[key]);
            }
        })

        const response = await fetch("https://pak-classifed-backend-production.up.railway.app/car/add", {
            method: "POST",
            headers: {
                // "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        console.log(response)


        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            return null;
        }



        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return null
    }
}