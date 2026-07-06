// // import React, { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { carGetByCategory } from '../Services/CarServices';

// // const categoryData = [
// //     { name: "SUV", image: "/img/SUV.avif" },
// //     { name: "Sedan", image: "/img/Sedan.jpg" },
// //     { name: "Crossover", image: "/img/Crossover.avif" },
// //     { name: "Hatchback", image: "/img/Hatchback.avif" },
// //     { name: "Wagon", image: "/img/Wagon.avif" },
// //     { name: "Sports", image: "/img/Sports.avif" },
// //     { name: "Hybrid", image: "/img/Hybird.avif" },
// //     { name: "Convertible", image: "/img/Convertible.avif" },
// // ];

// // function Categories({ counts = {} }) {
// //     const navigate = useNavigate();




// //     return (
// //         <div className="cat-section">
// //             <h2 className="cat-heading">Explore By Categories</h2>

// //             <div className="cat-grid">
// //                 {categoryData.map((cat) => (
// //                     <div
// //                         key={cat.name}
// //                         className="cat-card"
// //                         onClick={() => navigate(`/cars/category/${cat.name}`)}
// //                     >
// //                         <div className="cat-img-wrap">
// //                             <img src={cat.image} alt={cat.name} className="cat-img" />
// //                         </div>
// //                         <div className="cat-info">
// //                             <p className="cat-name">{cat.name}</p>
// //                             <p className="cat-count">
// //                                 {counts[cat.name] !== undefined ? counts[cat.name] : "—"} Cars
// //                             </p>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             <style>{`
// //                 .cat-section {
// //                     max-width: 1200px;
// //                     margin: 0 auto;
// //                     padding: 40px 20px 60px;
// //                 }

// //                 .cat-heading {
// //                     text-align: center;
// //                     color: #0f9d6e;
// //                     font-weight: 700;
// //                     font-size: 28px;
// //                     margin-bottom: 30px;
// //                     font-family: 'Segoe UI', Arial, sans-serif;
// //                 }

// //                 .cat-grid {
// //                     display: grid;
// //                     grid-template-columns: repeat(4, 1fr);
// //                     gap: 24px;
// //                 }

// //                 .cat-card {
// //                     background-color: #ffffff;
// //                     border: 1px solid #eef0f2;
// //                     border-radius: 10px;
// //                     overflow: hidden;
// //                     cursor: pointer;
// //                     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
// //                     transition: transform 0.2s ease, box-shadow 0.2s ease;
// //                 }

// //                 .cat-card:hover {
// //                     transform: translateY(-4px);
// //                     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
// //                 }

// //                 .cat-img-wrap {
// //                     width: 100%;
// //                     aspect-ratio: 4 / 3;
// //                     overflow: hidden;
// //                     background-color: #f2f2f2;
// //                 }

// //                 .cat-img {
// //                     width: 100%;
// //                     height: 100%;
// //                     object-fit: cover;
// //                     display: block;
// //                 }

// //                 .cat-info {
// //                     padding: 14px 16px 18px;
// //                 }

// //                 .cat-name {
// //                     font-size: 17px;
// //                     font-weight: 600;
// //                     color: #1a1a1a;
// //                     margin: 0 0 4px;
// //                     font-family: 'Segoe UI', Arial, sans-serif;
// //                 }

// //                 .cat-count {
// //                     font-size: 14px;
// //                     color: #0f9d6e;
// //                     font-weight: 500;
// //                     margin: 0;
// //                     font-family: 'Segoe UI', Arial, sans-serif;
// //                 }

// //                 @media (max-width: 992px) {
// //                     .cat-grid {
// //                         grid-template-columns: repeat(2, 1fr);
// //                     }
// //                     .cat-heading {
// //                         font-size: 24px;
// //                     }
// //                 }

// //                 @media (max-width: 480px) {
// //                     .cat-grid {
// //                         grid-template-columns: 1fr 1fr;
// //                         gap: 14px;
// //                     }
// //                     .cat-section {
// //                         padding: 24px 14px 40px;
// //                     }
// //                     .cat-name {
// //                         font-size: 14px;
// //                     }
// //                     .cat-count {
// //                         font-size: 12px;
// //                     }
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // }

// // export default Categories;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const categoryData = [
//     { name: "SUV", image: "/img/SUV.avif" },
//     { name: "Sedan", image: "/img/Sedan.jpg" },
//     { name: "Crossover", image: "/img/Crossover.avif" },
//     { name: "Hatchback", image: "/img/Hatchback.avif" },
//     { name: "Wagon", image: "/img/Wagon.avif" },
//     { name: "Sports", image: "/img/Sports.avif" },
//     { name: "Hybrid", image: "/img/Hybird.avif" },
//     { name: "Convertible", image: "/img/Convertible.avif" },
// ];

// function Categories() {
//     const navigate = useNavigate();

//     return (
//         <div className="cat-section">
//             <h2 className="cat-heading">Explore By Categories</h2>

