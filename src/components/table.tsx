import { ReactNode } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import '../css/table.css';

export interface TableColmn<T> {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => ReactNode;
}

export interface TableProps<T> {
    data: T[];
    columns: TableColmn<T>[];
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onRowClick?: (row: T) => void;
}

const Table = <T extends { id?: number | string }>({ data, columns, onEdit, onDelete, onRowClick }: TableProps<T>) => {
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11">
                        <div className="table-responsive">
                            <table className="table table-bordered custom-table">
                                <thead className="table-header">
                                    <tr>
                                        {columns.map((col) => (
                                            <th key={String(col.key)}>{col.label}</th>
                                        ))}
                                        {(onEdit || onDelete) && <th>Действия</th>}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={columns.length + 1}
                                                className="text-center text-muted"
                                            >
                                                Нет данных
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((row, index) => (
                                            <tr 
                                                key={String(row.id ?? index)}
                                                onClick={() => onRowClick?.(row)}
                                                style={{ 
                                                    cursor: onRowClick ? 'pointer' : 'default' 
                                                }}
                                                className={onRowClick ? 'table-row-clickable' : ''}
                                            >
                                                {columns.map((col) => (
                                                    <td key={String(col.key)}>
                                                        {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                                    </td>
                                                ))}
                                                {(onEdit || onDelete) && (
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            {onEdit && (
                                                                <button
                                                                    className="btn btn-sm btn-edit"
                                                                    onClick={() => onEdit(row)}
                                                                >
                                                                    <MdEdit />
                                                                </button>
                                                            )}
                                                            {onDelete && (
                                                                <button
                                                                    className="btn btn-sm btn-delete"
                                                                    onClick={() => onDelete(row)}
                                                                >
                                                                    <AiOutlineDelete />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;