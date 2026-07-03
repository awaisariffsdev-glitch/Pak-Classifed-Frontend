// // import { useContext, useEffect, useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import Button from 'react-bootstrap/Button';
// // import Toast from 'react-bootstrap/Toast';
// // import ToastContainer from 'react-bootstrap/ToastContainer';
// // import axios from 'axios';
// // import { UserContext } from '../Context/UserContext';

// // function Profile() {
// //     const { current, setCurrent } = useContext(UserContext);
// //     const navigate = useNavigate();
// //     const { id: paramId } = useParams();

// //     // Fall back to logged-in user's own id if no :id in the URL
// //     const profileId = paramId || current?._id || current?.id;
// //     const isOwnProfile = current && (current._id === profileId || current.id === profileId);

// //     const [profileData, setProfileData] = useState(null);
// //     const [editing, setEditing] = useState(false);
// //     const [loading, setLoading] = useState(false);
// //     const [fetching, setFetching] = useState(true);
// //     const [preview, setPreview] = useState(null);
// //     // const { user, loggedIn, logout, current } = useContext(UserContext);


// //     const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
// //     const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

// //     const [form, setForm] = useState({
// //         fullname: "",
// //         email: "",
// //         phone: "",
// //         city: "",
// //         image: null
// //     });

// //     useEffect(() => {
// //         if (!profileId) {
// //             setFetching(false);
// //             showToast("No user ID provided", "danger");
// //             return;
// //         }

// //         const fetchProfile = async () => {
// //             setFetching(true);
// //             try {
// //                 const token = localStorage.getItem("token");
// //                 const response = await axios.get(
// //                     `http://localhost:8080/user/profile/${profileId}`,
// //                     { headers: { Authorization: `Bearer ${token}` } }
// //                 );

// //                 const userData = response.data.user || response.data;
// //                 setProfileData(userData);
// //                 setForm({
// //                     fullname: userData.fullname || "",
// //                     email: userData.email || "",
// //                     phone: userData.phone || "",
// //                     city: userData.city || "",
// //                     image: null
// //                 });

// //                 // Keep global context in sync if this is the logged-in user's own profile
// //                 if (current && (current._id === userData._id || current.id === userData.id)) {
// //                     setCurrent(userData);
// //                 }

// //             } catch (error) {
// //                 console.log("STATUS:", error.response?.status);
// //                 console.log("MESSAGE:", error.response?.data?.message);
// //                 showToast(
// //                     error.response?.data?.message || "Could not load profile",
// //                     "danger"
// //                 );
// //             } finally {
// //                 setFetching(false);
// //             }
// //         };

// //         fetchProfile();
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [profileId]);

// //     const handleChanges = (e) => {
// //         const { name, value, files, type } = e.target;

// //         if (type === "file") {
// //             const file = files[0];
// //             setForm((prev) => ({ ...prev, image: file }));
// //             if (file) setPreview(URL.createObjectURL(file));
// //         } else {
// //             setForm((prev) => ({ ...prev, [name]: value }));
// //         }
// //     };

// //     const handleCancelEdit = () => {
// //         setForm({
// //             fullname: profileData?.fullname || "",
// //             email: profileData?.email || "",
// //             phone: profileData?.phone || "",
// //             city: profileData?.city || "",
// //             image: null
// //         });
// //         setPreview(null);
// //         setEditing(false);
// //     };

// //     const handleSave = async () => {
// //         setLoading(true);
// //         try {
// //             const token = localStorage.getItem("token");
// //             const newForm = new FormData();

// //             newForm.append("fullname", form.fullname);
// //             newForm.append("phone", form.phone);
// //             newForm.append("city", form.city);
// //             if (form.image) {
// //                 newForm.append("image", form.image);
// //             }

// //             const response = await axios.get(
// //                 `http://localhost:8080/user/find/${profileId}`,
// //                 newForm,
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );

// //             const updatedUser = response.data.userFindById || response.data.user || response.data;
// //             setProfileData(updatedUser);
// //             setCurrent(updatedUser);
// //             localStorage.setItem("user", JSON.stringify(updatedUser));

// //             showToast("Profile updated successfully!", "success");
// //             setEditing(false);
// //             setPreview(null);

