import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { UserContext } from '../Context/UserContext';
import { CarRefreshContext } from '../Context/CarRefreshContext';
import AddCar from '../Services/AddCar'; // adjust path/filename to match wherever AddCar.jsx actually lives

const categoryOptions = ["SUV", "Sedan", "Crossover", "Hatchback", "Wagon", "Sports", "Hybrid", "Convertible"];
const fuelOptions = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissionOptions = ["Manual", "Automatic"];

const initialForm = {
    title: '', description: '', price: '', brand: '', model: '', year: '',
    color: '', mileage: '', fuelType: '', transmission: '', city: '', category: ''
};

const AddCarModal = ({ show, onHide }) => {
    const { current } = useContext(UserContext);
    const { triggerRefresh } = useContext(CarRefreshContext);

    const [form, setForm] = useState(initialForm);
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
    const showToast = (message, variant = "success") => setToast({ show: true, message, variant });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = current?._id || current?.id;
        if (!userId) {
            showToast("You must be logged in to add a car", "danger");
            return;
        }

        setSubmitting(true);

        const carData = { ...form, userId };
        if (imageFile) {
            carData.image = imageFile; // File object — FormData in AddCar.jsx handles this correctly
        }

        const result = await AddCar(carData);
        console.log(result)

        setSubmitting(false);

        if (result) {
            showToast("Car added successfully!", "success");
            setForm(initialForm);
            setImageFile(null);
            triggerRefresh(); // ADDED: tells CarBoardMain to refetch
            setTimeout(() => onHide(), 1200); // close modal shortly after success
        } else {
            showToast("Failed to add car. Please check all fields.", "danger");
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered size="lg" className="navtheme-modal-wrap">
                <Modal.Header closeButton closeVariant="white" className="navtheme-modal-header">
                    <Modal.Title className="navtheme-modal-title">Sell Your Car</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="navtheme-modal-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Title</Form.Label>
                                <Form.Control
                                    name="title" value={form.title} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Brand</Form.Label>
                                <Form.Control
                                    name="brand" value={form.brand} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Model</Form.Label>
                                <Form.Control
                                    name="model" value={form.model} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Year</Form.Label>
                                <Form.Control
                                    type="number" name="year" value={form.year} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Price (PKR)</Form.Label>
                                <Form.Control
                                    type="text" name="price" value={form.price} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Color</Form.Label>
                                <Form.Control
                                    name="color" value={form.color} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Mileage (km)</Form.Label>
                                <Form.Control
                                    type="number" name="mileage" value={form.mileage} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">City</Form.Label>
                                <Form.Control
                                    name="city" value={form.city} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Fuel Type</Form.Label>
                                <Form.Select
                                    name="fuelType" value={form.fuelType} onChange={handleChange}
                                    className="navtheme-form-control" required
                                >
                                    <option value="">Select</option>
                                    {fuelOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                                </Form.Select>
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Transmission</Form.Label>
                                <Form.Select
                                    name="transmission" value={form.transmission} onChange={handleChange}
                                    className="navtheme-form-control" required
                                >
                                    <option value="">Select</option>
                                    {transmissionOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                                </Form.Select>
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Category</Form.Label>
                                <Form.Select
                                    name="category" value={form.category} onChange={handleChange}
                                    className="navtheme-form-control" required
                                >
                                    <option value="">Select</option>
                                    {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                                </Form.Select>
                            </div>

                            <div className="col-md-6">
                                <Form.Label className="navtheme-form-label">Car Image</Form.Label>
                                <Form.Control
                                    type="file" accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="navtheme-form-control"
                                />
                            </div>

                            <div className="col-12">
                                <Form.Label className="navtheme-form-label">Description</Form.Label>
                                <Form.Control
                                    as="textarea" rows={3} name="description"
                                    value={form.description} onChange={handleChange}
                                    className="navtheme-form-control" required
                                />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="navtheme-modal-footer">
                        <Button className="navtheme-btn-outline" onClick={onHide} disabled={submitting}>
                            Cancel
                        </Button>
                        <Button className="navtheme-btn-submit" type="submit" disabled={submitting}>
                            {submitting ? "Adding..." : "Add Car"}
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
                .navtheme-modal-wrap .modal-content {
                    background-color: #1D2023;
                    border: 2px solid white;
                    color: #f1f1f1;
                    font-family: monospace;
                }
                .navtheme-modal-header {
                    border-bottom: 1px solid rgba(255,255,255,0.25);
                }
                .navtheme-modal-title {
                    font-family: monospace;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }
                .navtheme-modal-body {
                    max-height: 65vh;
                    overflow-y: auto;
                }
                .navtheme-modal-footer {
                    border-top: 1px solid rgba(255,255,255,0.25);
                }
                .navtheme-form-label {
                    font-family: monospace;
                    color: #f1f1f1;
                    font-size: 13px;
                    margin-bottom: 4px;
                }
                .navtheme-form-control {
                    background-color: #26292d !important;
                    color: #f1f1f1 !important;
                    border: 1px solid rgba(255,255,255,0.25) !important;
                    font-family: monospace;
                }
                .navtheme-form-control:focus {
                    border-color: #f1f1f1 !important;
                    box-shadow: 0 0 0 0.15rem rgba(255,255,255,0.15) !important;
                }
                .navtheme-form-control::placeholder {
                    color: rgba(255,255,255,0.4);
                }
                .navtheme-btn-outline {
                    font-family: monospace;
                    background-color: transparent;
                    color: #f1f1f1;
                    border: 1px solid rgba(255,255,255,0.5);
                }
                .navtheme-btn-outline:hover {
                    background-color: rgba(255,255,255,0.1);
                    border-color: #f1f1f1;
                    color: #f1f1f1;
                }
                .navtheme-btn-submit {
                    font-family: monospace;
                    background-color: #7ee8a7;
                    border: none;
                    color: #1D2023;
                    font-weight: 600;
                }
                .navtheme-btn-submit:hover {
                    background-color: #6ad894;
                    color: #1D2023;
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
            `}</style>
        </>
    );
};

export default AddCarModal;