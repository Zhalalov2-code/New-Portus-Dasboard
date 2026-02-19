import { useGetFahrersQuery, useUpdateFahrerMutation, useCreateFahrerMutation } from "../store/api/fahrerApi";
import Table, { TableColmn } from "../components/table";
import EditModal, { EditField } from "../components/EditModal";
import AddModal, { AddField } from "../components/AddModal";
import { useState } from "react";

export interface Fahrer {
    id_fahrer: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    lkw: string;
    chassi: string;
}

const colums: TableColmn<any>[] = [
    { key: 'name', label: 'Name' },
    { key: 'lastname', label: 'Nachname' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefon' },
    { key: 'lkw', label: 'LKW' },
    { key: 'chassi', label: 'Chassi' },
];

const FahrerListe = () => {
    const { data: items = [], isLoading: loading, error } = useGetFahrersQuery();
    const [updateFahrer, { isLoading: isUpdating }] = useUpdateFahrerMutation();
    const [createFahrer, { isLoading: isCreating }] = useCreateFahrerMutation();

    const [editingFahrer, setEditingFahrer] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const editFields: EditField[] = [
        { name: 'name', label: 'Vorname', type: 'text', required: true },
        { name: 'lastname', label: 'Nachname', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'lkw', label: 'LKW', type: 'text', required: false },
        { name: 'chassi', label: 'Chassi', type: 'text', required: false },
    ];

    const addFields: AddField[] = [
        { name: 'name', label: 'Vorname', type: 'text', required: true },
        { name: 'lastname', label: 'Nachname', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'lkw', label: 'LKW', type: 'text', required: false },
        { name: 'chassi', label: 'Chassi', type: 'text', required: false },
    ];

    const handleEditClick = (row: any) => {
        setEditingFahrer(row);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (data: any) => {
        try {
            await updateFahrer(data).unwrap();
            setShowEditModal(false);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Fahrers:", error);
        }
    };

    const handleSaveAdd = async (data: any) => {
        try {
            await createFahrer(data).unwrap();
            setShowAddModal(false);
        } catch (error) {
            console.error("Fehler beim Erstellen des Fahrers:", error);
        }
    };

    if (loading) return <div>Laden...</div>;
    if (error) return <div>Fehler: {JSON.stringify(error)}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Fahrer Liste</h1>

                        <div className="d-flex gap-2 mb-3 flex-wrap">
                            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                                Neuen Fahrer hinzufügen
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
                            onEdit={handleEditClick}
                            onDelete={(row) => alert(`Löschen: ${row.name}`)}
                        />
                    </div>
                </div>
            </div>

            <EditModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title="Fahrer bearbeiten"
                data={editingFahrer}
                fields={editFields}
                onSave={handleSaveEdit}
                loading={isUpdating}
            />

            <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                title="Neuen Fahrer hinzufügen"
                fields={addFields}
                onSave={handleSaveAdd}
                loading={isCreating}
            />
        </>
    );
};

export default FahrerListe;
