/* eslint-disable no-irregular-whitespace */
import Color from "color";

// List of keys that represent color-related configurations in the theme.
// These keys are used to identify which values should be transformed into RGB format.
const COLOR_CONFIG_KEYS = [
  "accentColor",
  "backgroundColor",
  "borderColor",
  "caretColor",
  "colors",
  "divideColor",
  "fill",
  "gradientColorStops",
  "placeholderColor",
  "ringColor",
  "ringOffsetColor",
  "stroke",
  "textColor",
];

/**
 * Converts a string to kebab-case.
 * Example: "backgroundColor" => "background-color"
 * @param {string} string - The string to convert.
 * @returns {string} - The kebab-case formatted string.
 */
function toKebabCase(string) {
  return string
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
}

/**
 * Generates a Tailwind CSS-compatible key name from an array of keys.
 * Example: ['colors', 'primary', '500'] => "colors-primary-500"
 * @param {string[]} keys - An array of keys representing the nested path.
 * @returns {string} - The generated Tailwind key name.
 */
const generateTailwindKeyName = (keys) => {
  return keys
    .filter((key) => key.toLowerCase() !== "default") // Exclude 'default' keys
    .map(toKebabCase) // Convert each key to kebab-case
    .join("-"); // Join keys with hyphens
};

/**
 * Converts a color value (hex, RGB, etc.) to its RGBA equivalent.
 * @param {string} color - The color value to convert.
 * @returns {number[] | null} - An array of [r, g, b] values or null if conversion fails.
 */
function convertToRgba(color) {
  try {
    const [r, g, b] = Color(color).rgb().array(); // Convert color to RGB array
    return [r, g, b];
  } catch {
    return null; // Return null if the color is invalid or conversion fails
  }
}

/**
 * Default transformer for custom property values.
 * Converts color values to RGB strings and handles arrays.
 * @param {string[]} keys - The path to the value (e.g., ['colors', 'primary', '500']).
 * @param {any} value - The value to transform.
 * @returns {string} - The transformed value.
 */
function defaultCustomPropValueTransformer(keys, value) {
  // If the key is a color-related key, convert the value to RGB format
  if (COLOR_CONFIG_KEYS.includes(keys[0])) {
    const rgbaColor = convertToRgba(value);
    if (rgbaColor) {
      const [r, g, b] = rgbaColor;
      return `${r} ${g} ${b}`; // Return RGB values as a space-separated string
    }
  }

  // If the value is an array, join its elements with commas
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  // Otherwise, return the value as is
  return value;
}

/**
 * Flattens a nested object into a single-level object with custom keys and values.
 * @param {object} obj - The object to flatten.
 * @param {function} transformKeyCallback - Function to transform the key path.
 * @param {function} transformValueCallback - Function to transform the value.
 * @param {string[]} previousKeys - The accumulated keys from previous recursion levels.
 * @param {object} flattened - The accumulated flattened object.
 * @returns {object} - The flattened object.
 */
function flattenObject(
  obj,
  transformKeyCallback = (key) => key.join("."),
  transformValueCallback = (keys, value) => value,
  previousKeys = [],
  flattened = {},
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const keyPath = [...previousKeys, key]; // Build the current key path

    // If the value is an object (and not an array), recursively flatten it
    if (typeof value === "object" && !Array.isArray(value)) {
      flattenObject(
        value,
        transformKeyCallback,
        transformValueCallback,
        keyPath,
        acc,
      );
    } else {
      // Transform the key and value, then add them to the flattened object
      acc[transformKeyCallback(keyPath)] = transformValueCallback(
        keyPath,
        value,
      );
    }

    return acc;
  }, flattened);
}

/**
 * Converts a theme object into CSS custom properties.
 * @param {object} themeValues - The theme object to convert.
 * @param {function} transformer - The value transformer function.
 * @returns {object} - An object containing CSS custom properties.
 */
export function getThemeAsCustomProps(
  themeValues,
  transformer = defaultCustomPropValueTransformer,
) {
  return flattenObject(
    themeValues,
    (keys) => `--${generateTailwindKeyName(keys)}`, // Transform keys into CSS custom property format
    transformer,
  );
}

/**
 * Helper function to generate Tailwind CSS variables for colors.
 * @param {string} name - The name of the color variable.
 * @returns {function} - A function that generates the RGB value with optional opacity.
 */
function tailwindVariableHelper(name) {
  return function ({ opacityVariable, opacityValue } = {}) {
    if (opacityValue !== undefined) {
      return `rgb(var(--${name}) / ${opacityValue})`; // Apply opacity value
    }
    if (opacityVariable !== undefined) {
      return `rgb(var(--${name}) / var(${opacityVariable}, 1))`; // Apply opacity variable
    }
    return `rgb(var(--${name}))`; // Default RGB value
  };
}

/**
 * Default transformer for theme configuration values.
 * Converts color values into Tailwind CSS variables.
 * @param {string[]} keys - The path to the value.
 * @param {any} value - The value to transform.
 * @returns {string} - The transformed value.
 */
function defaultConfigValueTransformer(keys, value) {
  // If the key is a color-related key, convert the value to a Tailwind CSS variable
  if (COLOR_CONFIG_KEYS.includes(keys[0])) {
    if (convertToRgba(value)) {
      return tailwindVariableHelper(generateTailwindKeyName(keys));
    }
  }

  // Otherwise, return the value as a CSS variable with a fallback
  return `var(--${generateTailwindKeyName(keys)}, ${value})`;
}

