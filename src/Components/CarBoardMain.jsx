import React, { useEffect, useState } from 'react'
import GetCars from '../Services/CarFetch';

const CarBoardMain = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            const data = await GetCars();
            console.log(data)
            setCars(Array.isArray(data)?data:[]);
            setLoading(false)
        };
        fetchCars();
    }, [])
    return (
        <div>
            <div className="cbm-page ">
                <h2 className="cbm-heading">All Listed Cars</h2>

                {loading && (
                    <p className="cbm-status">Loading cars...</p>
                )}

                {!loading && Array.isArray(cars)&&cars.length === 0 && (
                    <p className="cbm-status">No cars found.</p>
                )}

                {!loading && Array.isArray(cars) &&cars.length > 0 && (
                    <div className="cbm-grid">
                        {cars.map((car) => (
                            <div key={car._id} className="cbm-card">
                                <div className="cbm-img-wrap">
                                    <img
                                        src={car?.image ? `http://localhost:8080/${car.image}` : "https://picsum.photos/400/300"}
                                        alt={car.title}
                                        className="cbm-img"
                                    />
                                </div>
                                <div className="cbm-info">
                                    <h4 className="cbm-car-title">{car.title}</h4>
                                    <p className="cbm-car-meta">{car.brand} • {car.model} • {car.year}</p>
                                    <p className="cbm-car-meta">{car.color} • {car.mileage} km • {car.fuelType}</p>
                                    <p className="cbm-car-city">{car.city}</p>
                                    <p className="cbm-car-price">PKR {car.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <style>{`
                .cbm-page {
                    background-color: #FFFFFF;
                    min-height: 100vh;
                    border-top: 2px solid #1D2023;
                    padding: 40px 24px 60px;
                    font-family: monospace;
                }

                .cbm-heading {
                    color: #1D2023;
                    text-align: center;
                    font-family: monospace;
                    
                    letter-spacing: 0.5px;
                    margin-bottom: 30px;
                }

                .cbm-status {
                    color: #1D2023;
                    text-align: center;
                    margin-top: 60px;
                    font-size: 16px;
                }

                .cbm-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .cbm-card {
                    background-color: #1D2023;
                    border: 1px solid rgba(255,255,255,0.25);
                    border-radius: 10px;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .cbm-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
                }

                .cbm-img-wrap {
                    width: 100%;
                    aspect-ratio: 4 / 3;
                    background-color: #26292d;
                    overflow: hidden;
                }

                .cbm-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .cbm-info {
                    padding: 14px 16px 18px;
                }

                .cbm-car-title {
                    color: #f1f1f1;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0 0 6px;
                }

                .cbm-car-meta {
                    color: #cfcfcf;
                    font-size: 13px;
                    margin: 0 0 4px;
                }

                .cbm-car-city {
                    color: #a5a5a5;
                    font-size: 13px;
                    margin: 0 0 8px;
                }

                .cbm-car-price {
                    color: #7ee8a7;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                }

                @media (max-width: 480px) {
                    .cbm-page {
                        padding: 24px 14px 40px;
                    }
                    .cbm-grid {
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        gap: 12px;
                    }
                    .cbm-heading {
                        font-size: 18px;
                    }
                }
            `}</style>
            </div>
        </div>
    )
}

export default CarBoardMain
