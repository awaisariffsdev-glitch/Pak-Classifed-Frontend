// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

// function VerifyOTP({ show, handleClose, email, onVerified }) {
//     const [otp, setOtp] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleOtpChange = (e) => {
//         setOtp(e.target.value);
//         setError("");
//     };

//     const handleVerify = async () => {
//         if (!otp) {
//             setError("Please enter the OTP sent to your email");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/verify", {
//                 email,
//                 otp
//             });

//             console.log("Account Verified Successfully", response.data);

//             if (onVerified) {
//                 onVerified();
//             }

//             handleClose();
//         } catch (error) {
//             console.log(error);
//             console.log(error.response);
//             setError(
//                 error.response?.data?.message || "Failed to verify OTP. Please try again."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResend = async () => {
//         setError("");
//         setLoading(true);
//         try {
//             const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/verify", {
//                 email
//             });
//             console.log("OTP Resent", response.data);
//         } catch (error) {
//             console.log(error);
//             setError(
//                 error.response?.data?.message || "Failed to resend OTP. Please try again."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Verify OTP</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p className="mb-3">
//                     We've sent a verification code to <strong>{email}</strong>. Please enter it below.
//                 </p>

//                 <div className="form-floating mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="otp"
//                         id="otp"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         maxLength={6}
//                     />
//                     <label htmlFor="otp">Enter OTP</label>
//                 </div>

//                 {error && <p className="text-danger small mb-0">{error}</p>}

//                 <p className="mt-3 mb-0 small">
//                     Didn't receive the code?{" "}
//                     <span
//                         role="button"
//                         className="text-primary text-decoration-underline"
//                         onClick={handleResend}
//                     >
//                         Resend OTP
//                     </span>
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose} disabled={loading}>
//                     Cancel
//                 </Button>
//                 <Button variant="dark" onClick={handleVerify} disabled={loading}>
//                     {loading ? "Verifying..." : "Verify"}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default VerifyOTP;


// OTP verification modal — verifies email via OTP input with resend capability and toast feedback
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

function VerifyOTP({ show, handleClose, email, onVerified }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success" // "success" | "danger"
    });

    const showToast = (message, variant = "success") => {
        setToast({ show: true, message, variant });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerify = async () => {
        if (!otp) {
            showToast("Please enter the OTP sent to your email", "danger");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/verify", {
                email,
                otp
            });

            console.log("Account Verified Successfully", response.data);
            showToast("Account verified successfully!", "success");

            if (onVerified) {
                onVerified();
            }

            setTimeout(() => {
                handleClose();
            }, 1200);

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("MESSAGE:", error.response?.data?.message);
            showToast(
                error.response?.data?.message || "Failed to verify OTP. Please try again.",
                "danger"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        try {
            // ✅ Resend must hit the "send OTP" endpoint, not /user/verify
            const response = await axios.post("https://pak-classifed-backend-production.up.railway.app/user/requestSignUp", {
                email,
                resend:true
            });
            console.log("OTP Resent", response.data);
            showToast("A new OTP has been sent to your email", "success");
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("MESSAGE:", error.response?.data?.message);
            showToast(
                error.response?.data?.message || "Failed to resend OTP. Please try again.",
                "danger"
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered contentClassName="navtheme-modal-content">
                <style>{`
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
                        font-family: monospace;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        color: #f1f1f1;
                    }
                    .navtheme-text {
                        font-family: monospace;
                        color: #cfd2d6;
                    }
                    .navtheme-input {
                        background-color: #26292d;
                        border: 1px solid rgba(255,255,255,0.3);
                        color: #f1f1f1;
                        font-family: monospace;
                    }
                    .navtheme-input:focus {
                        background-color: #26292d;
                        color: #f1f1f1;
                        border-color: #ffffff;
                        box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.15);
                    }
                    .navtheme-input::placeholder {
                        color: #8a8d91;
                    }
                    .navtheme-label {
                        font-family: monospace;
                        color: #8a8d91;
                    }
                    .navtheme-link {
                        font-family: monospace;
                        color: #ffffff !important;
                        text-decoration: underline;
                        cursor: pointer;
                        transition: opacity 0.2s ease;
                    }
                    .navtheme-link:hover {
                        opacity: 0.7;
                    }
                    .navtheme-btn-dark {
                        font-family: monospace;
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
                        font-family: monospace;
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
                `}</style>

                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="navtheme-title">Verify OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-3 navtheme-text">
                        We've sent a verification code to <strong>{email}</strong>. Please enter it below.
                    </p>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control navtheme-input"
                            name="otp"
                            id="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength={6}
                        />
                        <label htmlFor="otp" className="navtheme-label">Enter OTP</label>
                    </div>

                    <p className="mt-3 mb-0 small navtheme-text">
                        Didn't receive the code?{" "}
                        <span
                            role="button"
                            className="navtheme-link"
                            onClick={!resending ? handleResend : undefined}
                        >
                            {resending ? "Resending..." : "Resend OTP"}
                        </span>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                  
                    <Button
                        className="navtheme-btn-dark"
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
                <style>{`
                    .navtheme-toast {
                        background-color: #1D2023;
                        border: 1px solid rgba(255,255,255,0.3);
                        font-family: monospace;
                    }
                    .navtheme-toast .toast-header {
                        background-color: #1D2023;
                        color: #f1f1f1;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .navtheme-toast-success .toast-body {
                        color: #7ee8a7;
                    }
                    .navtheme-toast-danger .toast-body {
                        color: #ff8a8a;
                    }
                `}</style>
                <Toast
                    onClose={() => setToast((t) => ({ ...t, show: false }))}
                    show={toast.show}
                    delay={3000}
                    autohide
                    className={`navtheme-toast navtheme-toast-${toast.variant}`}
                >
                    <Toast.Header closeVariant="white">
                        <strong className="me-auto">
                            {toast.variant === "success" ? "Success" : "Error"}
                        </strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default VerifyOTP;