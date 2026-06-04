import { faker } from "@faker-js/faker";
import type { FieldDef, FieldType } from "./types";
import { browsers, devices, OS } from "./constant";


export const FIELD_GROUPS: { label: string; items: { type: FieldType; label: string }[] }[] = [
  {
    label: "Person",
    items: [
      { type: "firstName", label: "First name" },
      { type: "lastName", label: "Last name" },
      { type: "middleName", label: "Middle name" },
      { type: "fullName", label: "Full name" },
      { type: "prefix", label: "Name prefix" },
      { type: "suffix", label: "Name suffix" },
      { type: "gender", label: "Gender" },
      { type: "sex", label: "Sex" },
      { type: "jobTitle", label: "Job title" },
      { type: "jobArea", label: "Job area" },
      { type: "jobType", label: "Job type" },
      { type: "jobDescriptor", label: "Job descriptor" },
      { type: "bio", label: "Bio" },
      { type: "zodiacSign", label: "Zodiac sign" },
    ],
  },
  {
    label: "Internet",
    items: [
      { type: "email", label: "Email" },
      { type: "username", label: "Username" },
      { type: "password", label: "Password" },
      { type: "url", label: "URL" },
      { type: "domainName", label: "Domain name" },
      { type: "ipv4", label: "IPv4" },
      { type: "ipv6", label: "IPv6" },
      { type: "mac", label: "MAC address" },
      { type: "userAgent", label: "User agent" },
      { type: "emoji", label: "Emoji" },
      { type: "httpMethod", label: "HTTP method" },
      { type: "httpStatusCode", label: "HTTP status" },
      { type: "browser", label: "Browser" }
    ],
  },
  {
    label: "Phone",
    items: [
      { type: "phone", label: "Phone" },
      { type: "imei", label: "IMEI" },
    ],
  },
  {
    label: "Media",
    items: [
      { type: "avatar", label: "Avatar URL" },
      { type: "imageUrl", label: "Image URL" },
      { type: "imageUrlPeople", label: "Image • People" },
      { type: "imageUrlNature", label: "Image • Nature" },
      { type: "imageUrlCity", label: "Image • City" },
      { type: "imageUrlTech", label: "Image • Tech" },
      { type: "imageUrlAbstract", label: "Image • Abstract" },
    ],
  },
  {
    label: "Keys & IDs",
    items: [
      { type: "uuid", label: "UUID" },
      { type: "nanoid", label: "Nano ID" },
      { type: "autoIncrement", label: "Auto increment" },
      { type: "objectId", label: "Mongo ObjectId" },
      { type: "hexString", label: "Hex string" },
    ],
  },
  {
    label: "Location",
    items: [
      { type: "streetAddress", label: "Street address" },
      { type: "secondaryAddress", label: "Secondary address" },
      { type: "city", label: "City" },
      { type: "state", label: "State" },
      { type: "stateAbbr", label: "State abbr" },
      { type: "country", label: "Country" },
      { type: "countryCode", label: "Country code" },
      { type: "zipCode", label: "Zip code" },
      { type: "latitude", label: "Latitude" },
      { type: "longitude", label: "Longitude" },
      { type: "timeZone", label: "Time zone" },
      { type: "directionCardinal", label: "Direction" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { type: "company", label: "Company" },
      { type: "companySuffix", label: "Company suffix" },
      { type: "catchPhrase", label: "Catch phrase" },
      { type: "buzzPhrase", label: "Buzz phrase" },
      { type: "productName", label: "Product name" },
      { type: "productDescription", label: "Product description" },
      { type: "productMaterial", label: "Product material" },
      { type: "productAdjective", label: "Product adjective" },
      { type: "department", label: "Department" },
      { type: "price", label: "Price" },
      { type: "sku", label: "SKU" },
      { type: "isbn", label: "ISBN" },
    ],
  },
  {
    label: "Finance",
    items: [
      { type: "accountNumber", label: "Account number" },
      { type: "routingNumber", label: "Routing number" },
      { type: "iban", label: "IBAN" },
      { type: "bic", label: "BIC" },
      { type: "creditCardNumber", label: "Credit card" },
      { type: "creditCardCvv", label: "Credit card CVV" },
      { type: "creditCardIssuer", label: "Card issuer" },
      { type: "currencyCode", label: "Currency code" },
      { type: "currencyName", label: "Currency name" },
      { type: "currencySymbol", label: "Currency symbol" },
      { type: "bitcoinAddress", label: "Bitcoin address" },
      { type: "ethereumAddress", label: "Ethereum address" },
      { type: "transactionType", label: "Transaction type" },
      { type: "amount", label: "Amount" },
    ],
  },
  {
    label: "Vehicle",
    items: [
      { type: "vehicle", label: "Vehicle" },
      { type: "vehicleMake", label: "Make" },
      { type: "vehicleModel", label: "Model" },
      { type: "vehicleType", label: "Type" },
      { type: "vehicleFuel", label: "Fuel" },
      { type: "vehicleColor", label: "Color" },
      { type: "vrm", label: "License plate (VRM)" },
      { type: "vin", label: "VIN" },
    ],
  },
  {
    label: "Food",
    items: [
      { type: "food", label: "Food" },
      { type: "foodDish", label: "Dish" },
      { type: "foodIngredient", label: "Ingredient" },
      { type: "foodSpice", label: "Spice" },
      { type: "foodEthnicCategory", label: "Cuisine" },
    ],
  },
  {
    label: "Animal",
    items: [
      { type: "animalType", label: "Animal type" },
      { type: "dog", label: "Dog breed" },
      { type: "cat", label: "Cat breed" },
      { type: "bird", label: "Bird" },
      { type: "fish", label: "Fish" },
      { type: "horse", label: "Horse" },
      { type: "insect", label: "Insect" },
    ],
  },
  {
    label: "Music",
    items: [
      { type: "musicGenre", label: "Music genre" },
      { type: "songName", label: "Song name" },
    ],
  },
  {
    label: "Book",
    items: [
      { type: "bookTitle", label: "Book title" },
      { type: "bookAuthor", label: "Book author" },
      { type: "bookGenre", label: "Book genre" },
      { type: "bookPublisher", label: "Book publisher" },
    ],
  },
  {
    label: "Science",
    items: [
      { type: "chemicalElement", label: "Chemical element" },
      { type: "unit", label: "Measurement unit" },
    ],
  },
  {
    label: "Hacker / Tech",
    items: [
      { type: "hackerPhrase", label: "Hacker phrase" },
      { type: "hackerVerb", label: "Hacker verb" },
      { type: "hackerNoun", label: "Hacker noun" },
      { type: "hackerAdjective", label: "Hacker adjective" },
      { type: "hackerAbbreviation", label: "Hacker abbreviation" },
    ],
  },
  {
    label: "System",
    items: [
      { type: "fileName", label: "File name" },
      { type: "filePath", label: "File path" },
      { type: "fileExt", label: "File extension" },
      { type: "mimeType", label: "MIME type" },
      { type: "semver", label: "Semver" },
      { type: "os", label: "OS" },
      { type: "device", label: "Device" },
    ],
  },
  {
    label: "Git",
    items: [
      { type: "gitBranch", label: "Git branch" },
      { type: "gitCommitSha", label: "Commit SHA" },
      { type: "gitCommitMessage", label: "Commit message" },
    ],
  },
  {
    label: "Airline",
    items: [
      { type: "airline", label: "Airline" },
      { type: "airplane", label: "Airplane" },
      { type: "airport", label: "Airport" },
      { type: "flightNumber", label: "Flight number" },
      { type: "seatNumber", label: "Seat number" },
    ],
  },
  {
    label: "Sport",
    items: [{ type: "sport", label: "Sport" }],
  },
  {
    label: "Lorem",
    items: [
      { type: "word", label: "Word" },
      { type: "words", label: "Words" },
      { type: "sentence", label: "Sentence" },
      { type: "sentences", label: "Sentences" },
      { type: "paragraph", label: "Paragraph" },
      { type: "paragraphs", label: "Paragraphs" },
      { type: "slug", label: "Slug" },
    ],
  },
  {
    label: "Primitives",
    items: [
      { type: "number", label: "Integer" },
      { type: "float", label: "Float" },
      { type: "boolean", label: "Boolean" },
      { type: "date", label: "Date (any)" },
      { type: "pastDate", label: "Past date" },
      { type: "futureDate", label: "Future date" },
      { type: "recentDate", label: "Recent date" },
      { type: "soonDate", label: "Soon date" },
      { type: "weekday", label: "Weekday" },
      { type: "month", label: "Month" },
      { type: "color", label: "Color (rgb)" },
      { type: "colorHex", label: "Color (hex)" },
      { type: "colorHuman", label: "Color name" },
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
];

export const fieldLabel = (t: FieldType) => FIELD_GROUPS.flatMap((g) => g.items).find((i) => i.type === t)?.label ?? t;

export function generateData(): Record<string, Record<string, unknown>[]> {
  const out: Record<string, Record<string, unknown>[]> = {};
  return out;
}



const getRandomOS = () => {
  const randomIndex = Math.floor(Math.random() * OS.length);
  return OS[randomIndex]
}

const getRandomDevice = () => {
  const randomIndex = Math.floor(Math.random() * devices.length);
  return devices[randomIndex]
}
const getRandomBrowser = () => {
  const randomIndex = Math.floor(Math.random() * browsers.length);
  return browsers[randomIndex]
}

export function getValue(field: FieldDef, idx: number): unknown {

  switch (field.type) {
    // Person
    case "firstName": return faker.person.firstName();
    case "lastName": return faker.person.lastName();
    case "middleName": return faker.person.middleName();
    case "fullName": return faker.person.fullName();
    case "prefix": return faker.person.prefix();
    case "suffix": return faker.person.suffix();
    case "gender": return faker.person.gender();
    case "sex": return faker.person.sex();
    case "jobTitle": return faker.person.jobTitle();
    case "jobArea": return faker.person.jobArea();
    case "jobType": return faker.person.jobType();
    case "jobDescriptor": return faker.person.jobDescriptor();
    case "bio": return faker.person.bio();
    case "zodiacSign": return faker.person.zodiacSign();
    // Internet
    case "email": return faker.internet.email().toLowerCase();
    case "username": return faker.internet.username().toLowerCase();
    case "password": return faker.internet.password();
    case "url": return faker.internet.url();
    case "domainName": return faker.internet.domainName();
    case "ipv4": return faker.internet.ipv4();
    case "ipv6": return faker.internet.ipv6();
    case "mac": return faker.internet.mac();
    case "userAgent": return faker.internet.userAgent();
    case "emoji": return faker.internet.emoji();
    case "httpMethod": return faker.internet.httpMethod();
    case "httpStatusCode": return faker.internet.httpStatusCode();
    case "browser": return getRandomBrowser();
    // Phone
    case "phone": return faker.phone.number();
    case "imei": return faker.phone.imei();
    // Media
    case "avatar": return faker.image.avatar();
    case "imageUrl": return faker.image.url();
    case "imageUrlPeople": return faker.image.urlLoremFlickr({ category: "people" });
    case "imageUrlNature": return faker.image.urlLoremFlickr({ category: "nature" });
    case "imageUrlCity": return faker.image.urlLoremFlickr({ category: "city" });
    case "imageUrlTech": return faker.image.urlLoremFlickr({ category: "technics" });
    case "imageUrlAbstract": return faker.image.urlLoremFlickr({ category: "abstract" });
    // Keys
    case "uuid": return faker.string.uuid();
    case "nanoid": return faker.string.nanoid();
    case "autoIncrement": return idx + 1;
    case "objectId": return faker.database.mongodbObjectId();
    case "hexString": return faker.string.hexadecimal({ length: 16 });
    // Location
    case "streetAddress": return faker.location.streetAddress();
    case "secondaryAddress": return faker.location.secondaryAddress();
    case "city": return faker.location.city();
    case "state": return faker.location.state();
    case "stateAbbr": return faker.location.state({ abbreviated: true });
    case "country": return faker.location.country();
    case "countryCode": return faker.location.countryCode();
    case "zipCode": return faker.location.zipCode();
    case "latitude": return faker.location.latitude();
    case "longitude": return faker.location.longitude();
    case "timeZone": return faker.location.timeZone();
    case "directionCardinal": return faker.location.cardinalDirection();
    // Commerce
    case "company": return faker.company.name();
    case "companySuffix": return faker.helpers.arrayElement(["Inc", "LLC", "Ltd", "Group", "Co", "Corp", "Holdings"]);
    case "catchPhrase": return faker.company.catchPhrase();
    case "buzzPhrase": return faker.company.buzzPhrase();
    case "productName": return faker.commerce.productName();
    case "productDescription": return faker.commerce.productDescription();
    case "productMaterial": return faker.commerce.productMaterial();
    case "productAdjective": return faker.commerce.productAdjective();
    case "department": return faker.commerce.department();
    case "price": return Number(faker.commerce.price({ min: field.min ?? 5, max: field.max ?? 500 }));
    case "sku": return faker.string.alphanumeric({ length: 10, casing: "upper" });
    case "isbn": return faker.commerce.isbn();
    // Finance
    case "accountNumber": return faker.finance.accountNumber();
    case "routingNumber": return faker.finance.routingNumber();
    case "iban": return faker.finance.iban();
    case "bic": return faker.finance.bic();
    case "creditCardNumber": return faker.finance.creditCardNumber();
    case "creditCardCvv": return faker.finance.creditCardCVV();
    case "creditCardIssuer": return faker.finance.creditCardIssuer();
    case "currencyCode": return field.staticValue ? field.staticValue : faker.finance.currencyCode();
    case "currencyName": return field.staticValue ? field.staticValue : faker.finance.currencyName();
    case "currencySymbol": return field.staticValue ? field.staticValue : faker.finance.currencySymbol();
    case "bitcoinAddress": return faker.finance.bitcoinAddress();
    case "ethereumAddress": return faker.finance.ethereumAddress();
    case "transactionType": return faker.finance.transactionType();
    case "amount": return Number(faker.finance.amount({ min: field.min ?? 1, max: field.max ?? 10000 }));
    // Vehicle
    case "vehicle": return faker.vehicle.vehicle();
    case "vehicleMake": return faker.vehicle.manufacturer();
    case "vehicleModel": return faker.vehicle.model();
    case "vehicleType": return faker.vehicle.type();
    case "vehicleFuel": return faker.vehicle.fuel();
    case "vehicleColor": return faker.vehicle.color();
    case "vrm": return faker.vehicle.vrm();
    case "vin": return faker.vehicle.vin();
    // Food
    case "food": return faker.food.dish();
    case "foodDish": return faker.food.dish();
    case "foodIngredient": return faker.food.ingredient();
    case "foodSpice": return faker.food.spice();
    case "foodEthnicCategory": return faker.food.ethnicCategory();
    // Animal
    case "animalType": return faker.animal.type();
    case "dog": return faker.animal.dog();
    case "cat": return faker.animal.cat();
    case "bird": return faker.animal.bird();
    case "fish": return faker.animal.fish();
    case "horse": return faker.animal.horse();
    case "insect": return faker.animal.insect();
    // Music
    case "musicGenre": return faker.music.genre();
    case "songName": return faker.music.songName();
    // Book
    case "bookTitle": return faker.book.title();
    case "bookAuthor": return faker.book.author();
    case "bookGenre": return faker.book.genre();
    case "bookPublisher": return faker.book.publisher();
    // Science
    case "chemicalElement": return faker.science.chemicalElement().name;
    case "unit": return faker.science.unit().name;
    // Hacker
    case "hackerPhrase": return faker.hacker.phrase();
    case "hackerVerb": return faker.hacker.verb();
    case "hackerNoun": return faker.hacker.noun();
    case "hackerAdjective": return faker.hacker.adjective();
    case "hackerAbbreviation": return faker.hacker.abbreviation();
    // System
    case "fileName": return faker.system.fileName();
    case "filePath": return faker.system.filePath();
    case "fileExt": return faker.system.fileExt();
    case "mimeType": return faker.system.mimeType();
    case "semver": return faker.system.semver();
    case "device": return getRandomDevice();
    case "os": return getRandomOS()
    // Git
    case "gitBranch": return faker.git.branch();
    case "gitCommitSha": return faker.git.commitSha();
    case "gitCommitMessage": return faker.git.commitMessage();
    // Airline
    case "airline": return faker.airline.airline().name;
    case "airplane": return faker.airline.airplane().name;
    case "airport": return faker.airline.airport().name;
    case "flightNumber": return faker.airline.flightNumber();
    case "seatNumber": return faker.airline.seat();
    // Sport
    case "sport": return faker.word.noun();
    // Lorem
    case "word": return faker.lorem.word();
    case "words": return faker.lorem.words();
    case "sentence": return faker.lorem.sentence();
    case "sentences": return faker.lorem.sentences();
    case "paragraph": return faker.lorem.paragraph();
    case "paragraphs": return faker.lorem.paragraphs();
    case "slug": return faker.lorem.slug();
    // Primitives
    case "number": return faker.number.int({ min: field.min ?? 0, max: field.max ?? 1000 });
    case "float": return faker.number.float({ min: field.min ?? 0, max: field.max ?? 1000, fractionDigits: 2 });
    case "boolean": return faker.datatype.boolean();
    case "date": return faker.date.anytime().toISOString();
    case "pastDate": return faker.date.past().toISOString();
    case "futureDate": return faker.date.future().toISOString();
    case "recentDate": return faker.date.recent().toISOString();
    case "soonDate": return faker.date.soon().toISOString();
    case "weekday": return faker.date.weekday();
    case "month": return faker.date.month();
    case "color": return faker.color.rgb();
    case "colorHex": return faker.color.rgb({ format: "hex" });
    case "colorHuman": return faker.color.human();
    // Custom
    case "static": return field.staticValue ?? "";
    case "enum": {
      const vals = (field.enumValues ?? "").split(",").map((s) => s.trim()).filter(Boolean);
      return vals.length ? faker.helpers.arrayElement(vals) : null;
    }
    default: return null;
  }
}


export const toCSV = (data: Record<string, Record<string, unknown>[]>): Record<string, string> => {

  const cvsData: Record<string, string> = {};

  for (const key in data) {
    if (!Object.hasOwn(data, key)) continue;
    const rows = data[key];
    const keys = Object.keys(rows[0]);
    const esc = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === "object" ? JSON.stringify(v) : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;

    }
    cvsData[key] = [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n')
  }

  return cvsData;

}

export const toSQL = (data: Record<string, Record<string, unknown>[]>): Record<string, string> => {
  // if (!tables.length) return `-- : no rows\n`
  const sqlData: Record<string, string> = {}

  for (const key in data) {
    if (!Object.hasOwn(data, key)) continue;
    const rows = data[key]
    const keys = Object.keys(rows[0]);

    const esc = (v: unknown) => {
      if (v === null || v === undefined) return "NULL";
      if (typeof v === "number") return String(v);
      if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
      return `'${String(v).replace(/'/g, "''")}'`;
    }
    sqlData[key] = rows.map((r) => `INSERT INTO ${key} (${keys.join(', ')}) VALUES (${keys.map((k) => esc(r[k])).join(', ')});`).join('\n')
  }

  return sqlData;
}

export const toJSON = (data: Record<string, Record<string, unknown>[]>): Record<string, string> => {
  const jsonData: Record<string, string> = {}
  for (const key in data) {
    if (!Object.hasOwn(data, key)) continue;
    const rows = data[key];
    jsonData[key] = JSON.stringify(rows, null, 2)

  }
  return jsonData;

}

// const keys = Object.keys(rows[0]);
// const esc = (v: unknown) => {
//     if (v === null || v === undefined) return "NULL";
//     if (typeof v === "number") return String(v);
//     if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
//     return `'${String(v).replace(/'/g, "''")}'`;
// };
// return rows.map((r) => `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys.map((k) => esc(r[k])).join(', ')});`).join('\n')