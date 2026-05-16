import type { TableDef } from '#/lib/types';
import { uid } from '#/lib/utils';
import { create } from 'zustand';

type ApplicationFields = {
    tables: TableDef[],
}

interface ApplicationState extends ApplicationFields {
    addTable: () => void;
}




const initialTables: TableDef[] = [
    {
        id: uid(),
        name: 'users',
        count: 10,
        fields: [
            { id: 'u1', name: 'id', type: 'uuid' },
            { id: 'u2', name: 'full_name', type: 'fullName' },
            { id: 'u3', name: 'email', type: 'email' },
            { id: 'u4', name: 'country', type: 'country' },
            {
                id: 'u5',
                name: 'role',
                type: 'enum',
                enumValues: 'admin, member, viewer',
            },
            { id: 'u6', name: 'active', type: 'boolean' },
        ],
    },
    {
        id: uid(),
        name: 'orders',
        count: 20,
        fields: [
            { id: 'o1', name: 'id', type: 'autoIncrement' },
            { id: 'o2', name: 'user_id', type: 'relation' },
            { id: 'o3', name: 'product', type: 'productName' },
            { id: 'o4', name: 'amount', type: 'price', min: 10, max: 800 },
            {
                id: 'o5',
                name: 'status',
                type: 'enum',
                enumValues: 'paid, pending, refunded',
            },
            { id: 'o6', name: 'created_at', type: 'pastDate' },
            { id: 'o7', name: 'currency', type: 'static', staticValue: 'USD' },
        ],
    },
]
initialTables[1].fields[1].relationTableId = initialTables[0].id;
initialTables[1].fields[1].relationFieldId = initialTables[0].fields[0].id;

function initialState(): ApplicationFields {
    const tables = initialTables
    return {
        tables
    }
}

export const useTableStore = create<ApplicationState>((set, get) => ({
    ...initialState(),
    addTable: () => {
 
        set((state) => ({
            tables: [...state.tables, {
                id: uid(),
                name: `table_${state.tables.length + 1}`,
                count: 10,
                fields: [{ id: uid(), name: 'id', type: 'uuid' }],
            }]
        }))

    }
}))
