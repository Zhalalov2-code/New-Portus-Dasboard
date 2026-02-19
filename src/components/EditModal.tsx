import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import '../css/editModal.css';

interface EditModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  data: any;
  fields: EditField[];
  onSave: (data: any) => Promise<void>;
  loading?: boolean;
}

export interface EditField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'date';
  required?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onHide,
  title,
  data,
  fields,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<any>(data || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data && show) {
      setFormData(data);
    } else if (!show) {
      setFormData({});
    }
    setErrors({});
  }, [data, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
      // Очистить ошибку для этого поля при изменении
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    }
  };

  const validateForm = () => {
    if (!formData) return false;
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} ist erforderlich`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
      onHide();
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  if (!show || !data) return null;

  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            className="btn-close"
            onClick={onHide}
            disabled={loading}
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form>
            {fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={loading}
                  className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                />
                {errors[field.name] && (
                  <div className="invalid-feedback">{errors[field.name]}</div>
                )}
              </div>
            ))}
          </form>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onHide}
            disabled={loading}
          >
            Abbrechen
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Speichern...' : 'Speichern'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
