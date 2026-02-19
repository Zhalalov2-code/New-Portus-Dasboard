import React, { useState, useEffect } from 'react';

export interface AddField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'date' | 'number';
    required?: boolean;
}

interface AddModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    fields: AddField[];
    onSave: (data: any) => Promise<void>;
    loading?: boolean;
}

const AddModal: React.FC<AddModalProps> = ({ show, onHide, title, fields, onSave, loading = false }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (show) {
            // Инициализируем пустые значения для всех полей
            const initialData: Record<string, any> = {};
            fields.forEach(field => {
                initialData[field.name] = '';
            });
            setFormData(initialData);
        }
    }, [show, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSave(formData);
            onHide();
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
                <div className="modal-content" style={{ height: 'auto' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                {fields.map((field) => (
                                    <div key={field.name} className="col-md-6 mb-3">
                                        <label className="form-label">
                                            {field.label}
                                            {field.required && <span className="text-danger">*</span>}
                                        </label>
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide} disabled={loading}>
                                Abbrechen
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Speichern...' : 'Speichern'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
