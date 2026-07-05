import Carousel from 'react-bootstrap/Carousel';


function CarouselFadeExample() {
    return (
        <>

            <div className="carousel-container" style={{ position: "relative" }}>
                <Carousel fade interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="img/banner-1.png"
                            alt="Banner 1"
                            style={{ height: "600px", objectFit: "cover", filter: "brightness(40%)" }}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="img/banner-3.png"
                            alt="Banner 2"
                            style={{
                                height: "600px", objectFit: "cover",
                                // opacity: 0.4 ,
                                filter: "brightness(40%)"
                            }}
                        />
                    </Carousel.Item>


                </Carousel>
            </div>


            <div className="carousel-content text-light " style={{ position: "absolute", top: "50%", zIndex: "1000", left: "15%", transform: "translateY(-50%" }}>
                <h1 className='' style={{ fontFamily: "monospace" }}>Shift Into Gear: <br />Your Destination <br /> for Car Excellent </h1>
                <p style={{ fontFamily: "monospace" }}>Drive Your Dream: Find Your Perfect Car Today.</p>
                <div className="d-flex gap-4">
                    <button className="btn btn-danger" style={{ fontFamily: "monospace" }}>Browse Cars</button>
                    <button className="btn btn-danger" style={{ fontFamily: "monospace" }}>Sell Car</button>
                </div>
            </div>


        </>
    );
}

export default CarouselFadeExample;