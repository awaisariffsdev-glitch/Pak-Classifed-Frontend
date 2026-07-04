
// import { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';
// import axios from 'axios';
// import { UserContext } from '../Context/UserContext';

// function Profile() {
//     const { current, loggedIn } = useContext(UserContext);
//     const navigate = useNavigate();
//     const { id: paramId } = useParams();

//     const profileId = paramId || current?._id || current?.id;
//     const isOwnProfile = current && (current._id === profileId || current.id === profileId);

//     const [profileData, setProfileData] = useState(null);
//     const [fetching, setFetching] = useState(true);

//     const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
//     const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

//     // If not logged in, bounce back to home (or wherever your login lives)
//     useEffect(() => {
//         if (!loggedIn) {
//             navigate("/", { replace: true });
//         }
//     }, [loggedIn, navigate]);

//     useEffect(() => {
//         if (!loggedIn) return; // don't fetch anything if not logged in

//         if (!profileId) {
//             setFetching(false);
//             showToast("No user ID provided", "danger");
//             return;
//         }

//         const fetchProfile = async () => {
//             setFetching(true);
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get(
//                     `http://localhost:8080/user/find/${profileId}`,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );

//                 const userData = response.data.userFindById || response.data.user || response.data;
//                 setProfileData(userData);

//             } catch (error) {
//                 console.log("STATUS:", error.response?.status);
//                 console.log("MESSAGE:", error.response?.data?.message);
//                 showToast(
//                     error.response?.data?.message || "Could not load profile",
//                     "danger"
//                 );
//             } finally {
//                 setFetching(false);
//             }
//         };

//         fetchProfile();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [profileId, loggedIn]);

//     // Not logged in — render nothing while the redirect effect above kicks in
//     if (!loggedIn) {
//         return null;
//     }

//     if (fetching) {
//         return (
//             <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
//                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Loading profile...</p>
//                 <style>{pageStyles}</style>
//             </div>
//         );
//     }

//     if (!profileData) {
//         return (
//             <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
//                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Profile not found.</p>
//                 <style>{pageStyles}</style>
//             </div>
//         );
//     }

//     const imageSrc = profileData?.image
//         ? `http://localhost:8080/${profileData.image}`
//         : "https://picsum.photos/200/300";

//     return (
//         <div className="navtheme-page d-flex justify-content-center">
//             <div className="navtheme-card">

//                 <div className="navtheme-card-header">
//                     <h2 className="navtheme-title m-0">
//                         {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
//                     </h2>
//                 </div>

//                 <div className="navtheme-card-body">

//                     <div className="d-flex flex-column align-items-center mb-4">
//                         <img
//                             src={imageSrc}
//                             alt="Profile"
//                             className="navtheme-profile-img"
//                         />
//                     </div>

//                     <div className="row g-3">
//                         <div className="col-md-6">
//                             <label className="navtheme-label">Full Name</label>
//                             <p className="navtheme-value">{profileData?.fullname || "—"}</p>
//                         </div>

//                         <div className="col-md-6">
//                             <label className="navtheme-label">Email</label>
//                             <p className="navtheme-value">{profileData?.email || "—"}</p>
//                         </div>

//                         <div className="col-md-6">
//                             <label className="navtheme-label">Contact Number</label>
//                             <p className="navtheme-value">{profileData?.phone || "—"}</p>
//                         </div>

//                         <div className="col-md-6">
//                             <label className="navtheme-label">Address</label>
//                             <p className="navtheme-value">{profileData?.city || "—"}</p>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="navtheme-card-footer d-flex justify-content-end gap-2">
//                     <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
//                         Back
//                     </Button>
//                 </div>

//             </div>

//             <style>{pageStyles}</style>

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
//         </div>
//     );
// }

// const pageStyles = `
//     .navtheme-page {
//         background-color: #0f1113;
//         min-height: 100vh;
//         padding: 50px 20px;
//         font-family: monospace;
//     }
//     .navtheme-card {
//         background-color: #1D2023;
//         border: 2px solid white;
//         border-radius: 10px;
//         width: 100%;
//         max-width: 700px;
//         color: #f1f1f1;
//         overflow: hidden;
//     }
//     .navtheme-card-header {
//         padding: 24px 32px;
//         border-bottom: 1px solid rgba(255,255,255,0.25);
//     }
//     .navtheme-card-body {
//         padding: 32px;
//     }
//     .navtheme-card-footer {
//         padding: 20px 32px;
//         border-top: 1px solid rgba(255,255,255,0.25);
//     }
//     .navtheme-title {
//         font-family: monospace;
//         font-weight: 500;
//         letter-spacing: 0.5px;
//         color: #f1f1f1;
//     }
//     .navtheme-profile-img {
//         width: 110px;
//         height: 110px;
//         border-radius: 50%;
//         object-fit: cover;
//         border: 3px solid rgba(255,255,255,0.5);
//     }
//     .navtheme-label {
//         font-family: monospace;
//         color: #fefefe;
//         margin-bottom: 0.35rem;
//         display: block;
//     }
//     .navtheme-value {
//         font-family: monospace;
//         color: #f1f1f1;
//         background-color: #26292d;
//         border: 1px solid rgba(255,255,255,0.2);
//         border-radius: 6px;
//         padding: 8px 12px;
//         margin: 0;
//         min-height: 40px;
//         display: flex;
//         align-items: center;
//     }
//     .navtheme-btn-outline {
//         font-family: monospace;
//         font-weight: 500;
//         background-color: transparent;
//         color: #f1f1f1;
//         border: 1px solid rgba(255,255,255,0.5);
//         transition: all 0.2s ease;
//     }
//     .navtheme-btn-outline:hover {
//         background-color: rgba(255,255,255,0.1);
//         color: #f1f1f1;
//         border: 1px solid #f1f1f1;
//     }
//     .navtheme-toast {
//         background-color: #1D2023;
//         border: 1px solid rgba(255,255,255,0.3);
//         font-family: monospace;
//     }
//     .navtheme-toast .toast-header {
//         background-color: #1D2023;
//         color: #f1f1f1;
//         border-bottom: 1px solid rgba(255,255,255,0.2);
//     }
//     .navtheme-toast-success .toast-body { color: #7ee8a7; }
//     .navtheme-toast-danger .toast-body { color: #ff8a8a; }
// `;

// export default Profile;


import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

function Profile() {
    const { current, loggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const { id: paramId } = useParams();

    const profileId = paramId || current?._id || current?.id;
    const isOwnProfile = current && (current._id === profileId || current.id === profileId);

    const [profileData, setProfileData] = useState(null);
    const [fetching, setFetching] = useState(true);

    const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
    const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

    useEffect(() => {
        if (!loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (!loggedIn) return;

        if (!profileId) {
            setFetching(false);
            showToast("No user ID provided", "danger");
            return;
        }

        const fetchProfile = async () => {
            setFetching(true);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8080/user/find/${profileId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const userData = response.data.userFindById || response.data.user || response.data;
                setProfileData(userData);

            } catch (error) {
                console.log("STATUS:", error.response?.status);
                console.log("MESSAGE:", error.response?.data?.message);
                showToast(
                    error.response?.data?.message || "Could not load profile",
                    "danger"
                );
            } finally {
                setFetching(false);
            }
        };

        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileId, loggedIn]);

    if (!loggedIn) {
        return null;
    }

    if (fetching) {
        return (
            <div className="navtheme-page d-flex align-items-center justify-content-center">
                <p className="navtheme-label" style={{ fontSize: "16px" }}>Loading profile...</p>
                <style>{pageStyles}</style>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="navtheme-page d-flex align-items-center justify-content-center">
                <p className="navtheme-label" style={{ fontSize: "16px" }}>Profile not found.</p>
                <style>{pageStyles}</style>
            </div>
        );
    }

    const imageSrc = profileData?.image
        ? `http://localhost:8080/${profileData.image}`
        : "https://picsum.photos/200/300";

    return (
        <div className="mt-3 d-flex align-items-center justify-content-center">
            <div className="navtheme-card">

                <div className="navtheme-card-header">
                    <h2 className="navtheme-title m-0">
                        {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
                    </h2>
                </div>

                <div className="navtheme-card-body d-flex align-items-center gap-4">

                    <div className="navtheme-avatar-col">
                        <img
                            src={imageSrc}
                            alt="Profile"
                            className="navtheme-profile-img"
                        />
                        <p className="navtheme-value navtheme-name-tag">
                            {profileData?.fullname || "—"}
                        </p>
                    </div>

                    <div className="navtheme-details-col">
                        <div className="row g-3">
                            <div className="col-6">
                                <label className="navtheme-label">Full Name</label>
                                <p className="navtheme-value">{profileData?.fullname || "—"}</p>
                            </div>

                            <div className="col-6">
                                <label className="navtheme-label">Email</label>
                                <p className="navtheme-value">{profileData?.email || "—"}</p>
                            </div>

                            <div className="col-6">
                                <label className="navtheme-label">Contact Number</label>
                                <p className="navtheme-value">{profileData?.phone || "—"}</p>
                            </div>

                            <div className="col-6">
                                <label className="navtheme-label">Address</label>
                                <p className="navtheme-value">{profileData?.city || "—"}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="navtheme-card-footer d-flex justify-content-end gap-2">
                    <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>

            </div>

            <style>{pageStyles}</style>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
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
        </div>
    );
}

const pageStyles = `
   
    .navtheme-page {
        background-color: #e6e3e3;
        
        width: 100%;
        overflow: hidden;
        padding: 20px
        font-family: monospace;
        box-sizing: border-box;
    }

    .navtheme-card {
        background-color: #1D2023;
        border: 2px solid white;
        border-radius: 10px;
        width: 100%;
        max-width: 900px;
        max-height: 90vh;
        color: #f1f1f1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
        @media (max-width: 700px) {
    .navtheme-page {
        padding: 12px;
        height: 100vh;
    }
    .navtheme-card {
        max-height: 96vh;
    }
    .navtheme-card-body {
        flex-direction: column;
        padding: 16px;
        gap: 16px !important;
        overflow-y: auto;
    }
    .navtheme-avatar-col {
        width: 100%;
    }
    .navtheme-profile-img {
        width: 90px;
        height: 90px;
    }
    .navtheme-card-header, .navtheme-card-footer {
        padding: 14px 18px;
    }
    .navtheme-title {
        font-size: 18px;
    }
}

    .navtheme-card-header {
        padding: 20px 32px;
        border-bottom: 1px solid rgba(255,255,255,0.25);
        flex-shrink: 0;
    }

    .navtheme-card-body {
        padding: 28px 32px;
        flex: 1;
        min-height: 0;
    }

    .navtheme-card-footer {
        padding: 16px 32px;
        border-top: 1px solid rgba(255,255,255,0.25);
        flex-shrink: 0;
    }

    .navtheme-title {
        font-family: monospace;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: #f1f1f1;
    }

    .navtheme-avatar-col {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 180px;
    }

    .navtheme-profile-img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(255,255,255,0.5);
        margin-bottom: 12px;
    }

    .navtheme-name-tag {
        text-align: center;
        width: 100%;
        font-size: 14px;
        word-break: break-word;
    }

    .navtheme-details-col {
        flex: 1;
        min-width: 0;
    }

    .navtheme-label {
        font-family: monospace;
        color: #fefefe;
        margin-bottom: 0.3rem;
        display: block;
        font-size: 13px;
    }

    .navtheme-value {
        font-family: monospace;
        color: #f1f1f1;
        background-color: #26292d;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        padding: 8px 12px;
        margin: 0;
        min-height: 40px;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .navtheme-toast-success .toast-body { color: #7ee8a7; }
    .navtheme-toast-danger .toast-body { color: #ff8a8a; }

    @media (max-width: 700px) {
        .navtheme-card-body {
            flex-direction: column;
        }
        .navtheme-avatar-col {
            width: 100%;
        }
    }
`;

export default Profile;