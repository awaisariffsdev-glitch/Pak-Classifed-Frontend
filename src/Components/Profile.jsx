
// import { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';
// import axios from 'axios';
// import { UserContext } from '../Context/UserContext';
// import EditProfileModal from './EditProfileModal';
// // import UpdateCarModal from './UpdateCarModal';
// import UpdateCarModal from './UpdateCarModel';

// import { UserCarContext } from '../Context/UserCarContext';
// import { CarUpdateContext } from '../Context/CarUpdateContext';
// function Profile() {
//     const { current, loggedIn } = useContext(UserContext);
//     const { userCars, carsLoading, carsError, fetchUserCars, clearUserCars } = useContext(UserCarContext); // ADDED
//     const navigate = useNavigate();
//     const { id: paramId } = useParams();

//     const { updateCar, deleteCar, loading } = useContext(CarUpdateContext);

//     const profileId = paramId || current?._id || current?.id;
//     const isOwnProfile = current && (current._id === profileId || current.id === profileId);

//     const [profileData, setProfileData] = useState(null);
//     const [fetching, setFetching] = useState(true);
//     const [showModel, setShowModel] = useState(false);
//     const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
//     const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

//     // which car (if any) is currently being edited, and whether that modal is open
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [showCarModal, setShowCarModal] = useState(false);

 
//     const [deletingCarId, setDeletingCarId] = useState(null);

//     const openEditCar = (car) => {
//         setSelectedCar(car);
//         setShowCarModal(true);
//     };

//     const closeEditCar = () => {
//         setShowCarModal(false);
//         setSelectedCar(null);
//     };

//     // ADDED: quick delete straight from the car card, gated behind window.confirm
//     const handleDeleteCar = async (car) => {
//         if (!car?._id) return;

//         const confirmed = window.confirm(
//             `Delete "${car.title || 'this car'}"? This can't be undone.`
//         );
//         if (!confirmed) return;

//         setDeletingCarId(car._id);
//         const result = await deleteCar(car._id, profileId);
//         setDeletingCarId(null);

//         if (result.success) {
//             showToast(result.message || "Car deleted successfully.", "success");
//         } else {
//             showToast(result.message || "Failed to delete car.", "danger");
//         }
//     };

//     useEffect(() => {
//         if (!loggedIn) {
//             navigate("/", { replace: true });
//         }
//     }, [loggedIn, navigate]);

//     useEffect(() => {
//         if (!loggedIn) return;

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

//     // ADDED: trigger the context's fetch whenever this profile's ID changes
//     useEffect(() => {
//         if (!loggedIn || !profileId) return;
//         fetchUserCars(profileId);

//         return () => clearUserCars(); // ADDED: clear on unmount/navigation so stale data doesn't flash on the next profile
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [profileId, loggedIn]);

//     if (!loggedIn) {
//         return null;
//     }

//     if (fetching) {
//         return (
//             <div className="navtheme-page d-flex align-items-center justify-content-center">
//                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Loading profile...</p>
//                 <style>{pageStyles}</style>
//             </div>
//         );
//     }

//     if (!profileData) {
//         return (
//             <div className="navtheme-page d-flex align-items-center justify-content-center">
//                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Profile not found.</p>
//                 <style>{pageStyles}</style>
//             </div>
//         );
//     }

//     const imageSrc = profileData?.image
//         ? `http://localhost:8080/${profileData.image}`
//         : "https://picsum.photos/200/300";

//     return (
//         <div className="navtheme-page-wrap">
//             <div className="mt-3 d-flex align-items-center justify-content-center">
//                 <div className="navtheme-card">

//                     <div className="navtheme-card-header">
//                         <h2 className="navtheme-title m-0">
//                             {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
//                         </h2>
//                     </div>

//                     <div className="navtheme-card-body d-flex align-items-center gap-4">

//                         <div className="navtheme-avatar-col">
//                             <img
//                                 src={imageSrc}
//                                 alt="Profile"
//                                 className="navtheme-profile-img"
//                             />
//                             <p className="navtheme-value navtheme-name-tag">
//                                 {profileData?.fullname || "—"}
//                             </p>
//                         </div>

