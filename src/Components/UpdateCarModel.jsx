// Update/delete car modal — pre-filled form to edit car details or delete the listing with confirmation flow
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
// import { CarUpdateContext } from '../Context/CarUpdateContext';
import { CarUpdateContext } from '../Context/CarUpdateContext';


function UpdateCarModal({ show, onHide, car, userId, onDeleted }) {
    const { updateCar, deleteCar, loading, error } = useContext(CarUpdateContext);

    const [formValues, setFormValues] = useState({
        title: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

    const showToast = (message, variant = 'success') =>
        setToast({ show: true, message, variant });

    // Populate form whenever a new car is passed in / modal is (re)opened
    useEffect(() => {
        if (car) {
            setFormValues({
                title: car.title || '',
                brand: car.brand || '',
                model: car.model || '',
                year: car.year || '',
                price: car.price || '',
                description: car.description || '',
            });
            setPreviewSrc(car.image ? `https://pak-classifed-backend-production.up.railway.app/${car.image}` : null);
        }
        setImageFile(null);
        setConfirmingDelete(false);
    }, [car, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setPreviewSrc(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!car?._id) {
            showToast('Missing car id — cannot update.', 'danger');
            return;
        }

        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('brand', formValues.brand);
        formData.append('model', formValues.model);
        formData.append('year', formValues.year);
        formData.append('price', formValues.price);
        formData.append('description', formValues.description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const result = await updateCar(car._id, formData, userId);

        if (result.success) {
            showToast(result.message || 'Car updated successfully.', 'success');
            setTimeout(() => onHide(), 900);
        } else {
            showToast(result.message || 'Failed to update car.', 'danger');
        }
    };

    const handleDelete = async () => {
        if (!car?._id) return;

        const result = await deleteCar(car._id, userId);

        if (result.success) {
            showToast(result.message || 'Car deleted successfully.', 'success');
            onDeleted?.(car._id);
            setTimeout(() => onHide(), 900);
        } else {
            showToast(result.message || 'Failed to delete car.', 'danger');
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered contentClassName="navtheme-modal-content">
                <Modal.Header closeButton closeVariant="white" className="navtheme-modal-header">
                    <Modal.Title className="navtheme-modal-title">Update Car</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="navtheme-modal-body">
                        <div className="d-flex flex-column align-items-center mb-3">
                            <img
                                src={previewSrc || 'https://picsum.photos/400/300'}
                                alt={formValues.title || 'Car'}
                                className="navtheme-modal-preview-img"
                            />
                            <Form.Group className="mt-2 w-100">
                                <Form.Label className="navtheme-label">Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="navtheme-modal-input"
                                />
                            </Form.Group>
                        </div>

                        <div className="row g-3">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        value={formValues.title}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Brand</Form.Label>
                                    <Form.Control
                                        name="brand"
                                        value={formValues.brand}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Model</Form.Label>
                                    <Form.Control
                                        name="model"
                                        value={formValues.model}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="year"
                                        value={formValues.year}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Price (PKR)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={formValues.price}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                        required
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="navtheme-label">Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleChange}
                                        className="navtheme-modal-input"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {error && (
                            <p className="navtheme-modal-error mt-3 mb-0">{error}</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer className="navtheme-modal-footer">
                        {!confirmingDelete ? (
                            <Button
                                type="button"
                                className="navtheme-btn-danger-outline me-auto"
                                onClick={() => setConfirmingDelete(true)}
                                disabled={loading}
                            >
                                Delete Car
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center gap-2 me-auto">
                                <span className="navtheme-confirm-text">Delete this listing?</span>
                                <Button
                                    type="button"
                                    className="navtheme-btn-danger-solid"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Yes, delete'}
                                </Button>
                                <Button
                                    type="button"
                                    className="navtheme-btn-outline"
                                    onClick={() => setConfirmingDelete(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}

                        <Button type="button" className="navtheme-btn-outline" onClick={onHide} disabled={loading}>
                            Close
                        </Button>
                        <Button type="submit" className="navtheme-btn-solid" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

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
                            {toast.variant === 'success' ? 'Success' : 'Error'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <style>{modalStyles}</style>
        </>
    );
}

const modalStyles = `
    .navtheme-modal-content {
        background-color: #1D2023;
        border: 2px solid white;
        border-radius: 10px;
        color: #f1f1f1;
        font-family: 'Exo', sans-serif;
    }
    .navtheme-modal-header {
        border-bottom: 1px solid rgba(255,255,255,0.25);
    }
    .navtheme-modal-title {
        font-family: 'Exo', sans-serif;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: #f1f1f1;
    }
    .navtheme-modal-body {
        padding: 24px 28px;
    }
    .navtheme-modal-footer {
        border-top: 1px solid rgba(255,255,255,0.25);
        flex-wrap: wrap;
    }
    .navtheme-label {
        font-family: 'Exo', sans-serif;
        color: #cfcfcf;
        margin-bottom: 0.3rem;
        display: block;
        font-size: 13px;
    }
    .navtheme-modal-input {
        font-family: 'Exo', sans-serif;
        background-color: #26292d !important;
        color: #f1f1f1 !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
    }
    .navtheme-modal-input::placeholder {
        color: rgba(255,255,255,0.4);
    }
    .navtheme-modal-input:focus {
        border-color: #f1f1f1 !important;
        box-shadow: 0 0 0 0.15rem rgba(255,255,255,0.15) !important;
    }
    .navtheme-modal-preview-img {
        width: 140px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        border: 2px solid rgba(255,255,255,0.4);
    }
    .navtheme-modal-error {
        color: #ff8a8a;
        font-size: 13px;
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
    .navtheme-btn-solid {
        font-family: 'Exo', sans-serif;
        font-weight: 500;
        background-color: #f1f1f1;
        color: #1D2023;
        border: 1px solid #f1f1f1;
        transition: all 0.2s ease;
    }
    .navtheme-btn-solid:hover {
        background-color: #d8d8d8;
        color: #1D2023;
    }
    .navtheme-btn-danger-outline {
        font-family: 'Exo', sans-serif;
        font-weight: 500;
        background-color: transparent;
        color: #ff8a8a;
        border: 1px solid rgba(255,138,138,0.6);
    }
    .navtheme-btn-danger-outline:hover {
        background-color: rgba(255,138,138,0.15);
        color: #ff8a8a;
    }
    .navtheme-btn-danger-solid {
        font-family: 'Exo', sans-serif;
        font-weight: 500;
        background-color: #ff8a8a;
        color: #1D2023;
        border: 1px solid #ff8a8a;
    }
    .navtheme-btn-danger-solid:hover {
        background-color: #ff6f6f;
    }
    .navtheme-confirm-text {
        font-family: 'Exo', sans-serif;
        font-size: 13px;
        color: #f1f1f1;
    }
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
`;

export default UpdateCarModal;