//             <div className="cat-grid">
//                 {categoryData.map((cat) => (
//                     <div
//                         key={cat.name}
//                         className="cat-card"
//                         onClick={() => navigate(`/cars/category/${cat.name}`)}
//                     >
//                         <div className="cat-img-wrap">
//                             <img src={cat.image} alt={cat.name} className="cat-img" />
//                         </div>
//                         <div className="cat-info">
//                             <p className="cat-name">{cat.name}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <style>{`
//                 .cat-section { max-width: 1200px; margin: 0 auto; padding: 40px 20px 60px; }
//                 .cat-heading { text-align: center; color: #1D2023;font-family: monospace; font-weight: 700; font-size: 28px; margin-bottom: 30px }
//                 .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
//                 .cat-card { background-color: #ffffff; border: 1px solid #eef0f2; border-radius: 10px; overflow: hidden; cursor: pointer; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; }
//                 .cat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }
//                 .cat-img-wrap { width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background-color: #f2f2f2; }
//                 .cat-img { width: 100%; height: 100%; object-fit: cover; display: block; }
//                 .cat-info { padding: 14px 16px 18px; }
//                 .cat-name { font-size: 17px; font-weight: 600; color: #1a1a1a; margin: 0; font-family: monospace }
//                 @media (max-width: 992px) {
//                     .cat-grid { grid-template-columns: repeat(2, 1fr); }
//                     .cat-heading { font-size: 24px; }
//                 }
//                 @media (max-width: 480px) {
//                     .cat-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
//                     .cat-section { padding: 24px 14px 40px; }
//                     .cat-name { font-size: 14px; }
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default Categories;


import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
    { name: "SUV", image: "/img/SUV.avif" },
    { name: "Sedan", image: "/img/Sedan.jpg" },
    { name: "Crossover", image: "/img/Crossover.avif" },
    { name: "Hatchback", image: "/img/Hatchback.avif" },
    { name: "Wagon", image: "/img/Wagon.avif" },
    { name: "Sports", image: "/img/Sports.avif" },
    { name: "Hybrid", image: "/img/Hybird.avif" },
    { name: "Convertible", image: "/img/Convertible.avif" },
];

function Categories() {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState({}); // ADDED: tracks which cards have animated in
    const cardRefs = useRef([]); // ADDED: refs for each card to observe

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleCards((prev) => ({ ...prev, [index]: true }));
                    }
                });
            },
            {
                threshold: 0.15, // triggers when 15% of the card is visible
                rootMargin: '0px 0px -50px 0px', // triggers slightly before fully in view
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="cat-section" id="categories-section">
            <h2 className="cat-heading">Explore By Categories</h2>

            <div className="cat-grid">
                {categoryData.map((cat, index) => (
                    <div
                        key={cat.name}
                        ref={(el) => (cardRefs.current[index] = el)} // ADDED: attach ref
                        data-index={index} // ADDED: identify card in observer callback
                        className={`cat-card ${visibleCards[index] ? 'cat-card-visible' : ''}`} // ADDED: conditional animation class
                        style={{ transitionDelay: `${(index % 4) * 80}ms` }} // ADDED: staggered reveal per row
                        onClick={() => navigate(`/cars/category/${cat.name}`)}
                    >
                        <div className="cat-img-wrap">
                            <img src={cat.image} alt={cat.name} className="cat-img" />
                        </div>
                        <div className="cat-info">
                            <p className="cat-name">{cat.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .cat-section { max-width: 1200px; margin: 0 auto; padding: 40px 20px 60px; }
                .cat-heading { text-align: center; color: #1D2023; font-family: monospace; font-weight: 700; font-size: 28px; margin-bottom: 30px; }
                .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

                .cat-card {
                    background-color: #ffffff;
                    border: 1px solid #eef0f2;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                    /* ADDED: initial hidden state — invisible and shifted down before scrolling into view */
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s ease;
                }

                .cat-card-visible {
                    /* ADDED: final revealed state — fades in and slides up smoothly */
                    opacity: 1;
                    transform: translateY(0);
                }

                .cat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
                }

                .cat-img-wrap { width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background-color: #f2f2f2; }
                .cat-img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .cat-info { padding: 14px 16px 18px; }
                .cat-name { font-size: 17px; font-weight: 600; color: #1a1a1a; margin: 0; font-family: monospace; }

                @media (max-width: 992px) {
                    .cat-grid { grid-template-columns: repeat(2, 1fr); }
                    .cat-heading { font-size: 24px; }
                }
                @media (max-width: 480px) {
                    .cat-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
                    .cat-section { padding: 24px 14px 40px; }
                    .cat-name { font-size: 14px; }
                }

                /* ADDED: respect users who prefer reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .cat-card {
                        opacity: 1;
                        transform: none;
                        transition: none;
                    }
                }
            `}</style>
        </div>
    );
}

export default Categories;