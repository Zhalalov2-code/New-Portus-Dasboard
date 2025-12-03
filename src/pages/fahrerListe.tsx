import { useGetFahrersQuery } from "../store/api/fahrerApi";
import Table, { TableColmn } from "../components/table";

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
]

const FahrerListe = () => {
    const { data: items = [], isLoading: loading, error } = useGetFahrersQuery();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Fahrer Liste</h1>
                        <button
                            className="btn btn-primary mb-3"
                        >
                            Neuen Fahrer hinzufügen
                        </button>
                        <Table
                            columns={colums}
                            data={items}
                            onEdit={(row) => alert(`Редактировать: ${row.name}`)}
                            onDelete={(row) => alert(`Удалить: ${row.name}`)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FahrerListe;