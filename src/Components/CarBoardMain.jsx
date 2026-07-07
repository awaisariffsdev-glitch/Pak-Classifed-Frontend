


// import React, { useContext, useEffect, useRef, useState } from 'react'
// import GetCars from '../Services/CarFetch';
// import { useSearchParams } from 'react-router-dom';
// import { SearchCars } from '../Services/SearchResult';
// import { CarRefreshContext } from '../Context/CarRefreshContext';


// const CarBoardMain = ({showAll=true}) => {
//     const [cars, setCars] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [visibleCards, setVisibleCards] = useState({}); // ADDED: tracks which cards have animated in
//     const cardRefs = useRef([]); // ADDED: refs for each rendered car card
//     const [searchParams] = useSearchParams();
//     const query = searchParams.get('q') || '';
//     const {refreshKey}=useContext(CarRefreshContext)
//     useEffect(() => {
//         const fetchCars = async () => {
//             setLoading(true);
//             const data = query.trim() ? await SearchCars(query.trim()) : await GetCars();
//             setCars(Array.isArray(data) ? data : [])
//             setVisibleCards({}); // ADDED: reset animation state when a new search/list loads
//             cardRefs.current = []; // ADDED: clear stale refs from the previous list
//             setLoading(false)
//         };
//         fetchCars();
//     }, [query,refreshKey])

//     // ADDED: observe each car card and reveal it once it scrolls into view
//     useEffect(() => {
//         if (loading || cars.length === 0) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     const index = Number(entry.target.dataset.index);
//                     if (entry.isIntersecting) {
//                         setVisibleCards((prev) => ({ ...prev, [index]: true }));
//                     }
//                 });
//             },
//             {
//                 threshold: 0.15,
//                 rootMargin: '0px 0px -50px 0px',
//             }
//         );

//         cardRefs.current.forEach((card) => {
//             if (card) observer.observe(card);
//         });

//         return () => observer.disconnect();
//     }, [cars, loading]);

//     return (
//         <div>
//             <div className="cbm-page ">
//                 <h2 className="cbm-heading">{query ? `Search Results for "${query}"` : 'All Listed Cars'}</h2>

//                 {loading && (
//                     <p className="cbm-status">Loading cars...</p>
//                 )}

//                 {!loading && Array.isArray(cars) && cars.length === 0 && (
//                     <p className="cbm-status">{query ? `No Cars found match "${query}"` : "No cars found."}</p>
//                 )}

//                 {!loading && Array.isArray(cars) && cars.length > 0 && (
//                     <div className="cbm-grid">
//                         {cars.map((car, index) => (
//                             <div
//                                 key={car._id}
//                                 ref={(el) => (cardRefs.current[index] = el)} // ADDED: attach ref for observer
//                                 data-index={index} // ADDED: identify card in observer callback
//                                 className={`cbm-card ${visibleCards[index] ? 'cbm-card-visible' : ''}`} // ADDED: conditional reveal class
//                                 style={{ transitionDelay: `${(index % 4) * 80}ms` }} // ADDED: slight stagger per row
//                             >
//                                 <div className="cbm-img-wrap">
//                                     <img
//                                         src={car?.image ? `http://localhost:8080/${car.image}` : "https://picsum.photos/400/300"}
//                                         alt={car.title}
//                                         className="cbm-img"
//                                     />
//                                 </div>
//                                 <div className="cbm-info">
//                                     <h4 className="cbm-car-title">{car.title}</h4>
//                                     <p className="cbm-car-meta">{car.brand} • {car.model} • {car.year}</p>
//                                     <p className="cbm-car-city">{car.city}</p>
//                                     <p className="cbm-car-price">PKR {car.price}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 <style>{`
//                 .cbm-page {
//                     background-color: #FFFFFF;
//                     min-height: 100vh;
//                     padding: 40px 24px 60px;
//                     font-family: monospace;
//                 }

//                 .cbm-heading {
//                     color: #1D2023;
//                     text-align: center;
//                     font-family: monospace;
//                     letter-spacing: 0.5px;
//                     margin-bottom: 30px;
//                 }

//                 .cbm-status {
//                     color: #1D2023;
//                     text-align: center;
//                     margin-top: 60px;
//                     font-size: 16px;
//                 }

//                 .cbm-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
//                     gap: 20px;
//                     max-width: 1200px;
//                     margin: 0 auto;
//                 }

//                 .cbm-card {
//                     background-color: #1D2023;
//                     border: 1px solid rgba(255,255,255,0.25);
//                     border-radius: 10px;
//                     overflow: hidden;
//                     /* ADDED: initial hidden state before scrolling into view */
//                     opacity: 0;
//                     transform: translateY(40px);
//                     transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s ease;
//                 }

//                 .cbm-card-visible {
//                     /* ADDED: revealed state - fades in and slides up */
//                     opacity: 1;
//                     transform: translateY(0);
//                 }

//                 .cbm-card:hover {
//                     transform: translateY(-4px);
//                     box-shadow: 0 8px 20px rgba(0,0,0,0.4);
//                 }

//                 .cbm-img-wrap {
//                     width: 100%;
//                     aspect-ratio: 4 / 3;
//                     background-color: #26292d;
//                     overflow: hidden;
//                 }

//                 .cbm-img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     display: block;
//                 }

//                 .cbm-info {
//                     padding: 14px 16px 18px;
//                 }

//                 .cbm-car-title {
//                     color: #f1f1f1;
//                     font-size: 16px;
//                     font-weight: 600;
//                     margin: 0 0 6px;
//                 }

//                 .cbm-car-meta {
//                     color: #cfcfcf;
//                     font-size: 13px;
//                     margin: 0 0 4px;
//                 }

//                 .cbm-car-city {
//                     color: #a5a5a5;
//                     font-size: 13px;
//                     margin: 0 0 8px;
//                 }

//                 .cbm-car-price {
//                     color: #7ee8a7;
//                     font-size: 16px;
//                     font-weight: 600;
//                     margin: 0;
//                 }

//                 @media (max-width: 480px) {
//                     .cbm-page {
//                         padding: 24px 14px 40px;
//                     }
//                     .cbm-grid {
//                         grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//                         gap: 12px;
//                     }
//                     .cbm-heading {
//                         font-size: 18px;
//                     }
//                 }

//                 /* ADDED: respect users who prefer reduced motion */
//                 @media (prefers-reduced-motion: reduce) {
//                     .cbm-card {
//                         opacity: 1;
//                         transform: none;
//                         transition: none;
//                     }
//                 }
//             `}</style>
//             </div>
//         </div>
//     )
// }

// export default CarBoardMain


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

            <style>{`
                .cbm-page {
                    background-color: #FFFFFF;
                    min-height: 100vh;
                    padding: 40px 24px 60px;
                    font-family: monospace;
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
                    max-width: 1200px;
                    margin: auto;
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

                @media(max-width:480px){
                    .cbm-page{
                        padding:20px;
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