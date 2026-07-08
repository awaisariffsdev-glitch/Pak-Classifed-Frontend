import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import { GetCarById } from '../Services/CarFetchById';
import {GetCarById} from '../Services/GetCarById'

function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchCar = async () => {
            setLoading(true);
            setErrorMsg('');

            const data = await GetCarById(id);

            if (!isMounted) return;

            if (data) {
                setCar(data);
            } else {
                setErrorMsg('Could not load this car.');
            }
            setLoading(false);
        };

        if (id) {
            fetchCar();
        } else {
            setLoading(false);
            setErrorMsg('No car id provided.');
        }

        return () => { isMounted = false; };
    }, [id]);

    if (loading) {
        return (
            <div className="cd-page d-flex align-items-center justify-content-center">
                <p className="cd-status">Loading car details...</p>
                <style>{pageStyles}</style>
            </div>
        );
    }

    if (errorMsg || !car) {
        return (
            <div className="cd-page d-flex flex-column align-items-center justify-content-center gap-3">
                <p className="cd-status">{errorMsg || 'Car not found.'}</p>
                <Button className="cd-btn-outline" onClick={() => navigate(-1)}>Back</Button>
                <style>{pageStyles}</style>
            </div>
        );
    }

    const imageSrc = car?.image
        ? `http://localhost:8080/${car.image}`
        : 'https://picsum.photos/800/600';

    return (
        <div className="cd-page">
            <div className="cd-wrap">
                <div className="cd-card">

                    <div className="cd-img-wrap">
                        <img src={imageSrc} alt={car.title} className="cd-img" />
                    </div>

                    <div className="cd-body">
                        <div className="cd-header">
                            <h2 className="cd-title">{car.title}</h2>
                            <p className="cd-price">PKR {car.price}</p>
                        </div>

                        <p className="cd-meta">{car.brand} • {car.model} • {car.year}</p>
                        {car.city && <p className="cd-city">{car.city}</p>}

                        <div className="cd-detail-grid">
                            <div className="cd-detail-item">
                                <span className="cd-label">Brand</span>
                                <span className="cd-value">{car.brand || '—'}</span>
                            </div>
                            <div className="cd-detail-item">
                                <span className="cd-label">Model</span>
                                <span className="cd-value">{car.model || '—'}</span>
                            </div>
                            <div className="cd-detail-item">
                                <span className="cd-label">Year</span>
                                <span className="cd-value">{car.year || '—'}</span>
                            </div>
                            <div className="cd-detail-item">
                                <span className="cd-label">City</span>
                                <span className="cd-value">{car.city || '—'}</span>
                            </div>
                            <div className="cd-detail-item">
                                <span className="cd-label">Transmission</span>
                                <span className="cd-value">{car.transmission || '—'}</span>
                            </div>
                            {car.mileage && (
                                <div className="cd-detail-item">
                                    <span className="cd-label">Mileage</span>
                                    <span className="cd-value">{car.mileage}</span>
                                </div>
                            )}
                            {car.category && (
                                <div className="cd-detail-item">
                                    <span className="cd-label">Category</span>
                                    <span className="cd-value">{car.category}</span>
                                </div>
                            )}
                        </div>

                        {car.description && (
                            <div className="cd-description">
                                <span className="cd-label">Description</span>
                                <p className="cd-description-text">{car.description}</p>
                            </div>
                        )}

                        <div className="cd-footer">
                            <Button className="cd-btn-outline" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

            <style>{pageStyles}</style>
        </div>
    );
}

const pageStyles = `
    .cd-page {
        background-color: #e6e3e3;
        min-height: 100vh;
        padding: 30px 20px 60px;
        font-family: monospace;
        box-sizing: border-box;
    }
    .cd-status {
        color: #1D2023;
        font-size: 16px;
    }
    .cd-wrap {
        display: flex;
        justify-content: center;
    }
    .cd-card {
        background-color: #1D2023;
        border: 2px solid white;
        border-radius: 10px;
        width: 100%;
        max-width: 950px;
        color: #f1f1f1;
        display: flex;
        overflow: hidden;
    }
    .cd-img-wrap {
        flex: 0 0 42%;
        background-color: #26292d;
        min-height: 320px;
    }
    .cd-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .cd-body {
        flex: 1;
        min-width: 0;
        padding: 28px 32px;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .cd-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
    }
    .cd-title {
        margin: 0;
        font-weight: 600;
        letter-spacing: 0.4px;
        color: #f1f1f1;
    }
    .cd-price {
        margin: 0;
        color: #7ee8a7;
        font-size: 22px;
        font-weight: 700;
        white-space: nowrap;
    }
    .cd-meta {
        margin: 0;
        color: #cfcfcf;
        font-size: 14px;
    }
    .cd-city {
        margin: -8px 0 0;
        color: #a5a5a5;
        font-size: 13px;
    }
    .cd-detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
        margin-top: 6px;
    }
    .cd-detail-item {
        background-color: #26292d;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .cd-label {
        color: #9a9a9a;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .cd-value {
        color: #f1f1f1;
        font-size: 14px;
    }
    .cd-description {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .cd-description-text {
        margin: 0;
        color: #d8d8d8;
        font-size: 14px;
        line-height: 1.6;
    }
    .cd-footer {
        margin-top: auto;
        padding-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
    .cd-btn-outline {
        font-family: monospace;
        font-weight: 500;
        background-color: transparent;
        color: #f1f1f1;
        border: 1px solid rgba(255,255,255,0.5);
        transition: all 0.2s ease;
    }
    .cd-btn-outline:hover {
        background-color: rgba(255,255,255,0.1);
        color: #f1f1f1;
        border: 1px solid #f1f1f1;
    }

    @media (max-width: 750px) {
        .cd-card {
            flex-direction: column;
        }
        .cd-img-wrap {
            min-height: 220px;
        }
        .cd-body {
            padding: 20px;
        }
    }
`;

export default CarDetails;