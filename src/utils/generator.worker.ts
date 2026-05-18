import { getValue } from "#/lib/generator";

self.onmessage = (event: MessageEvent) => {
    const tables = event.data;
    const out: Record<string, Record<string, unknown>[]> = {};

    // 1. Generate non-relations data
    for (const table of tables) {
        const rows = [];
        for (let i = 0; i < table.count; i++) {
            const row: Record<string, unknown> = {};
            for (const field of table.fields) {
                const value = getValue(field, i);
                row[field.name] = value;
            }
            rows.push(row);
        }
        out[table.name] = rows;
    }
    // 2. Generate relations data
    for (const table of tables) {
        for (const field of table.fields) {
            if (field.type !== 'relation') continue;

            const rows = out[table.name];
            const refTable = tables.find((x: any) => x.id === field.relationTableId);
            if (!refTable) continue;

            const refRows = out[refTable.name];
            const refField = refTable.fields.find((x: any) => x.id === field.relationFieldId);
            if (!refField || !refRows.length) continue;

            for (const r of rows) {
                const pick = refRows[Math.floor(Math.random() * refRows.length)];
                r[field.name] = pick[refField.name];
            }
        }
    }

    self.postMessage({ status: 'success', data: out });
}