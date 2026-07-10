// Car listing grid — fetches and displays cars with search support, lazy-loading animation via IntersectionObserver, and "Explore More" link
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import GetCars from '../Services/CarFetch';
import { SearchCars } from '../Services/SearchResult';
import { CarRefreshContext } from '../Context/CarRefreshContext';

const CarBoardMain = ({ showAll = true }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState({});
    const cardRefs = useRef([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { refreshKey } = useContext(CarRefreshContext);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);

            const data = query.trim()
                ? await SearchCars(query.trim())
                : await GetCars();

            setCars(Array.isArray(data) ? data : []);
            setVisibleCards({});
            cardRefs.current = [];

            setLoading(false);
        };

        fetchCars();
    }, [query, refreshKey]);

    useEffect(() => {
        if (loading || cars.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);

                    if (entry.isIntersecting) {
                        setVisibleCards((prev) => ({
                            ...prev,
                            [index]: true,
                        }));
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [cars, loading]);

    // Show all cars OR only first 6
    const displayedCars = showAll ? cars : cars.slice(0, 8);

    return (
        <div className="cbm-page">
            
            <div className="cbm-container">
                <h2 className="cbm-heading">
                    {query ? `Search Results for "${query}"` : 'All Listed Cars'}
                </h2>

                {loading && (
                    <p className="cbm-status">Loading cars...</p>
                )}

                {!loading && displayedCars.length === 0 && (
                    <p className="cbm-status">
                        {query
                            ? `No Cars found matching "${query}"`
                            : 'No cars found.'}
                    </p>
                )}

                {!loading && displayedCars.length > 0 && (
                    <>
                        <div className="cbm-grid">
                            {displayedCars.map((car, index) => (
                                <div
                                    key={car._id}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    data-index={index}
                                    className={`cbm-card ${
                                        visibleCards[index]
                                            ? 'cbm-card-visible'
                                            : ''
                                    }`}
                                    style={{
                                        transitionDelay: `${(index % 4) * 80}ms`,
                                    }}
                                >
                                    <Link to={`/cars/${car._id}`} className="cbm-card-link">
                                        <div className="cbm-img-wrap">
                                            <img
                                                src={
                                                    car?.image
                                                        ? `http://localhost:8080/${car.image}`
                                                        : 'https://picsum.photos/400/300'
                                                }
                                                alt={car.title}
                                                className="cbm-img"
                                            />
                                        </div>

                                        <div className="cbm-info">
                                            <h4 className="cbm-car-title">
                                                {car.title}
                                            </h4>

                                            <p className="cbm-car-meta">
                                                {car.brand} • {car.model} • {car.year}
                                            </p>

                                            <p className="cbm-car-city">
                                                {car.city}
                                            </p>

                                            <p className="cbm-car-price">
                                                PKR {car.price}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Explore More Button */}
                        {!showAll && cars.length > 6 && (
                            <div className="cbm-btn-container">
                                <Link to="/cars" className="cbm-btn">
                                    Explore More Cars
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                .cbm-page {
                    background-color: #FFFFFF;
                    min-height: 100vh;
                    /* CHANGED: side padding removed from here — it now lives on
                       .cbm-container so it matches Categories' model exactly */
                    padding: 40px 0 60px;
                    font-family: 'Exo', sans-serif;
                }

                
                .cbm-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    box-sizing: border-box;
                }

                .cbm-heading {
                    color: #1D2023;
                    text-align: center;
                    margin-bottom: 30px;
                }

                .cbm-status {
                    text-align: center;
                    margin-top: 50px;
                    font-size: 16px;
                }

                .cbm-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 20px;
                    /* CHANGED: max-width/margin removed — .cbm-container now
                       controls the overall content width instead of the grid
                       owning its own separate 1200px box */
                }

                .cbm-card {
                    background: #1D2023;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,.2);
                    opacity: 0;
                    transform: translateY(40px);
                    transition: .6s;
                }

                .cbm-card-visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .cbm-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(0,0,0,.3);
                }

                .cbm-card-link {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                }

                .cbm-img-wrap {
                    width:100%;
                    aspect-ratio:4/3;
                    overflow:hidden;
                }

                .cbm-img {
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }

                .cbm-info {
                    padding:16px;
                }

                .cbm-car-title {
                    color:#fff;
                    margin-bottom:8px;
                }

                .cbm-car-meta {
                    color:#d0d0d0;
                    font-size:13px;
                }

                .cbm-car-city {
                    color:#b8b8b8;
                    font-size:13px;
                    margin:6px 0;
                }

                .cbm-car-price {
                    color:#7ee8a7;
                    font-size:18px;
                    font-weight:bold;
                }

                .cbm-btn-container{
                    display:flex;
                    justify-content:center;
                    margin-top:40px;
                }

                .cbm-btn{
                    text-decoration:none;
                    background:#dc3545;
                    color:#fff;
                    padding:14px 35px;
                    border-radius:8px;
                    font-size:16px;
                    font-weight:600;
                    transition:.3s;
                }

                .cbm-btn:hover{
                    background:#bb2d3b;
                    color:#fff;
                    transform:translateY(-3px);
                }

                /* CHANGED: side padding now lives on .cbm-container so it can
                   match Categories' 16px mobile padding exactly */
                @media(max-width:480px){
                    .cbm-page{
                        padding:20px 0;
                    }

                    .cbm-container {
                        padding: 0 16px;
                    }

                    .cbm-grid{
                        grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
                    }
                }
            `}</style>
        </div>
    );
};

export default CarBoardMain;