//                         <div className="navtheme-details-col">
//                             <div className="row g-3">
//                                 <div className="col-6">
//                                     <label className="navtheme-label">Full Name</label>
//                                     <p className="navtheme-value">{profileData?.fullname || "—"}</p>
//                                 </div>
//                                 <div className="col-6">
//                                     <label className="navtheme-label">Email</label>
//                                     <p className="navtheme-value">{profileData?.email || "—"}</p>
//                                 </div>
//                                 <div className="col-6">
//                                     <label className="navtheme-label">Contact Number</label>
//                                     <p className="navtheme-value">{profileData?.phone || "—"}</p>
//                                 </div>
//                                 <div className="col-6">
//                                     <label className="navtheme-label">Address</label>
//                                     <p className="navtheme-value">{profileData?.city || "—"}</p>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="navtheme-card-footer d-flex justify-content-end gap-2">
//                         {isOwnProfile && (
//                             <Button className="navtheme-btn-outline" onClick={() => { setShowModel(true) }}>Edit Profile</Button>
//                         )}
//                         <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
//                             Back
//                         </Button>
//                     </div>

//                 </div>


//                 <EditProfileModal
//                     show={showModel}
//                     onHide={() => setShowModel(false)}
//                     profileData={profileData}
//                 />
//             </div>

//             {/* User's posted cars — now driven by UserCarsContext */}
//             <div className="navtheme-usercars-section">
//                 <h3 className="navtheme-usercars-heading">
//                     {isOwnProfile ? "My Listed Cars" : `${profileData.fullname || "User"}'s Listed Cars`}
//                 </h3>

//                 {carsLoading && (
//                     <p className="navtheme-label text-center">Loading cars...</p>
//                 )}

//                 {carsError && !carsLoading && (
//                     <p className="navtheme-label text-center" style={{ color: '#ff8a8a' }}>{carsError}</p>
//                 )}

//                 {!carsLoading && !carsError && userCars.length === 0 && (
//                     <p className="navtheme-label text-center">No cars listed yet.</p>
//                 )}

//                 {!carsLoading && !carsError && userCars.length > 0 && (
//                     <div className="navtheme-usercars-grid">
//                         {userCars.map((car) => {
//                             const isDeletingThisCar = deletingCarId === car._id;
//                             return (
//                                 <div key={car._id} className="navtheme-usercar-card">
//                                     <div className="navtheme-usercar-img-wrap">
//                                         <img
//                                             src={car?.image ? `http://localhost:8080/${car.image}` : "https://picsum.photos/400/300"}
//                                             alt={car.title}
//                                             className="navtheme-usercar-img"
//                                         />
//                                     </div>
//                                     <div className="navtheme-usercar-info">
//                                         <h5 className="navtheme-usercar-title">{car.title}</h5>
//                                         <p className="navtheme-usercar-meta">{car.brand} • {car.model} • {car.year}</p>
//                                         <p className="navtheme-usercar-price">PKR {car.price}</p>

//                                         {/* only the owner can edit/delete their own listed cars */}
//                                         {isOwnProfile && (
//                                             <div className="navtheme-usercar-actions">
//                                                 {/* ADDED: Delete sits to the left of Edit, confirmed via window.confirm */}
//                                                 <Button
//                                                     size="sm"
//                                                     className="navtheme-btn-danger-outline flex-fill"
//                                                     onClick={() => handleDeleteCar(car)}
//                                                     disabled={isDeletingThisCar || loading}
//                                                 >
//                                                     {isDeletingThisCar ? "Deleting..." : "Delete"}
//                                                 </Button>
//                                                 <Button
//                                                     size="sm"
//                                                     className="navtheme-btn-outline flex-fill"
//                                                     onClick={() => openEditCar(car)}
//                                                     disabled={isDeletingThisCar}
//                                                 >
//                                                     Edit
//                                                 </Button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             <style>{pageStyles}</style>

//             {/* edit/delete modal for a single car, reuses CarUpdateContext */}
//             <UpdateCarModal
//                 show={showCarModal}
//                 onHide={closeEditCar}
//                 car={selectedCar}
//                 userId={profileId}
//                 onDeleted={closeEditCar}
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
//         </div>
//     );
// }

