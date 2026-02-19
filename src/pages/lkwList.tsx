import { useGetLkwsQuery, useUpdateLkwMutation, useCreateLkwMutation } from '../store/api/lkwApi';
import Table, { TableColmn } from '../components/table';
import VehicleModal from '../components/VehicleModal';
import EditModal, { EditField } from '../components/EditModal';
import AddModal, { AddField } from '../components/AddModal';
import { useVehicleModal } from '../hooks/useVehicleModal';
import { daysUntil, formatRuDate } from '../utils/dateStatus';
import '../css/status.css';
import React, { useState } from 'react';

export interface Lkw {
  id_lkw: number
  tuf: string
  esp: string
  lkw_nummer: string
}

    const columns: TableColmn<any>[] = [
        { key: 'lkw_nummer', label: 'LKW Nummer' },
        { key: 'tuf', label: 'TÜF Datum' },
        { key: 'esp', label: 'SP Datum' },
        {
            key: 'tufStatus',
            label: 'TÜF Status',
            render: (_value, row: any) => {
                const days = daysUntil(row.tuf);
                const pill = (content: string, cls: string) => (
                    <span className={`badge rounded-pill ${cls} status-pill`} title={row.tuf ? new Date(row.tuf).toLocaleString('ru-RU') : ''}>{content}</span>
                );
                if (days === null) return <span className="text-muted">—</span>;
                if (days < 0) return pill(`TÜF: ${Math.abs(days)} Tage überfällig.`, 'bg-danger');
                if (days === 0) return pill('TÜF: heute', 'bg-warning text-dark');
                if (days <= 7) return pill(`TÜF: in ${days} Tagen`, 'bg-warning text-dark');
                const until = formatRuDate(row.tuf);
                return pill(`TÜF: ОК bis ${until}`, 'bg-success');
            }
        },
        {
            key: 'spStatus',
            label: 'SP Status',
            render: (_value, row: any) => {
                const days = daysUntil(row.esp);
                const pill = (content: string, cls: string) => (
                    <span className={`badge rounded-pill ${cls} status-pill`} title={row.esp ? new Date(row.esp).toLocaleString('ru-RU') : ''}>{content}</span>
                );
                if (days === null) return <span className="text-muted">—</span>;
                if (days < 0) return pill(`SP: ${Math.abs(days)} Tage überfällig.`, 'bg-danger');
                if (days === 0) return pill('SP: heute', 'bg-warning text-dark');
                if (days <= 7) return pill(`SP: in ${days} Tagen`, 'bg-warning text-dark');
                const until = formatRuDate(row.esp);
                return pill(`SP: ОК bis ${until}`, 'bg-success');
            }
        },
    ]

  

const LkwList = () => {
    const { data: items = [], isLoading: loading, error } = useGetLkwsQuery();
    const [updateLkw, { isLoading: isUpdating }] = useUpdateLkwMutation();
    const [createLkw, { isLoading: isCreating }] = useCreateLkwMutation();
    const { isOpen, selectedVehicle, vehicleType, openModal, closeModal } = useVehicleModal();
    const [editingLkw, setEditingLkw] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const editFields: EditField[] = [
        { name: 'lkw_nummer', label: 'LKW Nummer', type: 'text', required: true },
        { name: 'tuf', label: 'TÜF Datum', type: 'date', required: true },
        { name: 'esp', label: 'SP Datum', type: 'date', required: true },
    ];

    const addFields: AddField[] = [
        { name: 'lkw_nummer', label: 'LKW Nummer', type: 'text', required: true },
        { name: 'tuf', label: 'TÜF Datum', type: 'date', required: true },
        { name: 'esp', label: 'SP Datum', type: 'date', required: true },
    ];


    const handleChatClick = (row: any) => {
        openModal(row, 'lkw');
    };

    const handleEditClick = (row: any) => {
        setEditingLkw(row);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (data: any) => {
        try {
            await updateLkw(data).unwrap();
            setShowEditModal(false);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des LKW:', error);
        }
    };

    const handleSaveAdd = async (data: any) => {
        try {
            await createLkw(data).unwrap();
            setShowAddModal(false);
        } catch (error) {
            console.error('Fehler beim Erstellen des LKW:', error);
        }
    };

    if (loading) return <div>Laden...</div>;
    if (error) return <div>Fehler: {JSON.stringify(error)}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>LKW Liste</h1>
                        <div className="d-flex gap-2 mb-3 flex-wrap">
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowAddModal(true)}
                            >
                                Neuen LKW hinzufügen
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => window.location.reload()}
                            >
                                Aktualisieren
                            </button>
                        </div>

                        <div className="row">
                            <div className='col-12'>
                                {items && items.length > 0 && (
                                    <Table
                                        data={items}
                                        columns={columns}
                                        onChat={handleChatClick}
                                        onEdit={handleEditClick}
                                        onDelete={(row) => alert(`Löschen: ${row.lkw_nummer}`)}
                                    />
                                )}
                                {items && items.length === 0 && (
                                    <div className="alert alert-info">
                                        Keine LKWs gefunden. Bitte fügen Sie einen neuen LKW hinzu.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <VehicleModal
                isOpen={isOpen}
                onClose={closeModal}
                vehicle={selectedVehicle}
                type={vehicleType}
            />

            <EditModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title="LKW bearbeiten"
                data={editingLkw}
                fields={editFields}
                onSave={handleSaveEdit}
                loading={isUpdating}
            />

            <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                title="Neuen LKW hinzufügen"
                fields={addFields}
                onSave={handleSaveAdd}
                loading={isCreating}
            />
        </>
    );
};

export default LkwList;