/**
 * Resolves a nested theme configuration object into a format compatible with Tailwind CSS.
 * @param {object} themeConfig - The theme configuration object.
 * @param {string[]} previousKeys - The accumulated keys from previous recursion levels.
 * @param {function} valueTransformer - The value transformer function.
 * @returns {object} - The resolved theme configuration.
 */
export function resolveThemeConfig(
  themeConfig,
  previousKeys = [],
  valueTransformer = defaultConfigValueTransformer,
) {
  return Object.entries(themeConfig).reduce((acc, [key, value]) => {
    const keyPath = [...previousKeys, key]; // Build the current key path

    // If the value is an object, recursively resolve it
    if (typeof value === "object") {
      return {
        ...acc,
        [key]: resolveThemeConfig(value, keyPath, valueTransformer),
      };
    }

    // Otherwise, transform the value and add it to the result
    return {
      ...acc,
      [key]: valueTransformer(keyPath, value),
    };
  }, {});
}

// /* eslint-disable no-irregular-whitespace */
// import Color from "color";

// const colorConfigKeys = [
//   "accentColor",
//   "backgroundColor",
//   "borderColor",
//   "caretColor",
//   "colors",
//   "divideColor",
//   "fill",
//   "gradientColorStops",
//   "placeholderColor",
//   "ringColor",
//   "ringOffsetColor",
//   "stroke",
//   "textColor",
// ];

// function kebabCase(string) {
//   //[ 'colors', 'primary', '500' ] => //colors, primary, 500
//   return string
//     .replace(/([a-z])([A-Z])/g, "$1-$2")
//     .replace(/\s+/g, "-")
//     .toLowerCase();
// }

// const getTailwindKeyName = (keys) => {
//   // [ 'colors', 'primary', '100' ] => colors-primary-100
//   return keys
//     .filter((key) => key.toLowerCase() !== "default")
//     .map(kebabCase)
//     .join("-");
// };

// function toRgba(color) {
//   try {
//     const [r, g, b] = Color(color).rgb().array();
//     return [r, g, b];
//   } catch {
//     return null;
//   }
// }

// function defaultCustomPropValueTransformer(keys, value) {
//   //[ 'colors', 'primary', '500' ] #f43f5e => 244 63 94

//   if (colorConfigKeys.includes(keys[0])) {
//     const color = toRgba(value);
//     if (color) {
//       const [r, g, b] = color;
//       return `${r} ${g} ${b}`;
//     }
//   }

//   if (Array.isArray(value)) {
//     return value.join(", ");
//   }

//   return value;
// }

// function flatten(
//   obj,
//   transformKeyCallback = (key) => key.join("."),
//   transformValueCallback = (keys, value) => value,
//   previousKeys = [],
//   flattened = {},
// ) {
//   return Object.entries(obj).reduce((acc, [key, value]) => {
//     //500 #f43f5e

//     const keyPath = [...previousKeys, key]; // [ 'colors', 'primary', '500' ]

//     if (typeof value === "object" && !Array.isArray(value)) {
//       flatten(
//         value,
//         transformKeyCallback,
//         transformValueCallback,
//         keyPath,
//         acc,
//       );
//     } else {
//       // keyPath = 950
//       // transformKeyCallback(keyPath) => --colors-primary-500
//       // value  = #4c0519
//       // transformValueCallback(keyPath, value) =>  244 63 94
//       // flattened == {'--colors-primary-500': '244 63 94'}

//       flattened[transformKeyCallback(keyPath)] = transformValueCallback(
//         keyPath,
//         value,
//       );
//     }
//     return acc;
//   }, flattened);
// }

// export function getThemeAsCustomProps(
//   tokenValues,
//   transformer = defaultCustomPropValueTransformer,
// ) {
//   //{ primary: {'500': '#f43f5e'} } => to --color-theme

//   return flatten(
//     //--colors-primary-500
//     tokenValues,
//     (keys) => `--${getTailwindKeyName(keys)}`,
//     transformer,
//   );
// }

// function tailwindVariableHelper(name) {
//   // name = colors-primary-900 => rgb(var(--colors-primary-500))
//   return function ({ opacityVariable, opacityValue } = {}) {
//     if (opacityValue !== undefined) {
//       return `rgb(var(--${name}) / ${opacityValue})`;
//     }
//     if (opacityVariable !== undefined) {
//       return `rgb(var(--${name}) / var(${opacityVariable}, 1))`;
//     }
//     return `rgb(var(--${name}))`;
//   };
// }

// function defaultConfigValueTransformer(keys, value) {
//   // keys, value = [ 'colors', 'dark', '50' ] #E7E9EF

//   if (colorConfigKeys.includes(keys[0])) {
//     if (toRgba(value)) {
//       return tailwindVariableHelper(getTailwindKeyName(keys));
//     }
//   }

//   return `var(--${getTailwindKeyName(keys)}, ${value})`;
// }

// export function resolveThemeConfig(
//   tokenValue,
//   previousKeys = [],
//   valueTransformer = defaultConfigValueTransformer,
// ) {
//   // tokenValue = { '500': '#384766' }
//   return Object.entries(tokenValue).reduce((acc, [key, value]) => {
//     const keyPath = [...previousKeys, key];
//     return {
//       ...acc,
//       [key]:
//         typeof value === "object"
//           ? resolveThemeConfig(value, keyPath)
//           : valueTransformer(keyPath, value),
//     };
//   }, {});
// }
