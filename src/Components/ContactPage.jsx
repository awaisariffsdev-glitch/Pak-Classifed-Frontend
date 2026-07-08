import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// Simple inline icons so we don't need an extra icon package.
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Wire this up to your backend contact endpoint, e.g.:
      // await fetch('http://localhost:8080/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      setShowToast(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contactpage-wrapper">
      {/* Hero */}
      <div className="contactpage-hero">
        <img
          src="/img/Rolls.webp"
          alt="Contact"
          className="contactpage-hero-img"
        />
        <div className="contactpage-hero-overlay" />
        <div className="contactpage-hero-title">
          <span className="contactpage-hero-bracket" />
          <h1>Contact</h1>
        </div>
      </div>

      <Container className="contactpage-body">
        <h2 className="contactpage-heading text-center">Contact For Any Query</h2>

        {/* Info cards */}
        <Row className="g-3 contactpage-infocards">
          <Col md={4}>
            <div className="contactpage-card">
              <span className="contactpage-icon"><PinIcon /></span>
              <span>Gulberg III, Lahore</span>
            </div>
          </Col>
          <Col md={4}>
            <div className="contactpage-card">
              <span className="contactpage-icon"><MailIcon /></span>
              <span>PakClassifed@gmail.com</span>
            </div>
          </Col>
          <Col md={4}>
            <div className="contactpage-card">
              <span className="contactpage-icon"><PhoneIcon /></span>
              <span>+92 320-7870705</span>
            </div>
          </Col>
        </Row>

        {/* Map + Form */}
        <Row className="g-4 contactpage-main">
          <Col lg={6}>
            <div className="contactpage-map">
              <iframe
                title="location-map"
                src="https://www.google.com/maps?q=Gulberg%20III%2C%20Lahore&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Col>

          <Col lg={6}>
            <p className="contactpage-copy">
              For any inquiries, assistance, or feedback, please fill out our contact form
              below. Our team is committed to responding promptly to ensure your experience
              with PakClassified is exceptional.
            </p>

            <Form onSubmit={handleSubmit} className="contactpage-form">
              <Row className="g-3">
                <Col sm={6}>
                  <Form.Control
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Leave a message here"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit" className="contactpage-submit w-100" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 2000 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3500}
          autohide
          bg="dark"
        >
          <Toast.Body className="text-light font-monospace">
            Message sent! We'll get back to you soon.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <style>{`
        .contactpage-wrapper {
          background-color: white ;
          color: #1D2023;
          font-family: monospace;
          min-height: 100vh;
        }

        /* Hero */
        .contactpage-hero {
          position: relative;
          height: 260px;
          overflow: hidden;
          border-bottom: 2px solid white;
        }
        .contactpage-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.55);
        }
        .contactpage-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(29,32,35,0.85) 0%, rgba(29,32,35,0.25) 60%);
        }
        .contactpage-hero-title {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
        }
        .contactpage-hero-bracket {
          display: inline-block;
          width: 44px;
          height: 70px;
          border: 3px solid red !important;
          border-right: none  !important;
          margin-right: 18px;
        }
        .contactpage-hero-title h1 {
          font-size: 2.6rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }
        @media (max-width: 576px) {
          .contactpage-hero { height: 180px; }
          .contactpage-hero-title { left: 20px; }
          .contactpage-hero-title h1 { font-size: 1.8rem; }
          .contactpage-hero-bracket { height: 50px; width: 32px; margin-right: 12px; }
        }

        .contactpage-body {
          padding: 48px 16px 64px;
        }
        .contactpage-heading {
          font-weight: 700;
          margin-bottom: 36px;
          color: #1D2023;
        }

        /* Info cards */
        .contactpage-infocards { margin-bottom: 36px; }
        .contactpage-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: white;
          border: 2px solid rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          padding: 18px 20px;
          height: 100%;
        }
        .contactpage-icon {
          display: flex;
          color: red;
          flex-shrink: 0;
        }

        /* Map + form */
        .contactpage-main { align-items: stretch; }
        .contactpage-map {
          width: 100%;
          height: 100%;
          min-height: 340px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          overflow: hidden;
        }
        .contactpage-copy {
          color: #1D2023;
          margin-bottom: 20px;
        }

         .form-control {
          background-color: #24282b;
          border: 1px solid rgba(0, 0, 0, 0.3);
          color: #f1f1f1;
          font-family: monospace;
        }
          .contactpage-form {
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 24px;
}
        .contactpage-form .form-control::placeholder {
          color: rgba(241,241,241,0.5);
        }
        .contactpage-form .form-control:focus {
          background-color: #24282b;
          color: #f1f1f1;
          border-color: red;
          box-shadow: 0 0 0 0.2rem rgba(119, 44, 3, 0.96);
        }

        .contactpage-submit {
          background-color: #1D2023;
          border-color: white;
          color: white;
          font-weight: 700;
          font-family: monospace;
          padding: 10px 0;
        }
        .contactpage-submit:hover,
        .contactpage-submit:focus {
          background-color: #1D2023;
          border-color: black;
          color: white;
        }
        .contactpage-submit:disabled {
          background-color: rgba(46,204,145,0.5);
          border-color: rgba(46,204,145,0.5);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;