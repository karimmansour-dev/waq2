import plugin from "tailwindcss/plugin";
import { getThemeAsCustomProps, resolveThemeConfig } from "./utils";

// Default options for the theme switch plugin
const defaultOptions = {
  themes: [], // Array of theme configurations
};

/**
 * Theme switch plugin for Tailwind CSS.
 * This plugin allows dynamic theming by applying different themes based on media queries or selectors.
 * @param {object} options - Plugin options containing theme configurations.
 * @returns {function} - A Tailwind CSS plugin function.
 */
const themeSwitch =
  (options = defaultOptions) =>
  ({ addBase }) => {
    const { themes } = options;

    // Iterate over each theme configuration
    themes.forEach((themeConfig) => {
      const { theme, mediaQuery, selectors = [] } = themeConfig;

      // If selectors are provided, apply the theme to those selectors
      if (selectors.length > 0) {
        addBase({
          [selectors.join(", ")]: getThemeAsCustomProps(theme), // Generate CSS custom properties for the theme
        });
      }

      // If a media query is provided, apply the theme within that media query
      if (mediaQuery) {
        addBase({
          [mediaQuery]: {
            ":root": getThemeAsCustomProps(theme), // Apply the theme to the :root element within the media query
          },
        });
      }
    });
  };

/**
 * Create the theme switch plugin with options.
 * This extends the Tailwind CSS theme configuration with the base theme.
 */
const themeSwitchPlugin = plugin.withOptions(
  themeSwitch,
  (options = defaultOptions) => {
    // Find the base theme from the provided themes
    const baseTheme = options.themes.find((theme) => theme.name === "base");

    return {
      theme: {
        extend:
          baseTheme && baseTheme.theme
            ? resolveThemeConfig(baseTheme.theme) // Resolve the base theme configuration
            : {},
      },
    };
  },
);

// Export the plugin
export { themeSwitchPlugin as themeSwitch };


// import plugin from "tailwindcss/plugin";
// import { getThemeAsCustomProps, resolveThemeConfig } from "./utils";

// const defaultOptions = {
//   themes: [],
// };

// const themeSwitch =
//   (options = defaultOptions) =>
//   ({ addBase }) => {
//     const { themes } = options;

//     themes.forEach((themeConfig) => {
//       const { theme, mediaQuery, selectors = [] } = themeConfig;
//       // getThemeAsCustomProps => { '--colors-primary-500': '244 63 94' }

//       if (selectors.length > 0) {
//         addBase({
//           [selectors.join(", ")]: getThemeAsCustomProps(theme),
//         });
//       }

//       if (mediaQuery) {
//         addBase({
//           [mediaQuery]: {
//             ":root": getThemeAsCustomProps(theme),
//           },
//         });
//       }
//     });
//   };

// const themeSwitchPlugin = plugin.withOptions(
//   themeSwitch,
//   (options = defaultOptions) => {
//     const baseTheme = options.themes.find((theme) => theme.name === "base");

//     return {
//       theme: {
//         extend:
//           baseTheme && baseTheme.theme
//             ? resolveThemeConfig(baseTheme.theme)
//             : {},
//       },
//     };
//   },
// );

// export { themeSwitchPlugin as themeSwitch };
