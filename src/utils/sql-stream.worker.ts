
self.onmessage =  (event: MessageEvent) => {

    const rows: Record<string, unknown>[] = event.data.rows;
    const tableName = event.data.tableName;

    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number") return String(v);
        if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
        return `'${String(v).replace(/'/g, "''")}'`;
    };

    const text = rows.map((r) => `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys.map((k) => esc(r[k])).join(', ')});`).join('\n');

    self.postMessage({ type: 'done', text })
}