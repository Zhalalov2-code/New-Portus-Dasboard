import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    MdEdit,
    MdSave,
    MdCancel,
    MdPerson,
    MdEmail,
    MdBadge,
} from 'react-icons/md';
import '../css/profile.css';

const Profile = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        lastname: currentUser?.lastname || '',
        email: currentUser?.email || '',
        phone: '',
        position: '',
        department: '',
        location: 'Германия'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Здесь будет логика сохранения данных
        console.log('Saving profile data:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: currentUser?.name || '',
            lastname: currentUser?.lastname || '',
            email: currentUser?.email || '',
            phone: '',
            position: '',
            department: '',
            location: 'Германия'
        });
        setIsEditing(false);
    };

    if (!currentUser) {
        return (
            <div className="container-fluid py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <h3>Пользователь не авторизован</h3>
                        <p className="text-muted">Пожалуйста, войдите в систему</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Боковая панель с аватаром */}
                    <div className="col-lg-4 mb-4">
                        <div className="profile-sidebar">
                            <div className="profile-header text-center">
                                <div className="profile-avatar">
                                    <MdPerson size={80} className="text-white" />
                                </div>
                                <h3 className="profile-name">
                                    {currentUser.name} {currentUser.lastname}
                                </h3>
                                <p className="profile-role">
                                    <MdBadge className="me-2" />
                                    {currentUser.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Основная форма профиля */}
                    <div className="col-lg-8">
                        <div className="profile-main">
                            <div className="profile-header-actions">
                                <h2>Benutzerprofil</h2>
                                <div className="action-buttons">
                                    {!isEditing ? (
                                        <button
                                            className="btn btn-primary btn-edit-profile"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <MdEdit className="me-2" />
                                            Bearbeiten
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={handleSave}
                                            >
                                                <MdSave className="me-2" />
                                                Speichern
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={handleCancel}
                                            >
                                                <MdCancel className="me-2" />
                                                Abbrechen
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="profile-form">
                                <div className="form-section">
                                    <h5 className="section-title">
                                        <MdPerson className="me-2" />
                                        Persönliche Informationen
                                    </h5>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Vorname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Nachname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <MdEmail />
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Telefon</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="+49 XXX XXX XXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
