// Car by category page — fetches cars matching the URL category param and displays them in a grid
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carGetByCategory } from "../Services/CarServices";
import Button from "react-bootstrap/esm/Button";

function CarByCategory() {
    const { category } = useParams();
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")


    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            setError("");

            try {
                const carData = await carGetByCategory(category);
                setCars(carData);
            }
            catch (error) {
                // console.log(error);
                if (error.response?.status === 404) {
                    setCars([]);
                } else {
                    setError(error.response?.data?.message || "SomeThings wents wrong")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    }, [category])
    return (
        <div className="cbc-page">
            <div className="cbc-header">
                <h2 className="cbc-title">{category} Cars</h2>
                <Button className="cbc-btn-outline" onClick={() => navigate('/')}>
                    Back to Categories
                </Button>
            </div>

            {loading && <p className="cbc-status">Loading {category} cars...</p>}

            {!loading && error && <p className="cbc-status cbc-error">{error}</p>}

            {!loading && !error && cars.length === 0 && (
                <p className="cbc-status">No cars found in the {category} category yet.</p>
            )}

            {!loading && !error && cars.length > 0 && (
                <div className="cbc-grid">
                    {cars.map((car) => (
                        <div key={car._id} className="cbc-card">
                            <div className="cbc-img-wrap">
                                <img
                                    src={car?.image ? `http://localhost:8080/${car.image}` : "https://picsum.photos/400/300"}
                                    alt={car.title}
                                    className="cbc-img"
                                />
                            </div>
                            <div className="cbc-info">
                                <h4 className="cbc-car-title">{car.title}</h4>
                                <p className="cbc-car-meta">{car.brand} • {car.model} • {car.year}</p>
                                <p className="cbc-car-meta">{car.color} • {car.mileage} km • {car.fuelType}</p>
                                <p className="cbc-car-city">{car.city}</p>
                                <p className="cbc-car-price">PKR {car.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .cbc-page { background-color: #FDFDFD; min-height: 100vh; padding: 30px 24px 60px; font-family: monospace; margin-top:20px,box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);}
                .cbc-header { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto 24px; flex-wrap: wrap; gap: 12px; }
                .cbc-title { color: #1D2023; font-family: monospace; font-weight: 500; margin: 0; }
                .cbc-btn-outline { font-family: monospace; font-weight: 500; background-color: transparent; color: #1D2023; border: 1px solid rgba(0, 0, 0, 0.5); transition: all 0.2s ease; }
                .cbc-btn-outline:hover { background-color: rgba(255,255,255,0.1); color: #1D2023; border: 1px solid #1D2023; }
                .cbc-status { color: #1D2023; text-align: center; margin-top: 60px; font-size: 16px; }
                .cbc-error { color: #ff8a8a; }
                .cbc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
                .cbc-card { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.25); border-radius: 10px; overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .cbc-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
                .cbc-img-wrap { width: 100%; aspect-ratio: 4 / 3; background-color: #26292d; overflow: hidden; }
                .cbc-img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .cbc-info { padding: 14px 16px 18px; }
                .cbc-car-title { color: #f1f1f1; font-size: 16px; font-weight: 600; margin: 0 0 6px; }
                .cbc-car-meta { color: #cfcfcf; font-size: 13px; margin: 0 0 4px; }
                .cbc-car-city { color: #a5a5a5; font-size: 13px; margin: 0 0 8px; }
                .cbc-car-price { color: #7ee8a7; font-size: 16px; font-weight: 600; margin: 0; }
                @media (max-width: 480px) {
                    .cbc-page { padding: 20px 14px 40px; }
                    .cbc-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
                    .cbc-title { font-size: 18px; }
                }
            `}</style>
        </div>
    );
}

export default CarByCategory;



