import { useGetChassiQuery } from "../store/api/chassiApi";
import Table, { TableColmn } from "../components/table";
import VehicleModal from "../components/VehicleModal";
import { useVehicleModal } from "../hooks/useVehicleModal";
import { daysUntil, formatRuDate } from "../utils/dateStatus";
import "../css/status.css";

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
            if (days < 0) return pill(`TÜF: просрочено на ${Math.abs(days)} дн.`, 'bg-danger');
            if (days === 0) return pill('TÜF: сегодня', 'bg-warning text-dark');
            if (days <= 7) return pill(`TÜF: через ${days} дн.`, 'bg-warning text-dark');
            const until = formatRuDate(row.tuf);
            return pill(`TÜF: ОК до ${until}`, 'bg-success');
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
            if (days < 0) return pill(`SP: просрочено на ${Math.abs(days)} дн.`, 'bg-danger');
            if (days === 0) return pill('SP: сегодня', 'bg-warning text-dark');
            if (days <= 7) return pill(`SP: через ${days} дн.`, 'bg-warning text-dark');
            const until = formatRuDate(row.esp);
            return pill(`SP: ОК до ${until}`, 'bg-success');
        }
    },
];

const ChassiListe = () => {
    const { data: items = [], isLoading: loading, error } = useGetChassiQuery();
    const { isOpen, selectedVehicle, vehicleType, openModal, closeModal } = useVehicleModal();

    // Вспомогательные функции перенесены в общий хелпер utils/dateStatus

    // Статус рендерится через render-колонку, дополнительных данных не формируем

    const handleRowClick = (row: any) => {
        openModal(row, 'chassi');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Chassi Liste</h1>
                        <button
                            className="btn btn-primary mb-3"
                        >
                            Neuen Chassi hinzufügen
                        </button>
                        <Table
                            columns={colums}
                            data={items}
                            onEdit={(row) => alert(`Редактировать: ${row.chassi_nummer}`)}
                            onDelete={(row) => alert(`Удалить: ${row.chassi_nummer}`)}
                            onRowClick={handleRowClick}
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
        </>
    );
}

export default ChassiListe;