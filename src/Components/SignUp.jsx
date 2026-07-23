// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';
// import axios from 'axios';
// import VerifyOTP from './VerifyOTP';

// function SignUp() {
//     const [show, setShow] = useState(false);
//     const [showOtp, setShowOtp] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const [toast, setToast] = useState({
//         show: false,
//         message: "",
//         variant: "success" // "success" | "danger"
//     });

//     const showToast = (message, variant = "success") => {
//         setToast({ show: true, message, variant });
//     };

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const handleOtpClose = () => setShowOtp(false);

//     const [form, setForm] = useState({
//         fullname: "",
//         email: "",
//         image: "",
//         phone: "",
//         city: "",
//         password: ""
//     });

//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const newForm = new FormData();

//             newForm.append("fullname", form.fullname);
//             newForm.append("email", form.email);
//             newForm.append("image", form.image);
//             newForm.append("phone", form.phone);
//             newForm.append("city", form.city);
//             newForm.append("password", form.password);

//             const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/signUp", newForm);
//             console.log("User Register Successfully", response.data);

//             showToast("Registered successfully! Check your email for the OTP.", "success");

//             handleClose();
//             setShowOtp(true);

//         } catch (error) {
//             console.log("STATUS:", error.response?.status);
//             console.log("MESSAGE:", error.response?.data?.message);
//             showToast(
//                 error.response?.data?.message || "Something went wrong. Please try again.",
//                 "danger"
//             );
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleChanges = (e) => {
//         const { name, value, files, type } = e.target;

//         setForm((prev) => ({
//             ...prev,
//             [name]: type === "file" ? files[0] : value
//         }));
//     };

//     const handleVerified = () => {
//         showToast("Account verified! You can now log in.", "success");
//     };

//     return (
//         <>
//             <Button
//                 className="navtheme-navbtn fw-medium font-monospace"
//                 onClick={handleShow}
//             >
//                 SignUp
//             </Button>

//             <style>{`
//                 .navtheme-navbtn {
//                     background-color: transparent;
//                     color: #f1f1f1;
//                     border: 1px solid rgba(255,255,255,0.5);
//                     transition: all 0.2s ease;
//                 }
//                 .navtheme-navbtn:hover {
//                     background-color: #f1f1f1;
//                     color: #1D2023;
//                     border: 1px solid #f1f1f1;
//                 }

//                 .navtheme-modal-content {
//                     background-color: #1D2023;
//                     border: 2px solid white;
//                     color: #f1f1f1;
//                 }
//                 .navtheme-modal-content .modal-header {
//                     border-bottom: 1px solid rgba(255,255,255,0.25);
//                 }
//                 .navtheme-modal-content .modal-footer {
//                     border-top: 1px solid rgba(255,255,255,0.25);
//                 }
//                 .navtheme-title {
//                     font-family: monospace;
//                     font-weight: 500;
//                     letter-spacing: 0.5px;
//                     color: #f1f1f1;
//                 }
//                 .navtheme-input {
//                     background-color: #26292d;
//                     border: 1px solid rgba(255,255,255,0.3);
//                     color: #f1f1f1;
//                     font-family: monospace;
//                 }
//                 .navtheme-input:focus {
//                     background-color: #26292d;
//                     color: #f1f1f1;
//                     border-color: #ffffff;
//                     box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.15);
//                 }
//                 .navtheme-input::placeholder {
//                     color: #fefefe;
//                 }
//                 .navtheme-label {
//                     font-family: monospace;
//                     color: #fefefe;
//                     margin-bottom: 0.35rem;
//                     display: block;
//                 }
//                 .navtheme-btn-dark {
//                     font-family: monospace;
//                     font-weight: 500;
//                     background-color: #f1f1f1;
//                     color: #1D2023;
//                     border: 1px solid #f1f1f1;
//                     transition: all 0.2s ease;
//                 }
//                 .navtheme-btn-dark:hover {
//                     background-color: transparent;
//                     color: #f1f1f1;
//                     border: 1px solid #f1f1f1;
//                 }
//                 .navtheme-btn-outline {
//                     font-family: monospace;
//                     font-weight: 500;
//                     background-color: transparent;
//                     color: #f1f1f1;
//                     border: 1px solid rgba(255,255,255,0.5);
//                     transition: all 0.2s ease;
//                 }
//                 .navtheme-btn-outline:hover {
//                     background-color: rgba(255,255,255,0.1);
//                     color: #f1f1f1;
//                     border: 1px solid #f1f1f1;
//                 }

//                 .navtheme-password-wrap {
//                     position: relative;
//                 }
//                 .navtheme-password-wrap input {
//                     padding-right: 44px;
//                 }
//                 .navtheme-eye-btn {
//                     position: absolute;
//                     top: 50%;
//                     right: 10px;
//                     transform: translateY(-50%);
//                     background: none;
//                     border: none;
//                     padding: 4px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     color: #f1f1f1;
//                     cursor: pointer;
//                     opacity: 0.8;
//                 }
//                 .navtheme-eye-btn:hover {
//                     opacity: 1;
//                 }

//                 .navtheme-toast {
//                     background-color: #1D2023;
//                     border: 1px solid rgba(255,255,255,0.3);
//                     font-family: monospace;
//                 }
//                 .navtheme-toast .toast-header {
//                     background-color: #1D2023;
//                     color: #f1f1f1;
//                     border-bottom: 1px solid rgba(255,255,255,0.2);
//                 }
//                 .navtheme-toast-success .toast-body {
//                     color: #7ee8a7;
//                 }
//                 .navtheme-toast-danger .toast-body {
//                     color: #ff8a8a;
//                 }
//             `}</style>

//             <Modal show={show} onHide={handleClose} contentClassName="navtheme-modal-content" size="lg" centered>
//                 <Modal.Header closeButton closeVariant="white">
//                     <Modal.Title className="navtheme-title">Personal Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form action="">
//                         <Row className="g-3">
//                             <Col md={6}>
//                                 <label htmlFor="fullname" className="navtheme-label">Full Name</label>
//                                 <input
//                                     type="text"
//                                     onChange={handleChanges}
//                                     className="form-control navtheme-input"
//                                     name="fullname"
//                                     id="fullname"
//                                     placeholder="Enter your full name"
//                                 />
//                             </Col>

//                             <Col md={6}>
//                                 <label htmlFor="email" className="navtheme-label">Email</label>
//                                 <input
//                                     type="email"
//                                     onChange={handleChanges}
//                                     className="form-control navtheme-input"
//                                     name="email"
//                                     id="email"
//                                     aria-describedby="emailHelpId"
//                                     placeholder="abc@mail.com"
//                                 />
//                             </Col>

//                             <Col md={6}>
//                                 <label htmlFor="phone" className="navtheme-label">Contact Number</label>
//                                 <input
//                                     type="number"
//                                     onChange={handleChanges}
//                                     className="form-control navtheme-input"
//                                     name="phone"
//                                     id="phone"
//                                     placeholder="03XXXXXXXXX"
//                                 />
//                             </Col>

//                             <Col md={6}>
//                                 <label htmlFor="city" className="navtheme-label">Address</label>
//                                 <input
//                                     type="text"
//                                     onChange={handleChanges}
//                                     className="form-control navtheme-input"
//                                     name="city"
//                                     id="city"
//                                     placeholder="Enter your address"
//                                 />
//                             </Col>

//                             <Col md={6}>
//                                 <label htmlFor="password" className="navtheme-label">Password</label>
//                                 <div className="navtheme-password-wrap">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         onChange={handleChanges}
//                                         className="form-control navtheme-input"
//                                         name="password"
//                                         id="password"
//                                         placeholder="Enter a password"
//                                     />
//                                     <button
//                                         type="button"
//                                         className="navtheme-eye-btn"
//                                         onClick={() => setShowPassword((s) => !s)}
//                                         aria-label={showPassword ? "Hide password" : "Show password"}
//                                         tabIndex={-1}
//                                     >
//                                         {showPassword ? (
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//                                                 <line x1="1" y1="1" x2="23" y2="23"></line>
//                                             </svg>
//                                         ) : (
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                                                 <circle cx="12" cy="12" r="3"></circle>
//                                             </svg>
//                                         )}
//                                     </button>
//                                 </div>
//                             </Col>

//                             <Col md={6}>
//                                 <label htmlFor="image" className="navtheme-label">Choose file</label>
//                                 <input
//                                     type="file"
//                                     onChange={handleChanges}
//                                     className="form-control navtheme-input"
//                                     name="image"
//                                     id="image"
//                                 />
//                             </Col>
//                         </Row>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button className="navtheme-btn-outline" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button className="navtheme-btn-dark" onClick={handleSubmit} disabled={loading}>
//                         {loading ? "Register..." : "Register"}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <VerifyOTP
//                 show={showOtp}
//                 handleClose={handleOtpClose}
//                 email={form.email}
//                 onVerified={handleVerified}
//             />

//             <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
//                 <Toast
//                     onClose={() => setToast((t) => ({ ...t, show: false }))}
//                     show={toast.show}
//                     delay={3000}
//                     autohide
//                     className={`navtheme-toast navtheme-toast-${toast.variant}`}
//                 >
//                     <Toast.Header closeVariant="white">
//                         <strong className="me-auto">
//                             {toast.variant === "success" ? "Success" : "Error"}
//                         </strong>
//                     </Toast.Header>
//                     <Toast.Body>{toast.message}</Toast.Body>
//                 </Toast>
//             </ToastContainer>
//         </>
//     );
// }

// export default SignUp;

// Sign-up modal — registration form with file upload, triggers OTP verification after successful signup
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import VerifyOTP from './VerifyOTP';

function SignUp({ onAuthSuccess }) {
    const [show, setShow] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
    const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOtpClose = () => setShowOtp(false);

    const [form, setForm] = useState({

        fullname: "", email: "", image: "", phone: "", city: "", password: ""
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const newForm = new FormData();
            newForm.append("fullname", form.fullname);
            newForm.append("email", form.email);
            newForm.append("image", form.image);
            newForm.append("phone", form.phone);
            newForm.append("city", form.city);
            newForm.append("password", form.password);

            const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/signUp", newForm);
            showToast("Registered successfully! Check your email for the OTP.", "success");

            handleClose();
            setShowOtp(true);
            onAuthSuccess?.(); // collapse mobile navbar

        } catch (error) {
            showToast(error.response?.data?.message || "Something went wrong. Please try again.", "danger");
        } finally {
            setLoading(false);
        }
    };

    const handleChanges = (e) => {
        const { name, value, files, type } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value }));
    };

    const handleVerified = () => {
        showToast("Account verified! You can now log in.", "success");
        onAuthSuccess?.();
    };

    return (
        <>
            <Button className="navtheme-navbtn font-exo" onClick={handleShow}>
                SignUp
            </Button>

            <style>{`
                .navtheme-navbtn {
                    background-color: transparent;
                    color: #f1f1f1;
                    border: 1px solid rgba(255,255,255,0.5);
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }
                .navtheme-navbtn:hover {
                    background-color: #f1f1f1;
                    color: #1D2023;
                    border: 1px solid #f1f1f1;
                }
                .navtheme-modal-content {
                    background-color: #1D2023;
                    border: 2px solid white;
                    color: #f1f1f1;
                }
                .navtheme-modal-content .modal-header {
                    border-bottom: 1px solid rgba(255,255,255,0.25);
                }
                .navtheme-modal-content .modal-footer {
                    border-top: 1px solid rgba(255,255,255,0.25);
                }
                .navtheme-title {
                    font-family: 'Exo', sans-serif;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    color: #f1f1f1;
                }
                .navtheme-input {
                    background-color: #26292d;
                    border: 1px solid rgba(255,255,255,0.3);
                    color: #f1f1f1;
                    font-family: 'Exo', sans-serif;
                }
                .navtheme-input:focus {
                    background-color: #26292d;
                    color: #f1f1f1;
                    border-color: #ffffff;
                    box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.15);
                }
                .navtheme-input::placeholder { color: #fefefe; }
                .navtheme-label {
                    font-family: 'Exo', sans-serif;
                    color: #fefefe;
                    margin-bottom: 0.3rem;
                    display: block;
                    font-size: 14px;
                }
                .navtheme-btn-dark {
                    font-family: 'Exo', sans-serif;
                    font-weight: 500;
                    background-color: #f1f1f1;
                    color: #1D2023;
                    border: 1px solid #f1f1f1;
                    transition: all 0.2s ease;
                }
                .navtheme-btn-dark:hover {
                    background-color: transparent;
                    color: #f1f1f1;
                    border: 1px solid #f1f1f1;
                }
                .navtheme-btn-outline {
                    font-family: 'Exo', sans-serif;
                    font-weight: 500;
                    background-color: transparent;
                    color: #f1f1f1;
                    border: 1px solid rgba(255,255,255,0.5);
                    transition: all 0.2s ease;
                }
                .navtheme-btn-outline:hover {
                    background-color: rgba(255,255,255,0.1);
                    color: #f1f1f1;
                    border: 1px solid #f1f1f1;
                }
                .navtheme-password-wrap { position: relative; }
                .navtheme-password-wrap input { padding-right: 44px; }
                .navtheme-eye-btn {
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f1f1f1;
                    cursor: pointer;
                    opacity: 0.8;
                }
                .navtheme-eye-btn:hover { opacity: 1; }
                .navtheme-toast {
                    background-color: #1D2023;
                    border: 1px solid rgba(255,255,255,0.3);
                    font-family: 'Exo', sans-serif;
                }
                .navtheme-toast .toast-header {
                    background-color: #1D2023;
                    color: #f1f1f1;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                }
                .navtheme-toast-success .toast-body { color: #7ee8a7; }
                .navtheme-toast-danger .toast-body { color: #ff8a8a; }

                /* Mobile compaction for SignUp modal */
                @media (max-width: 575.98px) {
    .navtheme-modal-content .modal-body {
        padding: 16px;
    }
    .navtheme-label {
        font-size: 13px;
        margin-bottom: 0.25rem;
    }
    .navtheme-input {
        padding: 0.4rem 0.65rem;
        font-size: 14px;
    }
}
            `}</style>

            <Modal
                show={show}
                onHide={handleClose}
                contentClassName="navtheme-modal-content"
                size="lg"
                // fullscreen="sm-down"
                centered
            >
                <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
                    <Toast onClose={() => setToast((t) => ({ ...t, show: false }))} show={toast.show} delay={3000} autohide className={`navtheme-toast navtheme-toast-${toast.variant}`}>
                        <Toast.Header closeVariant="white">
                            <strong className="me-auto">{toast.variant === "success" ? "Success" : "Error"}</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="navtheme-title">Personal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="navtheme-signup-body" style={{ overflowY: "auto" }}>
                    <form action="">
                        <Row className="g-3">
                            <Col xs={6}>
                                <label htmlFor="fullname" className="navtheme-label">Full Name</label>
                                <input type="text" onChange={handleChanges} className="form-control navtheme-input" name="fullname" id="fullname" placeholder="Enter your full name" />
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="email" className="navtheme-label">Email</label>
                                <input type="email" onChange={handleChanges} className="form-control navtheme-input" name="email" id="email" placeholder="abc@mail.com" />
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="phone" className="navtheme-label">Contact Number</label>
                                <input type="number" onChange={handleChanges} className="form-control navtheme-input" name="phone" id="phone" placeholder="03XXXXXXXXX" />
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="city" className="navtheme-label">Address</label>
                                <input type="text" onChange={handleChanges} className="form-control navtheme-input" name="city" id="city" placeholder="Enter your address" />
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="password" className="navtheme-label">Password</label>
                                <div className="navtheme-password-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        onChange={handleChanges}
                                        className="form-control navtheme-input"
                                        name="password" id="password" placeholder="Enter a password"
                                    />
                                    <button type="button" className="navtheme-eye-btn" onClick={() => setShowPassword((s) => !s)} tabIndex={-1}>
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="image" className="navtheme-label">Choose file</label>
                                <input type="file" onChange={handleChanges} className="form-control navtheme-input" name="image" id="image" />
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="navtheme-btn-outline" onClick={handleClose}>Close</Button>
                    <Button className="navtheme-btn-dark" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Register..." : "Register"}
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    );
}

export default SignUp;