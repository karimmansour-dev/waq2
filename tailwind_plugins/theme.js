import { colors } from "../src/constants/colors.constant"; // Import color constants
import { themeSwitch } from "./themeSwitcher"; // Import the theme switcher plugin

// Define the theme configuration using the themeSwitch plugin
const theme = themeSwitch({
  themes: [
    // Base theme (required)
    // Every property used in other themes must exist in the base theme.
    {
      name: "base", // Name of the base theme
      selectors: [":root"], // Apply this theme to the root element
      theme: {
        colors: {
          gray: colors.slate, // Default gray color
          dark: colors.navy, // Default dark color
          primary: colors.indigo, // Default primary color
          ...colors.variants, // Include additional color variants
        },
      },
    },

    // Light theme variants
    {
      name: "theme-light:slate", // Light theme with slate gray
      selectors: ["[data-theme-light=slate]"], // Apply when `data-theme-light="slate"` is present
      theme: {
        colors: {
          gray: colors.slate, // Override gray color
        },
      },
    },
    {
      name: "theme-light:gray", // Light theme with gray
      selectors: ["[data-theme-light=gray]"],
      theme: {
        colors: {
          gray: colors.gray, // Override gray color
        },
      },
    },
    {
      name: "theme-light:neutral", // Light theme with neutral gray
      selectors: ["[data-theme-light=neutral]"],
      theme: {
        colors: {
          gray: colors.neutral, // Override gray color
        },
      },
    },

    // Dark theme variants
    {
      name: "theme-dark:navy", // Dark theme with navy
      selectors: ["[data-theme-dark=navy]"],
      theme: {
        colors: {
          dark: colors.navy, // Override dark color
        },
      },
    },
    {
      name: "theme-dark:mirage", // Dark theme with mirage
      selectors: ["[data-theme-dark=mirage]"],
      theme: {
        colors: {
          dark: colors.mirage, // Override dark color
        },
      },
    },
    {
      name: "theme-dark:mint", // Dark theme with mint
      selectors: ["[data-theme-dark=mint]"],
      theme: {
        colors: {
          dark: colors.mint, // Override dark color
        },
      },
    },
    {
      name: "theme-dark:black", // Dark theme with black
      selectors: ["[data-theme-dark=black]"],
      theme: {
        colors: {
          dark: colors.black, // Override dark color
        },
      },
    },
    {
      name: "theme-dark:cinder", // Dark theme with cinder
      selectors: ["[data-theme-dark=cinder]"],
      theme: {
        colors: {
          dark: colors.cinder, // Override dark color
        },
      },
    },

    // Primary color variants
    {
      name: "theme-primary-indigo", // Primary theme with indigo
      selectors: ["[data-theme-primary=indigo]"],
      theme: {
        colors: {
          primary: colors.indigo, // Override primary color
        },
      },
    },
    {
      name: "theme-primary-blue", // Primary theme with blue
      selectors: ["[data-theme-primary=blue]"],
      theme: {
        colors: {
          primary: colors.blue, // Override primary color
        },
      },
    },
    {
      name: "theme-primary-green", // Primary theme with green
      selectors: ["[data-theme-primary=green]"],
      theme: {
        colors: {
          primary: colors.green, // Override primary color
        },
      },
    },
    {
      name: "theme-primary-amber", // Primary theme with amber
      selectors: ["[data-theme-primary=amber]"],
      theme: {
        colors: {
          primary: colors.amber, // Override primary color
        },
      },
    },
    {
      name: "theme-primary-purple", // Primary theme with purple
      selectors: ["[data-theme-primary=purple]"],
      theme: {
        colors: {
          primary: colors.purple, // Override primary color
        },
      },
    },
    {
      name: "theme-primary-rose", // Primary theme with rose
      selectors: ["[data-theme-primary=rose]"],
      theme: {
        colors: {
          primary: colors.rose, // Override primary color
        },
      },
    },
  ],
});

// Export the theme configuration
export { theme };

// import { colors } from '../src/constants/colors.constant'
// import { themeSwitch } from "./themeSwitcher";

// const theme = themeSwitch({
//     themes: [
//         // The only required theme is `base`. Every property used in
//         // other themes must exist in here.
//         {
//             name: "base",
//             selectors: [":root"],
//             theme: {
//                 colors: {
//                     gray: colors.slate,
//                     dark: colors.navy,
//                     primary: colors.indigo,
//                     ...colors.variants,
//                 },
//             },
//         },
//         {
//             name: "theme-light:slate",
//             selectors: ["[data-theme-light=slate]"],
//             theme: {
//                 colors: {
//                     gray: colors.slate,
//                 },
//             },
//         },
//         {
//             name: "theme-light:gray",
//             selectors: ["[data-theme-light=gray]"],
//             theme: {
//                 colors: {
//                     gray: colors.gray,
//                 },
//             },
//         },
//         {
//             name: "theme-light:neutral",
//             selectors: ["[data-theme-light=neutral]"],
//             theme: {
//                 colors: {
//                     gray: colors.neutral,
//                 },
//             },
//         },
//         {
//             name: "theme-dark:navy",
//             selectors: ["[data-theme-dark=navy]"],
//             theme: {
//                 colors: {
//                     dark: colors.navy,
//                 },
//             },
//         },
//         {
//             name: "theme-dark:mirage",
//             selectors: ["[data-theme-dark=mirage]"],
//             theme: {
//                 colors: {
//                     dark: colors.mirage,
//                 },
//             },
//         },
//         {
//             name: "theme-dark:mint",
//             selectors: ["[data-theme-dark=mint]"],
//             theme: {
//                 colors: {
//                     dark: colors.mint,
//                 },
//             },
//         },
//         {
//             name: "theme-dark:black",
//             selectors: ["[data-theme-dark=black]"],
//             theme: {
//                 colors: {
//                     dark: colors.black,
//                 },
//             },
//         },
//         {
//             name: "theme-dark:cinder",
//             selectors: ["[data-theme-dark=cinder]"],
//             theme: {
//                 colors: {
//                     dark: colors.cinder,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-indigo",
//             selectors: ["[data-theme-primary=indigo]"],
//             theme: {
//                 colors: {
//                     primary: colors.indigo,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-blue",
//             selectors: ["[data-theme-primary=blue]"],
//             theme: {
//                 colors: {
//                     primary: colors.blue,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-green",
//             selectors: ["[data-theme-primary=green]"],
//             theme: {
//                 colors: {
//                     primary: colors.green,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-amber",
//             selectors: ["[data-theme-primary=amber]"],
//             theme: {
//                 colors: {
//                     primary: colors.amber,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-purple",
//             selectors: ["[data-theme-primary=purple]"],
//             theme: {
//                 colors: {
//                     primary: colors.purple,
//                 },
//             },
//         },
//         {
//             name: "theme-primary-rose",
//             selectors: ["[data-theme-primary=rose]"],
//             theme: {
//                 colors: {
//                     primary: colors.rose,
//                 },
//             },
//         },
//     ],
// })

// export { theme }
