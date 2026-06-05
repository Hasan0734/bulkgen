import { getValue, toCSV, toJSON, toSQL } from '#/lib/generator';
import type { TableDef } from '#/lib/types';
import { createServerFn } from '@tanstack/react-start'

type dataType = {
  tableName: string;
  rows: Record<string, unknown>[]
}

export const generateData = createServerFn({ method: 'POST' }).inputValidator((data: TableDef[]) => {
  if (!data.length) {
    throw new Error('Except tables')
  }
  return { tables: data || [] };

}).handler(async ({ data }) => {
  const tables = data.tables
  const out: Record<string, Record<string, unknown>[]> = {};

  // 1. Generate non-relations data
  for (const table of tables) {
    out[table.name] = Array.from({ length: table.count }, (_, i) => {
      return table.fields.reduce((row, field) => {
        row[field.name] = getValue(field, i);
        return row;
      }, {} as Record<string, unknown>)
    })
  }

  // 2. Generate relations data
  for (const table of tables) {
    const rows = out[table.name];
    if (!rows || !rows.length) continue;

    const relationFields = table.fields.filter((f) => f.type === 'relation')

    if (!relationFields.length) continue;

    for (const r of rows) {
      const pickedRowsCache: Record<string, Record<string, unknown>> = {};

      for (const field of relationFields) {
        if (!field.relationTableId || !field.relationFieldId) continue;

        const refTable = tables.find((tb) => tb.id === field.relationTableId);
        if (!refTable) continue;

        const refRows = out[refTable.name];
        const refField = refTable.fields.find((f) => f.id === field.relationFieldId);
        if (!refField || !refRows.length) continue;

        if (!pickedRowsCache[field.relationTableId]) {
          const randomPick = refRows[Math.floor(Math.random() * refRows.length)];
          pickedRowsCache[field.relationTableId] = randomPick;
        }

        const pick = pickedRowsCache[field.relationTableId];
        r[field.name] = pick[refField.name]
      }
    }
  }


  const sqlData = toSQL(out)
  const cvsData = toCSV(out);
  const jsonData = toJSON(out)

  return {
    success: true,
    json: jsonData,
    sql: sqlData,
    csv: cvsData
  }
})


// for (const table of tables) {
//   const rows = [];
//   for (let i = 0; i < table.count; i++) {
//     const row: Record<string, unknown> = {};
//     for (const field of table.fields) {
//       const value = getValue(field, i);
//       row[field.name] = value;
//     }
//     rows.push(row);
//   }
//   out[table.name] = rows;
// }

// for (const table of tables) {
//   for (const field of table.fields) {
//     console.log(field)
//     if (field.type !== 'relation') continue;

//     const rows = out[table.name];
//     const refTable = tables.find((x: any) => x.id === field.relationTableId);
//     if (!refTable) continue;

//     const refRows = out[refTable.name];
//     const refField = refTable.fields.find((x: any) => x.id === field.relationFieldId);
//     if (!refField || !refRows.length) continue;

//     console.log(refRows, refField, rows)

//     for (const r of rows) {
//       const pick = refRows[Math.floor(Math.random() * refRows.length)];
//       r[field.name] = pick[refField.name];
//     }


//   }
// }

export const generateSQL = createServerFn({ method: 'POST' })
  .inputValidator((data: dataType) => {
    if (!(data)) {
      throw new Error('Expected FormData')
    }

    return {
      tableName: data.tableName || '',
      rows: data.rows || [],
    }
  })
  .handler(async ({ data }) => {
    const rows = data.rows;

    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === "object" ? JSON.stringify(v) : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;

    }
    const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
    return { success: true, csv }
  })


export const generateCSV = createServerFn({ method: 'POST' })
  .inputValidator((data: Record<string, unknown>[]) => {
    if (!data) {
      throw new Error('Expected FormData')
    }
    return data || []
  })
  .handler(async ({ data }) => {
    const rows = data;

    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === "object" ? JSON.stringify(v) : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;

    }
    const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
    return { success: true, csv }
  })