import { generateCSV, generateData } from './../utils/generator.function';
import type { FieldDef, FieldType, TableDef } from '#/lib/types';
import { uid } from '#/lib/utils';
import { create } from 'zustand';
import DataWorker from '../utils/generator-stream.worker?worker'
import SQLWorker from '../utils/sql-stream.worker?worker'


type ApplicationFields = {
    tables: TableDef[]
    data: Record<string, Record<string, unknown>[]>
    isGenerating: boolean
    sql: Record<string, string>
    csv: Record<string, string>
    json: Record<string, string>

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
    toSQL: (tableName: string) => void;
    toCSV: (tableName: string) => void;
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
    const data = {};
    const isGenerating = false
    const sql = {};
    const csv = {};
    const json = {}
    return {
        tables,
        data,
        isGenerating,
        sql,
        csv,
        json
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
        const newField = { id: uid(), name: `field_${table.fields.length + 1}`, type: "firstName" as FieldType }

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

    generateData: async () => {
        const tables = get().tables;
        if (!tables.length) return;
        // 1. Clear out old preview data and turn on loading state
        set({ isGenerating: true, sql: {}, json: {}, csv: {} })
        try {
            const gendData = await generateData({ data: tables })
            set({ isGenerating: false, sql: gendData.sql, json: gendData.json, csv: gendData.csv })
        } catch (error) {

        }

        // const worker = new DataWorker();
        // worker.postMessage(tables)

        // worker.onmessage = (event: MessageEvent) => {
        //     const { type, tableName, rows } = event.data

        //     if (type === 'chunk') {
        //         set((state) => ({
        //             data: {
        //                 ...state.data,
        //                 [tableName]: [...(state.data[tableName] || []), ...rows],
        //             },
        //         }))
        //     }
        //     else if (type === 'relation_update') {
        //         set((state) => ({
        //             data: {
        //                 ...state.data,
        //                 // Overwrite the table with completed relational values
        //                 [tableName]: rows,
        //             },
        //         }))
        //     }
        //     else if (type === 'done') {
        //         set({ isGenerating: false })
        //         worker.terminate() // Clean up thread memory
        //     }
        // }

        // worker.onerror = (error) => {
        //     console.log("Worker Crashed:", error)
        //     set({ isGenerating: false })
        //     worker.terminate()
        // }
    },


    toSQL: (tableName: string) => {
        const data = get().data;
        const rows = data[tableName] ?? []
        // if (!rows.length) {
        //     set({ sql: `-- ${tableName} : no rows\n` });
        //     return;
        // }

        const worker = new SQLWorker();
        worker.postMessage({ rows, tableName });

        worker.onmessage = (event) => {
            const { text, type } = event.data;
            if (type === 'done') {
                set({ sql: text }); // ✨ Push straight to state
                worker.terminate();
            }
        };

    },

    toCSV: async (tableName: string) => {
        const data = get().data;
        const rows = data[tableName] ?? []
        if (!rows.length) return "";
        const isGenerating = get().isGenerating;
        if (isGenerating) return ""

        // try {
        //     const res = await generateCSV({ data: rows })
        //     if (res.success) {
        //         set({ csv: res.csv })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }


}))




// const out: Record<string, Record<string, unknown>[]> = {}

// // generate non-relations data
// for (const table of tables) {
//     const rows = [];
//     for (let i = 0; i < table.count; i++) {
//         const row: Record<string, unknown> = {}
//         for (const field of table.fields) {
//             const value = getValue(field, i);
//             row[field.name] = value;
//         }
//         rows.push(row)
//     }
//     out[table.name] = rows;
// }
// // generate relations data
// for(const table of tables) {

//     for (const field of table.fields) {
//         const rows = out[table.name]
//         if(field.type !== 'relation') continue;
//         const refTable = tables.find((x) => x.id === field.relationTableId);
//         if(!refTable) continue;
//         const refRows = out[refTable.name]
//         const refField = refTable.fields.find((x) => x.id === field.relationFieldId)
//         if(!refField || !refRows.length) continue;

//         for(const r of rows){
//             const pick = refRows[Math.floor(Math.random() * refRows.length)];
//             r[field.name] = pick[refField?.name]
//         }

//     }
// }