import React from 'react';

// About Us page — styled to match the app's existing "navtheme" system
// (dark #1D2023 panels, monospace type, white hairline borders, green accent)
// so it feels like it belongs next to NavBar / Profile rather than a
// separately-designed page.

function AboutPage() {
    return (
        <div className="navtheme-about-page">

            {/* HERO */}
            <div className="navtheme-about-hero">
                <img
                    src="img/PakClassifed.png"
                    alt=""
                    className="navtheme-about-hero-img"
                />
                <div className="navtheme-about-hero-overlay" />
                <div className="navtheme-about-hero-content">
                    <span className="navtheme-about-hero-bracket" aria-hidden="true" />
                    <h1 className="navtheme-about-hero-title">About Us</h1>
                </div>
            </div>

            {/* BODY */}
            <div className="navtheme-about-body">
                <div className="navtheme-about-collage">
                    <img
                        src="img/Wagon.avif"
                        alt="Off-road pickup truck parked on a desert trail"
                        className="navtheme-about-img navtheme-about-img-1"
                    />
                    <img
                        src="img/Sports.avif"
                        alt="Blue sports sedan parked on desert red rock"
                        className="navtheme-about-img navtheme-about-img-2"
                    />
                    <img
                        src="img/Sedan.jpg"
                        alt="Car driving down an open highway at sunset"
                        className="navtheme-about-img navtheme-about-img-3"
                    />
                    <img
                        src="img/Hybird.avif"
                        alt="White SUV parked on a dirt road"
                        className="navtheme-about-img navtheme-about-img-4"
                    />
                </div>

                <div className="navtheme-about-text">
                    <h2 className="navtheme-about-heading">
                        PakClassified is a comprehensive online platform where users
                        can browse, buy, sell, and compare cars
                    </h2>

                    <p className="navtheme-about-paragraph">
                        Welcome to PakClassified, your premier destination for all
                        things automotive in Pakistan. Our platform is designed to
                        offer a seamless experience for users looking to browse, buy,
                        sell, and compare cars. Whether you are a car enthusiast or a
                        first-time buyer, PakClassified is committed to making your
                        car shopping journey smooth and hassle-free.
                    </p>

                    <ul className="navtheme-about-list">
                        <li>
                            <CheckIcon />
                            Customer Support
                        </li>
                        <li>
                            <CheckIcon />
                            Technical Assistance
                        </li>
                        <li>
                            <CheckIcon />
                            Feedback and suggestion
                        </li>
                    </ul>
                </div>
            </div>

            <style>{pageStyles}</style>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="navtheme-about-check"
            aria-hidden="true"
        >
            <path
                d="M2 8.5L6 12.5L14 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const pageStyles = `
    .navtheme-about-page {
        background-color: #ffffff;
        font-family: monospace;
    }

    /* HERO */
    .navtheme-about-hero {
        position: relative;
        width: 100%;
        height: 260px;
        overflow: hidden;
    }
    .navtheme-about-hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(15%);
    }
    .navtheme-about-hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(29,32,35,0.75) 0%, rgba(29,32,35,0.35) 45%, rgba(29,32,35,0.05) 75%);
    }
    .navtheme-about-hero-content {
        position: absolute;
        left: 48px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 18px;
    }
    .navtheme-about-hero-bracket {
        width: 34px;
        height: 64px;
        border-top: 3px solid red !important;
        border-left: 3px solid red !important;
        border-bottom: 3px solid red !important;
        flex-shrink: 0;
    }
    .navtheme-about-hero-title {
        color: #f1f1f1;
        font-family: monospace;
        font-weight: 700;
        font-size: 34px;
        letter-spacing: 0.5px;
        margin: 0;
    }

    /* BODY */
    .navtheme-about-body {
        max-width: 1100px;
        margin: 0 auto;
        padding: 64px 32px 80px;
        display: flex;
        align-items: center;
        gap: 56px;
    }

    .navtheme-about-collage {
        position: relative;
        flex-shrink: 0;
        width: 380px;
        height: 400px;
    }
    .navtheme-about-img {
        position: absolute;
        border-radius: 10px;
        border: 2px solid #1D2023;
        object-fit: cover;
        box-shadow: 0 10px 24px rgba(29,32,35,0.18);
    }
    .navtheme-about-img-1 { width: 190px; height: 150px; top: 0; left: 0; z-index: 2; }
    .navtheme-about-img-3 { width: 190px; height: 150px; top: 168px; left: 0; z-index: 2; }
    .navtheme-about-img-2 { width: 150px; height: 210px; top: 30px; left: 165px; z-index: 3; }
    .navtheme-about-img-4 { width: 150px; height: 150px; top: 250px; left: 165px; z-index: 1; }

    .navtheme-about-text {
        flex: 1;
        min-width: 0;
    }
    .navtheme-about-heading {
        font-family: monospace;
        font-weight: 700;
        font-size: 26px;
        line-height: 1.35;
        color: #1D2023;
        margin: 0 0 18px;
    }
    .navtheme-about-paragraph {
        font-family: monospace;
        font-size: 14px;
        line-height: 1.7;
        color: #4a4d50;
        margin: 0 0 22px;
    }
    .navtheme-about-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .navtheme-about-list li {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: monospace;
        font-size: 14px;
        font-weight: 500;
        color: #1D2023;
    }
    .navtheme-about-check {
        color: red;
        flex-shrink: 0;
    }

    @media (max-width: 860px) {
        .navtheme-about-body {
            flex-direction: column;
            padding: 40px 20px 60px;
            gap: 40px;
        }
        .navtheme-about-collage {
            width: 100%;
            max-width: 380px;
        }
        .navtheme-about-hero-title { font-size: 26px; }
        .navtheme-about-hero-content { left: 24px; gap: 12px; }
        .navtheme-about-hero-bracket { width: 24px; height: 48px; }
    }
`;

export default AboutPage;