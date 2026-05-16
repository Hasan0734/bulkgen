import type { FieldType } from "./types";


export const FIELD_GROUPS: {label:string, items: {type: FieldType, label: string}[]}[] = [
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