// //         } catch (error) {
// //             console.log("STATUS:", error.response?.status);
// //             console.log("MESSAGE:", error.response?.data?.message);
// //             showToast(
// //                 error.response?.data?.message || "Failed to update profile. Please try again.",
// //                 "danger"
// //             );
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (fetching) {
// //         return (
// //             <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
// //                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Loading profile...</p>
// //                 <style>{pageStyles}</style>
// //             </div>
// //         );
// //     }

// //     if (!profileData) {
// //         return (
// //             <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
// //                 <p className="navtheme-label" style={{ fontSize: "16px" }}>Profile not found.</p>
// //                 <style>{pageStyles}</style>
// //             </div>
// //         );
// //     }

// //     const imageSrc = preview
// //         ? preview
// //         : profileData?.image
// //             ? `http://localhost:8080/${profileData.image}`
// //             : "https://picsum.photos/200/300";

// //     return (
// //         <div className="navtheme-page d-flex justify-content-center">
// //             <div className="navtheme-card">

// //                 <div className="navtheme-card-header">
// //                     <h2 className="navtheme-title m-0">
// //                         {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
// //                     </h2>
// //                 </div>

// //                 <div className="navtheme-card-body">

// //                     <div className="d-flex flex-column align-items-center mb-4">
// //                         <img
// //                             src={imageSrc}
// //                             alt="Profile"
// //                             className="navtheme-profile-img"
// //                         />
// //                         {editing && isOwnProfile && (
// //                             <div className="mt-3 w-100" style={{ maxWidth: "300px" }}>
// //                                 <label htmlFor="image" className="navtheme-label">Change Photo</label>
// //                                 <input
// //                                     type="file"
// //                                     accept="image/*"
// //                                     onChange={handleChanges}
// //                                     className="form-control navtheme-input"
// //                                     name="image"
// //                                     id="image"
// //                                 />
// //                             </div>
// //                         )}
// //                     </div>

// //                     <div className="row g-3">
// //                         <div className="col-md-6">
// //                             <label htmlFor="fullname" className="navtheme-label">Full Name</label>
// //                             {editing && isOwnProfile ? (
// //                                 <input
// //                                     type="text"
// //                                     name="fullname"
// //                                     id="fullname"
// //                                     value={form.fullname}
// //                                     onChange={handleChanges}
// //                                     className="form-control navtheme-input"
// //                                 />
// //                             ) : (
// //                                 <p className="navtheme-value">{profileData?.fullname || "—"}</p>
// //                             )}
// //                         </div>

// //                         <div className="col-md-6">
// //                             <label htmlFor="email" className="navtheme-label">Email</label>
// //                             <p className="navtheme-value">{profileData?.email || "—"}</p>
// //                         </div>

// //                         <div className="col-md-6">
// //                             <label htmlFor="phone" className="navtheme-label">Contact Number</label>
// //                             {editing && isOwnProfile ? (
// //                                 <input
// //                                     type="text"
// //                                     name="phone"
// //                                     id="phone"
// //                                     value={form.phone}
// //                                     onChange={handleChanges}
// //                                     className="form-control navtheme-input"
// //                                 />
// //                             ) : (
// //                                 <p className="navtheme-value">{profileData?.phone || "—"}</p>
// //                             )}
// //                         </div>

// //                         <div className="col-md-6">
// //                             <label htmlFor="city" className="navtheme-label">Address</label>
// //                             {editing && isOwnProfile ? (
// //                                 <input
// //                                     type="text"
// //                                     name="city"
// //                                     id="city"
// //                                     value={form.city}
// //                                     onChange={handleChanges}
// //                                     className="form-control navtheme-input"
// //                                 />
// //                             ) : (
// //                                 <p className="navtheme-value">{profileData?.city || "—"}</p>
// //                             )}
// //                         </div>
// //                     </div>

// //                 </div>

// //                 <div className="navtheme-card-footer d-flex justify-content-end gap-2">
// //                     {editing ? (
// //                         <>
// //                             <Button className="navtheme-btn-outline" onClick={handleCancelEdit} disabled={loading}>
// //                                 Cancel
// //                             </Button>
// //                             <Button className="navtheme-btn-dark" onClick={handleSave} disabled={loading}>
// //                                 {loading ? "Saving..." : "Save Changes"}
// //                             </Button>
// //                         </>
// //                     ) : (
// //                         <>
// //                             <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
// //                                 Back
// //                             </Button>
// //                             {isOwnProfile && (
// //                                 <Button className="navtheme-btn-dark" onClick={() => setEditing(true)}>
// //                                     Edit Profile
// //                                 </Button>
// //                             )}
// //                         </>
// //                     )}
// //                 </div>

// //             </div>

// //             <style>{pageStyles}</style>

// //             <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
// //                 <Toast
// //                     onClose={() => setToast((t) => ({ ...t, show: false }))}
// //                     show={toast.show}
// //                     delay={3000}
// //                     autohide
// //                     className={`navtheme-toast navtheme-toast-${toast.variant}`}
// //                 >
// //                     <Toast.Header closeVariant="white">
// //                         <strong className="me-auto">
// //                             {toast.variant === "success" ? "Success" : "Error"}
// //                         </strong>
// //                     </Toast.Header>
// //                     <Toast.Body>{toast.message}</Toast.Body>
// //                 </Toast>
// //             </ToastContainer>
// //         </div>
// //     );
// // }

// // const pageStyles = `
// //     .navtheme-page {
// //         background-color: #0f1113;
// //         min-height: 100vh;
// //         padding: 50px 20px;
// //         font-family: monospace;
// //     }
// //     .navtheme-card {
// //         background-color: #1D2023;
// //         border: 2px solid white;
// //         border-radius: 10px;
// //         width: 100%;
// //         max-width: 700px;
// //         color: #f1f1f1;
// //         overflow: hidden;
// //     }
// //     .navtheme-card-header {
// //         padding: 24px 32px;
// //         border-bottom: 1px solid rgba(255,255,255,0.25);
// //     }
// //     .navtheme-card-body {
// //         padding: 32px;
// //     }
// //     .navtheme-card-footer {
// //         padding: 20px 32px;
// //         border-top: 1px solid rgba(255,255,255,0.25);
// //     }
// //     .navtheme-title {
// //         font-family: monospace;
// //         font-weight: 500;
// //         letter-spacing: 0.5px;
// //         color: #f1f1f1;
// //     }
// //     .navtheme-profile-img {
// //         width: 110px;
// //         height: 110px;
// //         border-radius: 50%;
// //         object-fit: cover;
// //         border: 3px solid rgba(255,255,255,0.5);
// //     }
// //     .navtheme-label {
// //         font-family: monospace;
// //         color: #fefefe;
// //         margin-bottom: 0.35rem;
// //         display: block;
// //     }
// //     .navtheme-value {
// //         font-family: monospace;
// //         color: #f1f1f1;
// //         background-color: #26292d;
// //         border: 1px solid rgba(255,255,255,0.2);
// //         border-radius: 6px;
// //         padding: 8px 12px;
// //         margin: 0;
// //         min-height: 40px;
// //         display: flex;
// //         align-items: center;
// //     }
// //     .navtheme-input {
// //         background-color: #26292d;
// //         border: 1px solid rgba(255,255,255,0.3);
// //         color: #f1f1f1;
// //         font-family: monospace;
// //     }
// //     .navtheme-input:focus {
// //         background-color: #26292d;
// //         color: #f1f1f1;
// //         border-color: #ffffff;
// //         box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.15);
// //     }
// //     .navtheme-btn-dark {
// //         font-family: monospace;
// //         font-weight: 500;
// //         background-color: #f1f1f1;
// //         color: #1D2023;
// //         border: 1px solid #f1f1f1;
// //         transition: all 0.2s ease;
// //     }
// //     .navtheme-btn-dark:hover {
// //         background-color: transparent;
// //         color: #f1f1f1;
// //         border: 1px solid #f1f1f1;
// //     }
// //     .navtheme-btn-outline {
// //         font-family: monospace;
// //         font-weight: 500;
// //         background-color: transparent;
// //         color: #f1f1f1;
// //         border: 1px solid rgba(255,255,255,0.5);
// //         transition: all 0.2s ease;
// //     }
// //     .navtheme-btn-outline:hover {
// //         background-color: rgba(255,255,255,0.1);
// //         color: #f1f1f1;
// //         border: 1px solid #f1f1f1;
// //     }
// //     .navtheme-toast {
// //         background-color: #1D2023;
// //         border: 1px solid rgba(255,255,255,0.3);
// //         font-family: monospace;
// //     }
// //     .navtheme-toast .toast-header {
// //         background-color: #1D2023;
// //         color: #f1f1f1;
// //         border-bottom: 1px solid rgba(255,255,255,0.2);
// //     }
// //     .navtheme-toast-success .toast-body { color: #7ee8a7; }
// //     .navtheme-toast-danger .toast-body { color: #ff8a8a; }
// // `;

// // export default Profile;


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

//     // Fall back to logged-in user's own id if no :id in the URL
//     const profileId = paramId || current?._id || current?.id;
//     const isOwnProfile = current && (current._id === profileId || current.id === profileId);

//     const [profileData, setProfileData] = useState(null);
//     const [fetching, setFetching] = useState(true);

//     const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
//     const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

//     useEffect(() => {
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
//     }, [profileId]);

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
//         <div className="">
//             {loggedIn ? (
//                 <div className="navtheme-page d-flex justify-content-center">
//                     <div className="navtheme-card">

//                         <div className="navtheme-card-header">
//                             <h2 className="navtheme-title m-0">
//                                 {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
//                             </h2>
//                         </div>

//                         <div className="navtheme-card-body">

//                             <div className="d-flex flex-column align-items-center mb-4">
//                                 <img
//                                     src={imageSrc}
//                                     alt="Profile"
//                                     className="navtheme-profile-img"
//                                 />
//                             </div>

//                             <div className="row g-3">
//                                 <div className="col-md-6">
//                                     <label className="navtheme-label">Full Name</label>
//                                     <p className="navtheme-value">{profileData?.fullname || "—"}</p>
//                                 </div>

//                                 <div className="col-md-6">
//                                     <label className="navtheme-label">Email</label>
//                                     <p className="navtheme-value">{profileData?.email || "—"}</p>
//                                 </div>

//                                 <div className="col-md-6">
//                                     <label className="navtheme-label">Contact Number</label>
//                                     <p className="navtheme-value">{profileData?.phone || "—"}</p>
//                                 </div>

//                                 <div className="col-md-6">
//                                     <label className="navtheme-label">Address</label>
//                                     <p className="navtheme-value">{profileData?.city || "—"}</p>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className="navtheme-card-footer d-flex justify-content-end gap-2">
//                             <Button className="navtheme-btn-outline" onClick={() => navigate(-1)}>
//                                 Back
//                             </Button>
//                         </div>

//                     </div>

//                     <style>{pageStyles}</style>

//                     <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
//                         <Toast
//                             onClose={() => setToast((t) => ({ ...t, show: false }))}
//                             show={toast.show}
//                             delay={3000}
//                             autohide
//                             className={`navtheme-toast navtheme-toast-${toast.variant}`}
//                         >
//                             <Toast.Header closeVariant="white">
//                                 <strong className="me-auto">
//                                     {toast.variant === "success" ? "Success" : "Error"}
//                                 </strong>
//                             </Toast.Header>
//                             <Toast.Body>{toast.message}</Toast.Body>
//                         </Toast>
//                     </ToastContainer>
//                 </div>
//             ) : ("No Profile")}
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

    // If not logged in, bounce back to home (or wherever your login lives)
    useEffect(() => {
        if (!loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (!loggedIn) return; // don't fetch anything if not logged in

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

    // Not logged in — render nothing while the redirect effect above kicks in
    if (!loggedIn) {
        return null;
    }

    if (fetching) {
        return (
            <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
                <p className="navtheme-label" style={{ fontSize: "16px" }}>Loading profile...</p>
                <style>{pageStyles}</style>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="navtheme-page d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
                <p className="navtheme-label" style={{ fontSize: "16px" }}>Profile not found.</p>
                <style>{pageStyles}</style>
            </div>
        );
    }

    const imageSrc = profileData?.image
        ? `http://localhost:8080/${profileData.image}`
        : "https://picsum.photos/200/300";

    return (
        <div className="navtheme-page d-flex justify-content-center">
            <div className="navtheme-card">

                <div className="navtheme-card-header">
                    <h2 className="navtheme-title m-0">
                        {isOwnProfile ? "My Profile" : `${profileData.fullname || "User"}'s Profile`}
                    </h2>
                </div>

                <div className="navtheme-card-body">

                    <div className="d-flex flex-column align-items-center mb-4">
                        <img
                            src={imageSrc}
                            alt="Profile"
                            className="navtheme-profile-img"
                        />
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="navtheme-label">Full Name</label>
                            <p className="navtheme-value">{profileData?.fullname || "—"}</p>
                        </div>

                        <div className="col-md-6">
                            <label className="navtheme-label">Email</label>
                            <p className="navtheme-value">{profileData?.email || "—"}</p>
                        </div>

                        <div className="col-md-6">
                            <label className="navtheme-label">Contact Number</label>
                            <p className="navtheme-value">{profileData?.phone || "—"}</p>
                        </div>

                        <div className="col-md-6">
                            <label className="navtheme-label">Address</label>
                            <p className="navtheme-value">{profileData?.city || "—"}</p>
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
        background-color: #0f1113;
        min-height: 100vh;
        padding: 50px 20px;
        font-family: monospace;
    }
    .navtheme-card {
        background-color: #1D2023;
        border: 2px solid white;
        border-radius: 10px;
        width: 100%;
        max-width: 700px;
        color: #f1f1f1;
        overflow: hidden;
    }
    .navtheme-card-header {
        padding: 24px 32px;
        border-bottom: 1px solid rgba(255,255,255,0.25);
    }
    .navtheme-card-body {
        padding: 32px;
    }
    .navtheme-card-footer {
        padding: 20px 32px;
        border-top: 1px solid rgba(255,255,255,0.25);
    }
    .navtheme-title {
        font-family: monospace;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: #f1f1f1;
    }
    .navtheme-profile-img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(255,255,255,0.5);
    }
    .navtheme-label {
        font-family: monospace;
        color: #fefefe;
        margin-bottom: 0.35rem;
        display: block;
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
`;

export default Profile;