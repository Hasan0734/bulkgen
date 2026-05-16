export type FieldType =
    | "firstName"
    | "lastName"
    | "fullName"
    | "email"
    | "username"
    | "phone"
    | "avatar"
    | "uuid"
    | "autoIncrement"
    | "streetAddress"
    | "city"
    | "country"
    | "zipCode"
    | "company"
    | "jobTitle"
    | "productName"
    | "price"
    | "number"
    | "boolean"
    | "date"
    | "pastDate"
    | "futureDate"
    | "paragraph"
    | "sentence"
    | "url"
    | "color"
    | "static"
    | "enum"
    | "relation";

export type FieldDef = {
    id: string;
    name: string;
    type: FieldType;
    staticValue?: string;
    enumValues?: string;
    min?: number;
    max?: number;
    relationTableId?: string;
    relationFieldId?: string
}

export type TableDef = {
    id: string;
    name: string;
    count: number;
    fields: FieldDef[];
}