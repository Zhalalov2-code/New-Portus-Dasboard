import React, { useState } from 'react';
import { MdClose, MdDateRange, MdPerson } from 'react-icons/md';
import {
    useGetMessagesByLkwQuery,
    useGetFilesByMessageLkwQuery,
    useGetMessagesByChassiQuery,
    useGetFilesByMessageChassiQuery,
    useDeleteMessageChassiMutation,
    useDeleteMessageLkwMutation,
    Message_lkw,
    Files_lkw,
    Message_chassi,
    Files_chassi
} from '../store/api/messageApi';
import '../css/vehicleModal.css';

type Message = Message_lkw | Message_chassi;
type FileType = Files_lkw | Files_chassi;

const MessageItem = ({
    message,
    type,
    selectedIds,
    onCheckboxChange
}: {
    message: Message;
    type: 'lkw' | 'chassi';
    selectedIds: number[];
    onCheckboxChange: (id: number) => void;
}) => {
    const { data: lkwFilesResponse } = useGetFilesByMessageLkwQuery(message.id_message, {
        skip: type !== 'lkw'
    });

    const { data: chassiFilesResponse } = useGetFilesByMessageChassiQuery(message.id_message, {
        skip: type !== 'chassi'
    });

    const filesResponse = type === 'lkw' ? lkwFilesResponse : chassiFilesResponse;
    const uploadPath = type === 'lkw' ? 'lkw' : 'chassi';

    const files: FileType[] = (() => {
        if (!filesResponse) return [];
        if (Array.isArray(filesResponse)) return filesResponse;
        if (typeof filesResponse === 'object' && 'data' in filesResponse) {
            const response = filesResponse as any;
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            }
        }
        return [];
    })();

    return (
        <div className="message-item">
            <div className="message-header">
                <div className="message-user">
                    <span className="driver-name">
                        <MdPerson className="me-1" />
                        {message.type_sender}
                    </span>
                </div>
                <span className="message-time">
                    <MdDateRange className="me-1" />
                    {new Date(message.created_ad).toLocaleString('ru-RU')}
                    <input
                        type="checkbox"
                        className="form-check-input ms-4"
                        onChange={() => onCheckboxChange(message.id_message)}
                        checked={selectedIds.includes(message.id_message)}
                    />
                </span>
            </div>

            <div className="message-content">
                <p className="message-text">{message.text}</p>
                {'address' in message && <p className="message-text">{message.address}</p>}

                {files.length > 0 && (
                    <div className="message-images">
                        {files.map((file: any) => (
                            <div key={file.id_file || file.id_files} className="message-image">
                                <img
                                    src={`http://localhost/portusApp1/api/uploads/${uploadPath}/${file.file_name}`}
                                    alt={file.file_name}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/placeholder-vehicle.png';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

interface VehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: {
        id?: number;
        id_lkw?: number;
        id_chassi?: number;
        lkw_nummer?: string;
        chassiNummer?: string;
        chassi_nummer?: string;
    } | null;
    type: 'lkw' | 'chassi';
}

const VehicleModal = ({ isOpen, onClose, vehicle, type }: VehicleModalProps) => {

    const vehicleId = type === 'lkw'
        ? (vehicle as any)?.id_lkw
        : (vehicle as any)?.id_chassi || (vehicle as any)?.id;

    const {
        data: lkwMessagesResponse,
        isLoading: lkwMessagesLoading,
        error: lkwMessagesError
    } = useGetMessagesByLkwQuery(vehicleId || 0, {
        skip: !isOpen || !vehicle || !vehicleId || type !== 'lkw'
    });

    const {
        data: chassiMessagesResponse,
        isLoading: chassiMessagesLoading,
        error: chassiMessagesError
    } = useGetMessagesByChassiQuery(vehicleId || 0, {
        skip: !isOpen || !vehicle || !vehicleId || type !== 'chassi'
    });

    const [deleteMessageLkw, { isLoading: isDeletingLkwMessage }] = useDeleteMessageLkwMutation();
    const [deleteMessageChassi, { isLoading: isDeletingChassiMessage }] = useDeleteMessageChassiMutation();


    const messagesResponse = type === 'lkw' ? lkwMessagesResponse : chassiMessagesResponse;
    const messagesLoading = type === 'lkw' ? lkwMessagesLoading : chassiMessagesLoading;
    const messagesError = type === 'lkw' ? lkwMessagesError : chassiMessagesError;

    const messages: any[] = (() => {
        if (!messagesResponse) return [];
        if (Array.isArray(messagesResponse)) return messagesResponse;
        if (typeof messagesResponse === 'object' && 'data' in messagesResponse) {
            const response = messagesResponse as any;
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            }
        }
        return [];
    })();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const handleClose = () => {
        setSelectedIds([]);
        onClose();
    };

    const handleDeleteMessages = async () => {
        if (selectedIds.length === 0) {
            alert('Bitte wählen Sie mindestens eine Nachricht zum Löschen aus.');
            return;
        }
        const confirmDelete = window.confirm(`Möchten Sie wirklich ${selectedIds.length} Nachricht(en) löschen?`);
        if (!confirmDelete) return;

        try {
            if (type === 'lkw') {
                await Promise.all(selectedIds.map(async (id) => deleteMessageLkw({ id_message: id, id_lkw: vehicleId || 0 }).unwrap()));
            }else{
                await Promise.all(selectedIds.map(async (id) => deleteMessageChassi({ id_message: id, id_chassi: vehicleId || 0 }).unwrap()));
            }
            setSelectedIds([]);
        }catch (error) {
            alert('Fehler beim Löschen der Nachrichten. Bitte versuchen Sie es erneut.');
            console.error('Error deleting messages:', error);
        }
    };

    if (!isOpen || !vehicle) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="vehicle-modal-backdrop" onClick={handleBackdropClick}>
            <div className="vehicle-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        <p className="modal-subtitle">
                            {vehicle.lkw_nummer || vehicle.chassiNummer || vehicle.chassi_nummer}
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={handleClose}>
                        <MdClose size={24} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="messages-chat">
                        <div className="messages-header">
                            <h3>Nachrichten von Fahrern</h3>
                            <span className="messages-count">
                                {messages.length} Einträge
                            </span>
                        </div>

                        <div className="messages-list">
                            {messagesLoading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border" role="status"></div>
                                    <p>Nachrichten werden geladen...</p>
                                </div>
                            ) : messagesError ? (
                                <div className="alert alert-danger">
                                    Fehler beim Laden der Nachrichten
                                </div>
                            ) : messages.length > 0 ? (
                                messages.map((message) => (
                                    <MessageItem
                                        key={message.id_message}
                                        message={message}
                                        type={type}
                                        selectedIds={selectedIds}
                                        onCheckboxChange={handleCheckboxChange}
                                    />
                                ))
                            ) : (
                                <div className="no-messages">
                                    <div className="no-messages-icon">💬</div>
                                    <p>Noch keine Nachrichten von Fahrern</p>
                                    <small>Fahrer können hier Berichte über den Zustand des Fahrzeugs hinterlassen</small>
                                </div>
                            )}
                        </div>
                        {selectedIds.length > 0 && (
                            <div className="delete-button-container">
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={handleDeleteMessages}
                                    disabled={isDeletingChassiMessage || isDeletingLkwMessage}
                                >
                                    Ausgewählte löschen ({selectedIds.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;
