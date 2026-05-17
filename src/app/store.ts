import type { FieldDef, FieldType, TableDef } from '#/lib/types';
import { uid } from '#/lib/utils';
import { create } from 'zustand';
import { getValue } from '#/lib/generator';

type ApplicationFields = {
    tables: TableDef[]
    data: Record<string, Record<string, unknown>[]>
}

interface ApplicationState extends ApplicationFields {
    setTables: (table: TableDef) => void;
    addTable: () => void;
    updateTable: (table: TableDef) => void;
    removeTable: (id: string) => void;
    addTableField: (table: TableDef) => void;
    updateTableField: (f: FieldDef, table: TableDef) => void;
    removeField: (table: TableDef, fieldId: string) => void;
    generateData: () => void;
}




const initialTables: TableDef[] = [
    {
        id: uid(),
        name: 'users',
        count: 10,
        fields: [
            { id: 'u1', name: 'id', type: 'uuid' },
            { id: 'u2', name: 'full_name', type: 'fullName' },
          
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
    const data = {}
    return {
        tables,
        data
    }
}

export const useTableStore = create<ApplicationState>((set, get) => ({
    ...initialState(),
    setTables: (table: TableDef) => {
        set((state) => ({ tables: state.tables.map((tb) => (tb.id === table.id ? table : tb)) }))
    },
    addTable: () => {
        set((state) => ({
            tables: [...state.tables, {
                id: uid(),
                name: `table_${state.tables.length + 1}`,
                count: 10,
                fields: [{ id: uid(), name: 'id', type: 'uuid' }],
            }]
        }))

    },

    updateTable: (updateTable: TableDef) => {
        get().setTables(updateTable)
    },

    removeTable: (id: string) => {
        set((state) => ({ tables: state.tables.filter((tb) => tb.id !== id) }))
    },

    addTableField: (table: TableDef) => {
        const newField = {id: uid(), name: `field_${table.fields.length + 1}`, type: "firstName" as FieldType}

        const tb = { ...table, fields: [...table.fields, { ...newField }] }
        get().setTables(tb)

        // set((state) => ({tables: state.tables.map((tb) => (tb.id === table.id ?
        //     { ...tb, fields: [...tb.fields, { id: uid(), name: `field_${tb.fields.length + 1}`, type: "firstName" }] }
        //     : tb))}))

    },
    updateTableField: (f: FieldDef, table: TableDef) => {
        const tb = {
            ...table,
            fields: table.fields.map((x) => (x.id == f.id ? f : x)),
        }

        get().setTables(tb)
    },
    removeField: (table: TableDef, fieldId: string) => {
        const filteredTable = { ...table, fields: table.fields.filter((x) => x.id !== fieldId) };
        get().setTables(filteredTable)
    },

    generateData: () => {
        const tables = get().tables;
        const out: Record<string, Record<string, unknown>[]> = {}

        // generate non-relations data
        for (const table of tables) {
            const rows = [];
            for (let i = 0; i < table.count; i++) {
                const row: Record<string, unknown> = {}
                for (const field of table.fields) {
                    const value = getValue(field, i);
                    row[field.name] = value;
                }
                rows.push(row)
            }
            out[table.name] = rows;
        }
        // generate relations data
        for(const table of tables) {

            for (const field of table.fields) {
                const rows = out[table.name]
                if(field.type !== 'relation') continue;
                const refTable = tables.find((x) => x.id === field.relationTableId);
                if(!refTable) continue;
                const refRows = out[refTable.name]
                const refField = refTable.fields.find((x) => x.id === field.relationFieldId)
                if(!refField || !refRows.length) continue;

                for(const r of rows){
                    const pick = refRows[Math.floor(Math.random() * refRows.length)];
                    r[field.name] = pick[refField?.name]
                }

            }
        }

       set({data: out})

    }


}))

