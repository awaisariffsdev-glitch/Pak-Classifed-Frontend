// Edit profile modal — form to update user fields (name, email, phone, city, password, image) via UpdateContext
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { UserContext } from '../Context/UserContext';
// import { UpdateUser } from '../Services/UpdateUser';
// import { updateUser } from '../Services/UpdateUser';
import { UpdateContext } from '../Context/UserContextUpdate';

function EditProfileModal({ show, onHide, profileData }) {
    const { setCurrent } = useContext(UserContext);
    // const [loading, setLoading] = useState(false);
    const {updateUser,loading}=useContext(UpdateContext)
    const [form, setForm] = useState({
        fullname: profileData?.fullname || '',
        email: profileData?.email || '',
        phone: profileData?.phone || '',
        city: profileData?.city || '',
        password: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

    const showToast = (message, variant = "success") => {
        setToast({ show: true, message, variant });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        try {
            const formData = new FormData();
            formData.append('fullname', form.fullname);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('city', form.city);
            if (form.password.trim()) {
                formData.append('password', form.password);
            }
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const result = await updateUser(profileData._id, formData);
            showToast("Profile updated successfully!", "success");
            
            // Update context with new user data
            setCurrent(result.user);
            // localStorage.setItem("user", JSON.stringify(result.user));
            
            setTimeout(() => onHide(), 1200);
        } catch (error) {
            showToast(
                error.response?.data?.message || "Failed to update profile",
                "danger"
            );
        } 
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered size="lg" contentClassName="navtheme-modal-content">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="navtheme-modal-title">Edit Profile</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="navtheme-modal-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Full Name</Form.Label>
                                <Form.Control
                                    name="fullname"
                                    value={form.fullname}
                                    onChange={handleChange}
                                    className="navtheme-form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="navtheme-form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Phone</Form.Label>
                                <Form.Control
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="navtheme-form-control"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">City</Form.Label>
                                <Form.Control
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className="navtheme-form-control"
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <Form.Label className="navtheme-form-label">Password (leave blank to keep current)</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="navtheme-form-control"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="col-12">
                                <Form.Label className="navtheme-form-label">Profile Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="navtheme-form-control"
                                />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="navtheme-modal-footer">
                        <Button className="navtheme-btn-outline" onClick={onHide} disabled={loading}>
                            Cancel
                        </Button>
                        <Button className="navtheme-btn-submit" type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
                <Toast
                    onClose={() => setToast((t) => ({ ...t, show: false }))}
                    show={toast.show}
                    delay={2500}
                    autohide
                    className={`navtheme-toast navtheme-toast-${toast.variant}`}
                >
                    <Toast.Header closeVariant="white">
                        <strong className="me-auto">{toast.variant === "success" ? "Success" : "Error"}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <style>{`
                .navtheme-modal-content { background-color: #1D2023; border: 2px solid white; color: #f1f1f1; }
                .navtheme-modal-content .modal-header { border-bottom: 1px solid rgba(255,255,255,0.25); }
                .navtheme-modal-content .modal-footer { border-top: 1px solid rgba(255,255,255,0.25); }
                .navtheme-modal-title { font-family: monospace; font-weight: 500; }
                .navtheme-form-label { font-family: monospace; color: #f1f1f1; font-size: 13px; }
                .navtheme-form-control { background-color: #26292d !important; color: #f1f1f1 !important; border: 1px solid rgba(255,255,255,0.25) !important; font-family: monospace; }
                .navtheme-form-control:focus { border-color: #f1f1f1 !important; box-shadow: 0 0 0 0.15rem rgba(255,255,255,0.15) !important; }
                .navtheme-btn-outline { background-color: transparent; color: #f1f1f1; border: 1px solid rgba(255,255,255,0.5); }
                .navtheme-btn-submit { background-color: #7ee8a7; border: none; color: #1D2023; font-weight: 600; }
                .navtheme-toast { background-color: #1D2023; border: 1px solid rgba(255,255,255,0.3); }
                .navtheme-toast-success .toast-body { color: #7ee8a7; }
                .navtheme-toast-danger .toast-body { color: #ff8a8a; }
            `}</style>
        </>
    );
}

export default EditProfileModal;