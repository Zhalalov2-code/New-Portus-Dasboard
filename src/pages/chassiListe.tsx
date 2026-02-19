import { useGetChassiQuery, useUpdateChassiMutation, useCreateChassiMutation } from "../store/api/chassiApi";
import Table, { TableColmn } from "../components/table";
import VehicleModal from "../components/VehicleModal";
import EditModal, { EditField } from "../components/EditModal";
import AddModal, { AddField } from "../components/AddModal";
import { useVehicleModal } from "../hooks/useVehicleModal";
import { daysUntil, formatRuDate } from "../utils/dateStatus";
import "../css/status.css";
import { useState } from "react";

export interface Chassi {
    id_chassi: number;
    chassi_nummer: string;
    tuf: string;
    esp: string;
}

const colums: TableColmn<any>[] = [
    { key: 'chassi_nummer', label: 'Chassi Nummer' },
    { key: 'tuf', label: 'TÜF Datum' },
    { key: 'esp', label: 'SP Datum' },
    {
        key: 'tufStatus',
        label: 'TÜF Status',
        render: (_value, row: any) => {
            const days = daysUntil(row.tuf);
            const pill = (content: string, cls: string) => (
                <span
                    className={`badge rounded-pill ${cls} status-pill`}
                    title={row.tuf ? new Date(row.tuf).toLocaleString('ru-RU') : ''}
                >
                    {content}
                </span>
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
                <span
                    className={`badge rounded-pill ${cls} status-pill`}
                    title={row.esp ? new Date(row.esp).toLocaleString('ru-RU') : ''}
                >
                    {content}
                </span>
            );
            if (days === null) return <span className="text-muted">—</span>;
            if (days < 0) return pill(`SP: ${Math.abs(days)} Tage überfällig.`, 'bg-danger');
            if (days === 0) return pill('SP: heute', 'bg-warning text-dark');
            if (days <= 7) return pill(`SP: in ${days} Tagen`, 'bg-warning text-dark');
            const until = formatRuDate(row.esp);
            return pill(`SP: ОК bis ${until}`, 'bg-success');
        }
    },
];

const ChassiListe = () => {
    const { data: items = [], isLoading: loading, error } = useGetChassiQuery();
    const [updateChassi, { isLoading: isUpdating }] = useUpdateChassiMutation();
    const [createChassi, { isLoading: isCreating }] = useCreateChassiMutation();
    const { isOpen, selectedVehicle, vehicleType, openModal, closeModal } = useVehicleModal();
    const [editingChassi, setEditingChassi] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const editFields: EditField[] = [
        { name: 'chassi_nummer', label: 'Chassi Nummer', type: 'text', required: true },
        { name: 'tuf', label: 'TÜF Datum', type: 'date', required: true },
        { name: 'esp', label: 'SP Datum', type: 'date', required: true },
    ];

    const addFields: AddField[] = [
        { name: 'chassi_nummer', label: 'Chassi Nummer', type: 'text', required: true },
        { name: 'tuf', label: 'TÜF Datum', type: 'date', required: true },
        { name: 'esp', label: 'SP Datum', type: 'date', required: true },
    ];

    const handleChatClick = (row: any) => {
        openModal(row, 'chassi');
    };

    const handleEditClick = (row: any) => {
        setEditingChassi(row);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (data: any) => {
        try {
            await updateChassi(data).unwrap();
            setShowEditModal(false);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Chassis:', error);
        }
    };

    const handleSaveAdd = async (data: any) => {
        try {
            await createChassi(data).unwrap();
            setShowAddModal(false);
        } catch (error) {
            console.error('Fehler beim Erstellen des Chassi:', error);
        }
    };

    if (loading) return <div>Laden...</div>;
    if (error) return <div>Fehler: {JSON.stringify(error)}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Chassi Liste</h1>
                        <div className="d-flex gap-2 mb-3 flex-wrap">
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowAddModal(true)}
                            >
                                Neuen Chassi hinzufügen
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => window.location.reload()}
                            >
                                Aktualisieren
                            </button>
                        </div>
                        <Table
                            columns={colums}
                            data={items}
                            onChat={handleChatClick}
                            onEdit={handleEditClick}
                            onDelete={(row) => alert(`Löschen: ${row.chassi_nummer}`)}
                        />
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
                title="Chassi bearbeiten"
                data={editingChassi}
                fields={editFields}
                onSave={handleSaveEdit}
                loading={isUpdating}
            />

            <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                title="Neuen Chassi hinzufügen"
                fields={addFields}
                onSave={handleSaveAdd}
                loading={isCreating}
            />
        </>
    );
}

export default ChassiListe;