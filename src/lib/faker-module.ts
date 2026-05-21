import { faker } from '@faker-js/faker';

// Type representing a single field configuration
export interface UIField {
  label: string;
  type: string; // e.g., 'uuid', 'fullName'
}

// Type representing a grouped category in the UI
export interface FakerUiGroup {
    label: string;
    items: UIField[];
}

// Strictly extract valid module names from the Faker instance
export type ValidFakerModule = keyof typeof faker;

/**
 * Programmatically builds a typed UI schema directly from Faker.js metadata
 */
export function fackerModules(): FakerUiGroup[] {
    // Modules to exclude from user-facing UI configurations
    const excludedModules: string[] = [
        'definitions', 'locales', 'locale', 'localeFallback',
        'rawDefinitions', 'helpers', 'science', 'faker', '_randomizer'
    ];

    // Get keys, asserting them as valid module types
    const modules = Object.keys(faker) as ValidFakerModule[];

    return modules
        .filter((key) => !excludedModules.includes(key) && typeof faker[key] === 'object' && faker[key] !== null)
        .map((moduleName) => {
            const moduleInstance = faker[moduleName];
            const prototype = Object.getPrototypeOf(moduleInstance);

            // Capitalize the module name for the Group Label (e.g., "internet" -> "Internet")
            const groupLabel = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

            // Extract callable generation methods
            const items = Object.getOwnPropertyNames(prototype)
                .filter((methodName) => {
                    return (
                        methodName !== 'constructor' &&
                        !methodName.startsWith('_') &&
                        // @ts-ignore - safe index access on dynamic prototypes
                        typeof moduleInstance[methodName] === 'function'
                    );
                })
                .map((methodName): UIField => {
                    // Convert camelCase method names into clean human-readable UI labels
                    // e.g., "creditCardNumber" -> "Credit Card Number"
                    const humanLabel = methodName
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase());

                    return {

                        type: methodName,
                        label: humanLabel,
                    };
                });

            return {
                label: groupLabel,
                items: items
            };
        })
        .filter((group) => group.items.length > 0);
}