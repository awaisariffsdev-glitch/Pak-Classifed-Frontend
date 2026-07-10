// Footer — site footer with company info, quick links, contact details, social icons, and newsletter signup
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footertheme-footer">
            <Container fluid className="px-3 px-md-5 py-5">
                <Row className="gy-4">
                    <Col xs={12} sm={6} lg={3}>
                        <h6 className="footertheme-heading">Company</h6>
                        <p className="footertheme-text">
                          PakClassified is Pakistan's trusted platform for buying and selling cars with confidence. Browse thousands of verified vehicle listings, discover great deals, and connect directly with buyers and sellers.
                        </p>
                    </Col>

                    <Col xs={12} sm={6} lg={3}>
                        <h6 className="footertheme-heading">Quick Links</h6>
                        <ul className="footertheme-links">
                            <li>
                                <Link to="/about" className="footertheme-link">
                                    <span className="footertheme-chevron">›</span> About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="footertheme-link">
                                    <span className="footertheme-chevron">›</span> Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="footertheme-link">
                                    <span className="footertheme-chevron">›</span> Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="footertheme-link">
                                    <span className="footertheme-chevron">›</span> Terms &amp; Condition
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={12} sm={6} lg={3}>
                        <h6 className="footertheme-heading">Contact</h6>
                        <ul className="footertheme-contact-list">
                            <li>
                                <span className="footertheme-icon">📍</span>
                                Ferozepur Road, Gulberg III, Lahore
                            </li>
                            <li>
                                <span className="footertheme-icon">📞</span>
                                0320-7870705
                            </li>
                            <li>
                                <span className="footertheme-icon">✉️</span>
                                awais.arif.fs.dev@gmail.com
                            </li>
                        </ul>

                        <div className="d-flex gap-2 mt-3">
                            <a href='https://x.com/cyb3rawais' aria-label="Twitter" className="footertheme-social">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 4.9c-.8.4-1.7.6-2.6.8.9-.6 1.6-1.5 2-2.5-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 12.1 8c0 .4 0 .7.1 1A12.8 12.8 0 0 1 2.9 4.1a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.5 12.8 12.8 0 0 0 7.9 21.5c8.3 0 12.9-6.9 12.9-12.9v-.6c.9-.6 1.6-1.4 2.2-2.3z" />
                                </svg>
                            </a>
                            <a href='https://github.com/awaisariffsdev-glitch' aria-label="GitHub" className="footertheme-social">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.17c-3.2.69-3.88-1.38-3.88-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.68 5.39-5.24 5.68.41.35.77 1.04.77 2.09v3.1c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                                </svg>
                            </a>
                            <a href='https://www.youtube.com/@al_sufi_official' aria-label="YouTube" className="footertheme-social">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 12s0-3.4-.4-5c-.3-.9-1-1.6-1.9-1.9C19 4.7 12 4.7 12 4.7s-7 0-8.7.4c-.9.3-1.6 1-1.9 1.9C1 8.6 1 12 1 12s0 3.4.4 5c.3.9 1 1.6 1.9 1.9 1.7.4 8.7.4 8.7.4s7 0 8.7-.4c.9-.3 1.6-1 1.9-1.9.4-1.6.4-5 .4-5zM9.8 15.5v-7l6 3.5-6 3.5z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/awais-arif-webdev/" aria-label="LinkedIn" className="footertheme-social">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.5 8.25h4.3v2h.06c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V23h-4.5v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.6 1.7-2.6 3.5V23H8.5V8.25z" />
                                </svg>
                            </a>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} lg={3}>
                        <h6 className="footertheme-heading">Newsletter</h6>
                        <p className="footertheme-text">
                            Subscribe to our newsletter for the latest updates and news.
                        </p>
                        <div className="d-flex footertheme-subscribe-wrap">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="footertheme-input"
                            />
                            <button className="footertheme-signup-btn">SignUp</button>
                        </div>
                    </Col>
                </Row>

                <hr className="footertheme-hr" />

                <Row className="align-items-center gy-2">
                    <Col xs={12} md={6} className="footertheme-bottom-text">
                        © <a href="https://mail.google.com/mail/u/3/#inbox" className="footertheme-link-inline">PakClassified</a>, All Right Reserved. Designed By{' '}
                        <a href="https://www.instagram.com/cyb3r.awais/" className="footertheme-link-inline">Cyb3r.Awais</a>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex gap-3 footertheme-bottom-links justify-content-md-end justify-content-start flex-wrap">
                            <Link to="/" className="footertheme-link-inline">Home</Link>
                            <p className="footertheme-link-inline">Cookies</p>
                            <p className="footertheme-link-inline">Help</p>
                            <p className="footertheme-link-inline">FAQs</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style>{`
        .footertheme-footer {
          background-color: #1D2023;
          color: #f1f1f1;
          font-family: 'Exo', sans-serif;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .footertheme-heading {
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .footertheme-text {
          color: rgba(255,255,255,0.65);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 0;
        }
        .footertheme-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footertheme-links li {
          margin-bottom: 10px;
        }
        .footertheme-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .footertheme-link:hover {
          color: #ffffff;
          opacity: 0.9;
        }
        .footertheme-chevron {
          color: red;
          font-weight: bold;
        }
        .footertheme-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footertheme-contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
          margin-bottom: 10px;
        }
        .footertheme-icon {
          flex-shrink: 0;
        }
        .footertheme-social {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: rgba(255,255,255,0.08);
          color: #f1f1f1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .footertheme-social:hover {
          background-color: rgba(255,255,255,0.2);
          color: #ffffff;
        }
        .footertheme-subscribe-wrap {
          max-width: 320px;
          border:1px solid white;
          border-radius:5px
        }
        .footertheme-input {
          flex: 1;
          min-width: 0;
          background-color: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: #f1f1f1;
          font-family: monospace;
          font-size: 0.85rem;
          padding: 8px 12px;
          border-radius: 4px 0 0 4px;
          outline: none;
        }
        .footertheme-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .footertheme-signup-btn {
          background-color: #1D2023;
          color: #ffffff;
          border: none;
          font-family: monospace;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 8px 16px;
          border-radius: 0 4px 4px 0;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .footertheme-signup-btn:hover {
          background-color: #1D2023;
        }
        .footertheme-hr {
          border-color: rgba(255,255,255,0.15);
          margin: 8px 0 16px;
        }
        .footertheme-bottom-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }
        .footertheme-link-inline {
          color: #f1f1f1;
          text-decoration: underline;
        }
        .footertheme-link-inline:hover {
          color: #ffffff;
          opacity: 0.85;
        }
        .footertheme-bottom-links .footertheme-link-inline {
          text-decoration: none;
          color: rgba(255,255,255,0.75);
          font-size: 0.85rem;
        }
        .footertheme-bottom-links .footertheme-link-inline:hover {
          color: #ffffff;
        }

        @media (max-width: 767.98px) {
          .footertheme-bottom-text {
            text-align: center;
          }
          .footertheme-bottom-links {
            justify-content: center !important;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;