// const pageStyles = `
//     .navtheme-page-wrap {
//         background-color: #e6e3e3;
//         min-height: 100vh;
//         padding: 20px;
//         font-family: monospace;
//         box-sizing: border-box;
//     }
//     .navtheme-card {
//         background-color: #1D2023;
//         border: 2px solid white;
//         border-radius: 10px;
//         width: 100%;
//         max-width: 900px;
//         color: #f1f1f1;
//         display: flex;
//         flex-direction: column;
//         overflow: hidden;
//     }
//     .navtheme-card-header { padding: 20px 32px; border-bottom: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; }
//     .navtheme-card-body { padding: 28px 32px; flex: 1; min-height: 0; }
//     .navtheme-card-footer { padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; }
//     .navtheme-title { font-family: monospace; font-weight: 500; letter-spacing: 0.5px; color: #f1f1f1; }
//     .navtheme-avatar-col { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 180px; }
//     .navtheme-profile-img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.5); margin-bottom: 12px; }
//     .navtheme-name-tag { text-align: center; width: 100%; font-size: 14px; word-break: break-word; }
//     .navtheme-details-col { flex: 1; min-width: 0; }
//     .navtheme-label { font-family: monospace; color: #1D2023; margin-bottom: 0.3rem; display: block; font-size: 13px; }
//     .navtheme-value { font-family: monospace; color: #f1f1f1; background-color: #26292d; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; margin: 0; min-height: 40px; display: flex; align-items: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
//     .navtheme-btn-outline { font-family: monospace; font-weight: 500; background-color: transparent; color: #f1f1f1; border: 1px solid rgba(255,255,255,0.5); transition: all 0.2s ease; }
//     .navtheme-btn-outline:hover { background-color: rgba(255,255,255,0.1); color: #f1f1f1; border: 1px solid #f1f1f1; }
//     .navtheme-btn-outline:disabled { opacity: 0.5; cursor: not-allowed; }
//     .navtheme-btn-danger-outline { font-family: monospace; font-weight: 500; background-color: transparent; color: #ff8a8a; border: 1px solid rgba(255,138,138,0.6); transition: all 0.2s ease; }
//     .navtheme-btn-danger-outline:hover { background-color: rgba(255,138,138,0.15); color: #ff8a8a; border: 1px solid #ff8a8a; }
//     .navtheme-btn-danger-outline:disabled { opacity: 0.5; cursor: not-allowed; }
//     .navtheme-toast { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.3); font-family: monospace; }
//     .navtheme-toast .toast-header { background-color: #1D2023; color: #f1f1f1; border-bottom: 1px solid rgba(255,255,255,0.2); }
//     .navtheme-toast-success .toast-body { color: #7ee8a7; }
//     .navtheme-toast-danger .toast-body { color: #ff8a8a; }

//     .navtheme-usercars-section { max-width: 900px; margin: 32px auto 0; }
//     .navtheme-usercars-heading { color: #1D2023; font-family: monospace; font-weight: 700; text-align: center; margin-bottom: 20px; }
//     .navtheme-usercars-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
//     .navtheme-usercar-card { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.25); border-radius: 10px; overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease; }
//     .navtheme-usercar-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
//     .navtheme-usercar-img-wrap { width: 100%; aspect-ratio: 4 / 3; background-color: #26292d; overflow: hidden; }
//     .navtheme-usercar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
//     .navtheme-usercar-info { padding: 12px 14px 16px; }
//     .navtheme-usercar-title { color: #f1f1f1; font-size: 15px; font-weight: 600; margin: 0 0 6px; }
//     .navtheme-usercar-meta { color: #cfcfcf; font-size: 12px; margin: 0 0 6px; }
//     .navtheme-usercar-price { color: #7ee8a7; font-size: 14px; font-weight: 600; margin: 0 0 10px; }
//     .navtheme-usercar-actions { display: flex; gap: 8px; }

//     @media (max-width: 700px) {
//         .navtheme-page-wrap { padding: 12px; }
//         .navtheme-card-body { flex-direction: column; padding: 16px; gap: 16px !important; }
//         .navtheme-avatar-col { width: 100%; }
//         .navtheme-profile-img { width: 90px; height: 90px; }
//         .navtheme-card-header, .navtheme-card-footer { padding: 14px 18px; }
//         .navtheme-title { font-size: 18px; }
//         .navtheme-usercars-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
//     }
// `;

// export default Profile;


// Profile page — displays user info and their listed cars; owner can edit profile, edit/delete cars
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import EditProfileModal from './EditProfileModal';
import UpdateCarModal from './UpdateCarModel';

import { UserCarContext } from '../Context/UserCarContext';
import { CarUpdateContext } from '../Context/CarUpdateContext';

