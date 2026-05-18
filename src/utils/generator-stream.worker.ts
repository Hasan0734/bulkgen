import { getValue } from "#/lib/generator";

self.onmessage = async (event: MessageEvent) => {
    const tables = event.data;
    const outInMemory: Record<string, Record<string, unknown>[]> = {}
    const BATCH_SIZE = 100

    // 1. Generate non-relations data
    for (const table of tables) {
        const allTableRows: Record<string, unknown>[] = []
        let currentBatch: Record<string, unknown>[] = []

        for (let i = 0; i < table.count; i++) {
            const row: Record<string, unknown> = {};
            for (const field of table.fields) {
                const value = getValue(field, i);
                row[field.name] = value;
            }
            allTableRows.push(row)
            currentBatch.push(row)
            if (currentBatch.length === BATCH_SIZE || i === table.count - 1) {
                self.postMessage({
                    type: 'chunk',
                    tableName: table.name,
                    rows: currentBatch,
                })
                currentBatch = []

                // Give the CPU a microscopic 0ms break to keep things fluid
                await new Promise((resolve) => setTimeout(resolve, 0))
            }
        }
        outInMemory[table.name] = allTableRows
    }
    // 2. Generate relations data
    for (const table of tables) {
        let structureUpdated = false
        for (const field of table.fields) {
            if (field.type !== 'relation') continue;

            const rows = outInMemory[table.name];
            const refTable = tables.find((x: any) => x.id === field.relationTableId);
            if (!refTable) continue;

            const refRows = outInMemory[refTable.name];
            const refField = refTable.fields.find((x: any) => x.id === field.relationFieldId);
            if (!refField || !refRows.length) continue;

            for (const r of rows) {
                const pick = refRows[Math.floor(Math.random() * refRows.length)];
                r[field.name] = pick[refField.name];
            }
            structureUpdated = true
        }
        if (structureUpdated) {
            self.postMessage({
                type: 'relation_update',
                tableName: table.name,
                rows: outInMemory[table.name],
            })
        }
    }

    self.postMessage({ type: 'done' })
}