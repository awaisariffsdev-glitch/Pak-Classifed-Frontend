// import Carousel from 'react-bootstrap/Carousel';


// function CarouselFadeExample() {
//     return (
//         <>

//             <div className="carousel-container" style={{ position: "relative" }}>
//                 <Carousel fade interval={3000}>
//                     <Carousel.Item>
//                         <img
//                             className="d-block w-100"
//                             src="/img/images-banner/banner-1.png"
//                             alt="Banner 1"
//                             style={{ height: "600px", objectFit: "cover", filter: "brightness(40%)" }}
//                         />
//                     </Carousel.Item>

//                     <Carousel.Item>
//                         <img
//                             className="d-block w-100"
//                             src="/img/images-banner/banner-3.png"
//                             alt="Banner 2"
//                             style={{
//                                 height: "600px", objectFit: "cover",
//                                 // opacity: 0.4 ,
//                                 filter: "brightness(40%)"
//                             }}
//                         />
//                     </Carousel.Item>


//                 </Carousel>
//                 <div className="carousel-content text-light " style={{ position: "absolute", top: "50%", zIndex: "1000", left: "15%", transform: "translateY(-50%)" }}>
//                     <h1 className='' style={{ fontFamily: "monospace" }}>Shift Into Gear: <br />Your Destination <br /> for Car Excellent </h1>
//                     <p style={{ fontFamily: "monospace" }}>Drive Your Dream: Find Your Perfect Car Today.</p>
//                     <div className="d-flex gap-4">
//                         <button className="btn btn-danger" style={{ fontFamily: "monospace" }}>Browse Cars</button>
//                         <button className="btn btn-danger" style={{ fontFamily: "monospace" }}>Sell Car</button>
//                     </div>
//                 </div>
//             </div>




//         </>
//     );
// }

// export default CarouselFadeExample;

import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {
    return (
        <>
            <div className="carousel-container">
                <Carousel fade interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-banner-img"
                            src="/img/images-banner/banner-1.png"
                            alt="Banner 1"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-banner-img"
                            src="/img/images-banner/banner-3.png"
                            alt="Banner 2"
                        />
                    </Carousel.Item>
                </Carousel>

                <div className="carousel-content text-light">
                    <h1 className="carousel-heading">
                        Shift Into Gear: <br />Your Destination <br /> for Car Excellent
                    </h1>
                    <p className="carousel-subtext">
                        Drive Your Dream: Find Your Perfect Car Today.
                    </p>
                    <div className="d-flex gap-4 carousel-btn-group">
                        <button className="btn btn-danger carousel-btn">Browse Cars</button>
                        <button className="btn btn-danger carousel-btn">Sell Car</button>
                    </div>
                </div>
            </div>

            <style>{`
                .carousel-container {
                    position: relative;
                }

                .carousel-banner-img {
                    height: 600px;
                    object-fit: cover;
                    filter: brightness(40%);
                }

                .carousel-content {
                    position: absolute;
                    top: 50%;
                    left: 15%;
                    z-index: 1000;
                    transform: translateY(-50%);
                    max-width: 90%;
                }

                .carousel-heading {
                    font-family: monospace;
                    font-size: 2.5rem;
                    line-height: 1.25;
                }

                .carousel-subtext {
                    font-family: monospace;
                    font-size: 1.1rem;
                    margin-top: 10px;
                }

                .carousel-btn-group {
                    margin-top: 16px;
                }

                .carousel-btn {
                    font-family: monospace;
                    white-space: nowrap;
                                        width:120px

                }

                @media (max-width: 991.98px) {
                    .carousel-banner-img {
                        height: 480px;
                    }
                    .carousel-heading {
                        font-size: 2rem;
                    }
                    .carousel-subtext {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 767.98px) {
                    .carousel-banner-img {
                        height: 380px;
                    }
                    .carousel-content {
                        left: 8%;
                        max-width: 84%;
                    }
                    .carousel-heading {
                        font-size: 1.5rem;
                    }
                    .carousel-subtext {
                        font-size: 0.9rem;
                        margin-top: 6px;
                    }
                    .carousel-btn-group {
                        gap: 10px !important;
                        margin-top: 12px;
                    }
                    .carousel-btn {
                        font-size: 0.8rem;
                        padding: 6px 12px;
                        
                    }
                }

                @media (max-width: 480px) {
                    .carousel-banner-img {
                        height: 300px;
                    }
                    .carousel-content {
                        left: 6%;
                        max-width: 88%;
                    }
                    .carousel-heading {
                        font-size: 1.15rem;
                    }
                    .carousel-heading br {
                        display: none;
                    }
                    .carousel-subtext {
                        font-size: 0.78rem;
                    }
                    .carousel-btn-group {
                        flex-direction: column;
                        gap: 8px !important;
                    }
                    .carousel-btn {
                        font-size: 0.75rem;
                        padding: 6px 10px;
                        width:120px
                    }
                }
            `}</style>
        </>
    );
}

export default CarouselFadeExample;