function Profile() {
    const { current, loggedIn } = useContext(UserContext);
    const { userCars, carsLoading, carsError, fetchUserCars, clearUserCars } = useContext(UserCarContext);
    const navigate = useNavigate();
    const { id: paramId } = useParams();

    const { updateCar, deleteCar, loading } = useContext(CarUpdateContext);

    const profileId = paramId || current?._id || current?.id;
    const isOwnProfile = current && (current._id === profileId || current.id === profileId);

    const [profileData, setProfileData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
    const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

    // which car (if any) is currently being edited, and whether that modal is open
    const [selectedCar, setSelectedCar] = useState(null);
    const [showCarModal, setShowCarModal] = useState(false);

    // tracks the _id of the car currently being deleted from the card's quick-delete
    // button, so we can disable just that card's buttons instead of every card at once
    const [deletingCarId, setDeletingCarId] = useState(null);

    const openEditCar = (car) => {
        setSelectedCar(car);
        setShowCarModal(true);
    };

    const closeEditCar = () => {
        setShowCarModal(false);
        setSelectedCar(null);
    };

    // quick delete straight from the car card, gated behind window.confirm
    const handleDeleteCar = async (car) => {
        if (!car?._id) return;

        const confirmed = window.confirm(
            `Delete "${car.title || 'this car'}"? This can't be undone.`
        );
        if (!confirmed) return;

        setDeletingCarId(car._id);
        const result = await deleteCar(car._id, profileId);
        setDeletingCarId(null);

        if (result.success) {
            showToast(result.message || "Car deleted successfully.", "success");
        } else {
            showToast(result.message || "Failed to delete car.", "danger");
        }
    };

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

    // trigger the context's fetch whenever this profile's ID changes
    useEffect(() => {
        if (!loggedIn || !profileId) return;
        fetchUserCars(profileId);

        return () => clearUserCars(); // clear on unmount/navigation so stale data doesn't flash on the next profile
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileId, loggedIn]);

    // Keep the locally-displayed profileData in sync with UserContext.current.
    // EditProfileModal already calls setCurrent(result.user) on a successful
    // update — this effect mirrors that change into profileData automatically,
    // the same way fetchUserCars() re-populates userCars after a car edit.
    useEffect(() => {
        if (isOwnProfile && current) {
            setProfileData(current);
        }
    }, [current, isOwnProfile]);

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
        <div className="navtheme-page-wrap">
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
                        {isOwnProfile && (
                            <Button className="navtheme-btn-outline" onClick={() => { setShowModel(true) }}>Edit Profile</Button>
                        )}
                        <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                </div>


                <EditProfileModal
                    show={showModel}
                    onHide={() => setShowModel(false)}
                    profileData={profileData}
                />
            </div>

            {/* User's posted cars — now driven by UserCarsContext */}
            <div className="navtheme-usercars-section">
                <h3 className="navtheme-usercars-heading">
                    {isOwnProfile ? "My Listed Cars" : `${profileData.fullname || "User"}'s Listed Cars`}
                </h3>

                {carsLoading && (
                    <p className="navtheme-label text-center">Loading cars...</p>
                )}

                {carsError && !carsLoading && (
                    <p className="navtheme-label text-center" style={{ color: '#ff8a8a' }}>{carsError}</p>
                )}

                {!carsLoading && !carsError && userCars.length === 0 && (
                    <p className="navtheme-label text-center">No cars listed yet.</p>
                )}

                {!carsLoading && !carsError && userCars.length > 0 && (
                    <div className="navtheme-usercars-grid">
                        {userCars.map((car) => {
                            const isDeletingThisCar = deletingCarId === car._id;
                            return (
                                <div key={car._id} className="navtheme-usercar-card">
                                    <div className="navtheme-usercar-img-wrap">
                                        <img
                                            src={car?.image ? `http://localhost:8080/${car.image}` : "https://picsum.photos/400/300"}
                                            alt={car.title}
                                            className="navtheme-usercar-img"
                                        />
                                    </div>
                                    <div className="navtheme-usercar-info">
                                        <h5 className="navtheme-usercar-title">{car.title}</h5>
                                        <p className="navtheme-usercar-meta">{car.brand} • {car.model} • {car.year}</p>
                                        <p className="navtheme-usercar-price">PKR {car.price}</p>

                                        {/* only the owner can edit/delete their own listed cars */}
                                        {isOwnProfile && (
                                            <div className="navtheme-usercar-actions">
                                                <Button
                                                    size="sm"
                                                    className="navtheme-btn-danger-outline flex-fill"
                                                    onClick={() => handleDeleteCar(car)}
                                                    disabled={isDeletingThisCar || loading}
                                                >
                                                    {isDeletingThisCar ? "Deleting..." : "Delete"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="navtheme-btn-outline flex-fill"
                                                    onClick={() => openEditCar(car)}
                                                    disabled={isDeletingThisCar}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <style>{pageStyles}</style>

            {/* edit/delete modal for a single car, reuses CarUpdateContext */}
            <UpdateCarModal
                show={showCarModal}
                onHide={closeEditCar}
                car={selectedCar}
                userId={profileId}
                onDeleted={closeEditCar}
            />

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
    .navtheme-page-wrap {
        background-color: #e6e3e3;
        min-height: 100vh;
        padding: 20px;
        font-family: 'Exo', sans-serif;
        box-sizing: border-box;
    }
    .navtheme-card {
        background-color: #1D2023;
        border: 2px solid white;
        border-radius: 10px;
        width: 100%;
        max-width: 900px;
        color: #f1f1f1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .navtheme-card-header { padding: 20px 32px; border-bottom: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; }
    .navtheme-card-body { padding: 28px 32px; flex: 1; min-height: 0; }
    .navtheme-card-footer { padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; }
    .navtheme-title { font-family: 'Exo', sans-serif; font-weight: 500; letter-spacing: 0.5px; color: #f1f1f1; }
    .navtheme-avatar-col { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 180px; }
    .navtheme-profile-img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.5); margin-bottom: 12px; }
    .navtheme-name-tag { text-align: center; width: 100%; font-size: 14px; word-break: break-word; }
    .navtheme-details-col { flex: 1; min-width: 0; }
    .navtheme-label { font-family: 'Exo', sans-serif; color: #1D2023; margin-bottom: 0.3rem; display: block; font-size: 13px; }
    .navtheme-value { font-family: 'Exo', sans-serif; color: #f1f1f1; background-color: #26292d; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; margin: 0; min-height: 40px; display: flex; align-items: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .navtheme-btn-outline { font-family: 'Exo', sans-serif; font-weight: 500; background-color: transparent; color: #f1f1f1; border: 1px solid rgba(255,255,255,0.5); transition: all 0.2s ease; }
    .navtheme-btn-outline:hover { background-color: rgba(255,255,255,0.1); color: #f1f1f1; border: 1px solid #f1f1f1; }
    .navtheme-btn-outline:disabled { opacity: 0.5; cursor: not-allowed; }
    .navtheme-btn-danger-outline { font-family: 'Exo', sans-serif; font-weight: 500; background-color: transparent; color: #ff8a8a; border: 1px solid rgba(255,138,138,0.6); transition: all 0.2s ease; }
    .navtheme-btn-danger-outline:hover { background-color: rgba(255,138,138,0.15); color: #ff8a8a; border: 1px solid #ff8a8a; }
    .navtheme-btn-danger-outline:disabled { opacity: 0.5; cursor: not-allowed; }
    .navtheme-toast { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.3); font-family: 'Exo', sans-serif; }
    .navtheme-toast .toast-header { background-color: #1D2023; color: #f1f1f1; border-bottom: 1px solid rgba(255,255,255,0.2); }
    .navtheme-toast-success .toast-body { color: #7ee8a7; }
    .navtheme-toast-danger .toast-body { color: #ff8a8a; }

    .navtheme-usercars-section { max-width: 900px; margin: 32px auto 0; }
    .navtheme-usercars-heading { color: #1D2023; font-family: 'Exo', sans-serif; font-weight: 700; text-align: center; margin-bottom: 20px; }
    .navtheme-usercars-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .navtheme-usercar-card { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.25); border-radius: 10px; overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .navtheme-usercar-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
    .navtheme-usercar-img-wrap { width: 100%; aspect-ratio: 4 / 3; background-color: #26292d; overflow: hidden; }
    .navtheme-usercar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .navtheme-usercar-info { padding: 12px 14px 16px; }
    .navtheme-usercar-title { color: #f1f1f1; font-size: 15px; font-weight: 600; margin: 0 0 6px; }
    .navtheme-usercar-meta { color: #cfcfcf; font-size: 12px; margin: 0 0 6px; }
    .navtheme-usercar-price { color: #7ee8a7; font-size: 14px; font-weight: 600; margin: 0 0 10px; }
    .navtheme-usercar-actions { display: flex; gap: 8px; }

    @media (max-width: 700px) {
        .navtheme-page-wrap { padding: 12px; }
        .navtheme-card-body { flex-direction: column; padding: 16px; gap: 16px !important; }
        .navtheme-avatar-col { width: 100%; }
        .navtheme-profile-img { width: 90px; height: 90px; }
        .navtheme-card-header, .navtheme-card-footer { padding: 14px 18px; }
        .navtheme-title { font-size: 18px; }
        .navtheme-usercars-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
    }
`;

export default Profile;