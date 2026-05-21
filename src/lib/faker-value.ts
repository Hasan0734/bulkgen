import { faker } from '@faker-js/faker';
import type { ValidFakerModule } from './faker-module';
type FakerModules = keyof typeof faker;

interface TypeMetadata {
  module: FakerModules;
  label: string;
}

export function getFakerValue(methodName: string, moduleName: ValidFakerModule): string {
    try {
        const targetModule = faker[moduleName];

        if (targetModule && methodName in targetModule) {
            // @ts-ignore - dynamic execution of a mapped key signature
            const result = targetModule[methodName]();

            if (result instanceof Date) {
                return result.toISOString();
            }

            if (typeof result === 'object' && result !== null) {
                return JSON.stringify(result);
            }

            return String(result);
        }

        return "Unknown Method";
    } catch (error) {
        // Methods requiring mandatory parameters will caught here safely
        return "(Configuration Required)";
    }
}

const typeMetadataMap: Record<string, TypeMetadata> = {};
const methodToModuleMap: Record<string, FakerModules> = {};
const excludedKeys = ['definitions', 'locales', 'locale', 'localeFallback', 'rawDefinitions', 'helpers', 'science', 'faker', '_randomizer'];

// Build the lookup map dynamically at application initialization
(function initializeFakerLookup() {
  const moduleKeys = Object.keys(faker) as FakerModules[];

  moduleKeys.forEach((moduleName) => {
    if (excludedKeys.includes(moduleName)) return;

    const moduleInstance = faker[moduleName];
    if (moduleInstance && typeof moduleInstance === 'object') {
      const prototype = Object.getPrototypeOf(moduleInstance);
      
      Object.getOwnPropertyNames(prototype).forEach((methodName) => {
        if (methodName !== 'constructor' && !methodName.startsWith('_')) {
          // Map the flat type key directly to its structural owner
          methodToModuleMap[methodName] = moduleName;
        }
      });
    }
  });
})();

export function getLabelByType(type: string): string {
  if (typeMetadataMap[type]) {
    return typeMetadataMap[type].label;
  }
  
  // Basic fallback parsing if string match is absent
  return type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export function getFakerValueByType(type: string): string {
    try {
       if(type === "relation") {
        
       }
        
        const mappedModule = methodToModuleMap[type];

        if (mappedModule) {
            const targetModule = faker[mappedModule];

            // Safety check to ensure the property is accessible as a callable execution method
            if (targetModule && type in targetModule) {
                // @ts-ignore - dynamic key prototype access
                const result = targetModule[type]();

                if (result instanceof Date) return result.toISOString();
                if (typeof result === 'object' && result !== null) return JSON.stringify(result);

                return String(result);
            }
        }

        // Explicit structural fallbacks for specific custom UI naming conventions if needed
        if (type === 'phone') return faker.phone.number();

        return `[Unknown type: ${type}]`;
    } catch (error) {
        // Catch methods that inherently throw structural validation runtime bugs when called without options params
        return `(Requires Params)`;
    }
}