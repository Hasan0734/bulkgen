import { faker, allFakers } from "@faker-js/faker";
import type { FieldDef, FieldType, TableDef } from "./types";


export const FIELD_GROUPS: { label: string, items: { type: FieldType, label: string }[] }[] = [
    {
        label: "Identity",
        items: [
            { type: "firstName", label: "First name" },
            { type: "lastName", label: "Last name" },
            { type: "fullName", label: "Full name" },
            { type: "username", label: "Username" },
            { type: "email", label: "Email" },
            { type: "phone", label: "Phone" },
            { type: "avatar", label: "Avatar URL" },
        ],
    },
    {
        label: "Keys",
        items: [
            { type: "uuid", label: "UUID" },
            { type: "autoIncrement", label: "Auto increment" },
        ],
    },
    {
        label: "Location",
        items: [
            { type: "streetAddress", label: "Street address" },
            { type: "city", label: "City" },
            { type: "country", label: "Country" },
            { type: "zipCode", label: "Zip code" },
        ],
    },
    {
        label: "Commerce",
        items: [
            { type: "company", label: "Company" },
            { type: "jobTitle", label: "Job title" },
            { type: "productName", label: "Product name" },
            { type: "price", label: "Price" },
        ],
    },
    {
        label: "Primitives",
        items: [
            { type: "number", label: "Number" },
            { type: "boolean", label: "Boolean" },
            { type: "date", label: "Date" },
            { type: "pastDate", label: "Past date" },
            { type: "futureDate", label: "Future date" },
            { type: "url", label: "URL" },
            { type: "color", label: "Color" },
        ],
    },
    {
        label: "Text",
        items: [
            { type: "sentence", label: "Sentence" },
            { type: "paragraph", label: "Paragraph" },
        ],
    },
    {
        label: "Custom",
        items: [
            { type: "static", label: "Static value" },
            { type: "enum", label: "Enum (pick one)" },
            { type: "relation", label: "Relation (FK)" },
        ],
    },
]


export const fieldLabel = (t: FieldType) => FIELD_GROUPS.flatMap((g) => g.items).find((i) => i.type === t)?.label ?? t;


export function generateData(tables: TableDef[]): Record<string, Record<string, unknown>[]> {
    const out: Record<string, Record<string, unknown>[]> = {};
    return out;
}

export function getValue(field: FieldDef, idx: number): unknown {
    switch (field.type) {
        case "firstName": return faker.person.firstName();
        case "lastName": return faker.person.lastName();
        case "fullName": return faker.person.fullName();
        case "username": return faker.internet.username().toLowerCase();
        case "email": return faker.internet.email().toLowerCase();
        case "phone": return faker.phone.number();
        case "avatar": return faker.image.avatar();
        case "uuid": return faker.string.uuid();
        case "autoIncrement": return idx + 1;
        case "streetAddress": return faker.location.streetAddress();
        case "city": return faker.location.city();
        case "zipCode": return faker.location.zipCode();
        case "company": return faker.company.name();
        case "jobTitle": return faker.person.jobTitle();
        case "jobTitle": return faker.person.jobTitle();
        case "productName": return faker.commerce.productName();
        case "price": return Number(faker.commerce.price({ min: field.min ?? 5, max: field.max ?? 500 }));
        case "number": return faker.number.int({ min: field.min ?? 5, max: field.max ?? 1000 });
        case "boolean": return faker.datatype.boolean();
        case "date": return faker.date.anytime().toISOString();
        case "pastDate": return faker.date.past().toISOString();
        case "futureDate": return faker.date.future().toISOString();
        case "url": return faker.internet.url();
        case "color": return faker.color.rgb();
        case "sentence": return faker.lorem.sentence();
        case "paragraph": return faker.lorem.paragraph();
        case "static": return field.staticValue ?? "";
        case "enum": {
            const vals = (field.enumValues ?? "").split(",").map((s) => s.trim()).filter(Boolean)
            return vals.length ? faker.helpers.arrayElement(vals) : null;
        }

        default: return null;
    }
}


export const toCSV = (rows: Record<string, unknown>[]): string => {

    if (!rows.length) return "";

    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
        if (v === null || v === undefined) return "";
        const s = typeof v === "object" ? JSON.stringify(v) : String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;

    }
    return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n')

}

export const toSQL = (tableName: string, rows: Record<string, unknown>[]): string => {
    if (!rows.length) return `-- ${tableName} : no rows\n`
    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number") return String(v);
        if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
        return `'${String(v).replace(/'/g, "''")}'`;
    };
    return rows.map((r) => `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys.map((k) => esc(r[k])).join(', ')});`).join('\n')
}