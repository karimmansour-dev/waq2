/* eslint-disable no-unused-vars */
// Import Dependencies

import { useThemeContext } from "app/contexts/theme/context";
import styled from "styled-components";

// Constants
const shape = {
  borderRadius: 6,
  customBorderRadius: {
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
  },
};

const typography = {
  fontFamily: [
    '"Public Sans"',
    "sans-serif",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  fontSize: 13.125,
  h1: {
    fontSize: "2.875rem",
    fontWeight: 500,
    lineHeight: 1.47826,
  },
  h2: {
    fontSize: "2.375rem",
    fontWeight: 500,
    lineHeight: 1.47368421,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: 1.58334,
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.5556,
  },
  h6: {
    fontSize: "0.9375rem",
    fontWeight: 500,
    lineHeight: 1.46667,
  },
  subtitle1: {
    fontSize: "0.9375rem",
    lineHeight: 1.46667,
  },
  subtitle2: {
    fontSize: "0.8125rem",
    fontWeight: 400,
    lineHeight: 1.53846154,
  },
  body1: {
    fontSize: "0.9375rem",
    lineHeight: 1.46667,
  },
  body2: {
    fontSize: "0.8125rem",
    lineHeight: 1.53846154,
  },
  button: {
    fontSize: "0.9375rem",
    lineHeight: 1.46667,
    textTransform: "none",
  },
  caption: {
    fontSize: "0.8125rem",
    lineHeight: 1.38462,
    letterSpacing: "0.4px",
  },
  overline: {
    fontSize: "0.75rem",
    lineHeight: 1.16667,
    letterSpacing: "0.8px",
  },
};

// Color Schemes
const colorSchemes = {
  light: {
    palette: {
      primary: {
        main: "#7367F0",
        light: "#8F85F3",
        dark: "#675DD8",
        lightOpacity: "rgba(115, 103, 240, 0.16)", // Assuming --mui-palette-primary-mainChannel is #7367F0
        mainOpacity: "rgba(115, 103, 240, 0.24)", // Assuming --mui-palette-primary-mainChannel is #7367F0
      },
      secondary: {
        main: "#808390",
        light: "#999CA6",
        dark: "#737682",
        contrastText: "#FFF",
        lightOpacity: "rgba(128, 131, 144, 0.16)", // Assuming --mui-palette-secondary-mainChannel is #808390
        mainOpacity: "rgba(128, 131, 144, 0.24)", // Assuming --mui-palette-secondary-mainChannel is #808390
      },
      error: {
        main: "#FF4C51",
        light: "#FF7074",
        dark: "#E64449",
        contrastText: "#FFF",
        lightOpacity: "rgba(255, 76, 81, 0.16)", // Assuming --mui-palette-error-mainChannel is #FF4C51
        mainOpacity: "rgba(255, 76, 81, 0.24)", // Assuming --mui-palette-error-mainChannel is #FF4C51
      },
      warning: {
        main: "#FF9F43",
        light: "#FFB269",
        dark: "#E68F3C",
        contrastText: "#FFF",
        lightOpacity: "rgba(255, 159, 67, 0.16)", // Assuming --mui-palette-warning-mainChannel is #FF9F43
        mainOpacity: "rgba(255, 159, 67, 0.24)", // Assuming --mui-palette-warning-mainChannel is #FF9F43
      },
      info: {
        main: "#00BAD1",
        light: "#33C8DA",
        dark: "#00A7BC",
        contrastText: "#FFF",
        lightOpacity: "rgba(0, 186, 209, 0.16)", // Assuming --mui-palette-info-mainChannel is #00BAD1
        mainOpacity: "rgba(0, 186, 209, 0.24)", // Assuming --mui-palette-info-mainChannel is #00BAD1
      },
      success: {
        main: "#28C76F",
        light: "#53D28C",
        dark: "#24B364",
        contrastText: "#FFF",
        lighterOpacity: "rgba(40, 199, 111, 0.08)", // Assuming --mui-palette-success-mainChannel is #28C76F
        lightOpacity: "rgba(40, 199, 111, 0.16)", // Assuming --mui-palette-success-mainChannel is #28C76F
        mainOpacity: "rgba(40, 199, 111, 0.24)", // Assuming --mui-palette-success-mainChannel is #28C76F
        darkOpacity: "rgba(40, 199, 111, 0.32)", // Assuming --mui-palette-success-mainChannel is #28C76F
        darkerOpacity: "rgba(40, 199, 111, 0.38)", // Assuming --mui-palette-success-mainChannel is #28C76F
      },
      text: {
        primary: "rgba(0, 0, 0, 0.9)", // Assuming --mui-mainColorChannels-light is #000000
        secondary: "rgba(0, 0, 0, 0.7)", // Assuming --mui-mainColorChannels-light is #000000
        disabled: "rgba(0, 0, 0, 0.4)", // Assuming --mui-mainColorChannels-light is #000000
        primaryChannel: "0 0 0", // Assuming --mui-mainColorChannels-light is #000000
        secondaryChannel: "0 0 0", // Assuming --mui-mainColorChannels-light is #000000
      },
      divider: "rgba(0, 0, 0, 0.12)", // Assuming --mui-mainColorChannels-light is #000000
      dividerChannel: "0 0 0", // Assuming --mui-mainColorChannels-light is #000000
      background: {
        default: "#F8F7FA",
        paper: "#FFFFFF",
        paperChannel: "255 255 255",
      },
      action: {
        active: "rgba(0, 0, 0, 0.6)", // Assuming --mui-mainColorChannels-light is #000000
        hover: "rgba(0, 0, 0, 0.06)", // Assuming --mui-mainColorChannels-light is #000000
        selected: "rgba(0, 0, 0, 0.08)", // Assuming --mui-mainColorChannels-light is #000000
        disabled: "rgba(0, 0, 0, 0.3)", // Assuming --mui-mainColorChannels-light is #000000
        disabledBackground: "rgba(0, 0, 0, 0.16)", // Assuming --mui-mainColorChannels-light is #000000
        focus: "rgba(0, 0, 0, 0.1)", // Assuming --mui-mainColorChannels-light is #000000
        focusOpacity: 0.1,
        activeChannel: "0 0 0", // Assuming --mui-mainColorChannels-light is #000000
        selectedChannel: "0 0 0", // Assuming --mui-mainColorChannels-light is #000000
      },
    },
  },
};

// Styled Components
const AppFullCalendar = styled("div")(() => {
  const {
    primaryColorScheme: primary,
    lightColorScheme: light,
    darkColorScheme: dark,
    isDark,
  } = useThemeContext();
  return {
    display: "flex",
    position: "relative",
    width: "100%", //
    borderRadius: `${shape.borderRadius}px`,
    "& .fc": {
      zIndex: 1,
      width: "100%", //
      ".fc-col-header, .fc-daygrid-body, .fc-scrollgrid-sync-table, .fc-timegrid-body, .fc-timegrid-body table":
        {
          width: "100% !important",
        },

      // Toolbar
      "& .fc-toolbar": {
        flexWrap: "wrap",
        flexDirection: "row !important",
        "&.fc-header-toolbar": {
          gap: "0.5rem",
          marginBottom: "1.5rem",
        },
        "& .fc-button-group:has(.fc-next-button)": {
          marginInlineStart: "0.5rem",
        },
        "& .fc-button": {
          padding: "0.25rem",
          "&:active, .&:focus": {
            boxShadow: "none",
          },
        },
        ".fc-prev-button, & .fc-next-button": {
          display: "flex",
          backgroundColor: "transparent",
          padding: "0.375rem",
          border: "0px",
          "& .fc-icon": {
            color: primary[500],
            fontSize: "1.25rem",
          },
          "&:hover, &:active, &:focus": {
            boxShadow: "none !important",
            backgroundColor: "transparent !important",
          },
        },
        "& .fc-toolbar-chunk:first-of-type": {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          rowGap: "0.5rem",
          "@media (max-width: 768px)": {
            "& div:first-of-type": {
              display: "flex",
              alignItems: "center",
            },
          },
        },
        "& .fc-button-group": {
          "& .fc-button": {
            textTransform: "capitalize",
            "&:focus": {
              boxShadow: "none",
            },
          },
          "& .fc-button-primary": {
            "&:not(.fc-prev-button):not(.fc-next-button)": {
              ...typography.button,
              textTransform: "capitalize",
              backgroundColor: primary[100],
              padding: "0.4375rem 1rem",
              color: primary[500],
              borderColor: "transparent",
              "&.fc-button-active, &:hover": {
                color: primary[600],
                backgroundColor: primary[200],
              },
            },
          },
          "& .fc-sidebarToggle-button": {
            border: "0 !important",
            lineHeight: 0.8,
            paddingBottom: "0 !important",
            backgroundColor: "transparent !important",
            marginInlineEnd: "0.5rem",
            color: primary[100],
            marginLeft: "-0.5rem !important",
            padding: "0.3125rem 0.5rem !important",
            "&:focus": {
              outline: 0,
              boxShadow: "none",
            },
            "&:not(.fc-prev-button):not(.fc-next-button):hover": {
              backgroundColor: "transparent !important",
            },
            "& + div": {
              marginLeft: 0,
            },
          },
          ".fc-dayGridMonth-button, .fc-timeGridWeek-button, .fc-timeGridDay-button, & .fc-listMonth-button":
            {
              padding: "0.55rem 1.5rem",
              "&:last-of-type, &:first-of-type": {
                borderRadius: `${shape.borderRadius}px`,
              },
              "&:first-of-type": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              "&:last-of-type": {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            },
        },
        "& > * > :not(:first-of-type)": {
          marginLeft: 0,
        },
        "& .fc-toolbar-title": {
          marginInline: "1rem",
          color: primary[700],
          ...typography.h4,
        },
        ".fc-button:empty:not(.fc-sidebarToggle-button), & .fc-toolbar-chunk:empty":
          {
            display: "none",
          },
      },

      // Calendar head & body common
      "& tbody td, & thead th": {
        borderColor: primary[300],
        "&.fc-col-header-cell": {
          borderLeft: 0,
          borderRight: 0,
        },
        '&[role="presentation"]': {
          borderInline: 0,
        },
      },
      "& colgroup col": {
        width: "60px !important",
      },

      // Event Colors
      // "& .fc-event": {
      //   "& .fc-event-title-container, .fc-event-main-frame": {
      //     lineHeight: 1,
      //   },
      //   "&:not(.fc-list-event)": {
      //     "&.event-bg-primary": {
      //       border: 0,
      //       color: colorSchemes.light.palette.primary.main,
      //       backgroundColor: colorSchemes.light.palette.primary.lightOpacity,
      //       "& .fc-event-title, & .fc-event-time": {
      //         fontSize: typography.caption.fontSize,
      //         fontWeight: 500,
      //         color: colorSchemes.light.palette.primary.main,
      //         padding: 0,
      //       },
      //     },
      //     "&.event-bg-success": {
      //       border: 0,
      //       color: colorSchemes.light.palette.success.main,
      //       backgroundColor: colorSchemes.light.palette.success.lightOpacity,
      //       "& .fc-event-title, & .fc-event-time": {
      //         fontSize: typography.caption.fontSize,
      //         fontWeight: 500,
      //         color: colorSchemes.light.palette.success.main,
      //         padding: 0,
      //       },
      //     },
      //     "&.event-bg-error": {
      //       border: 0,
      //       color: colorSchemes.light.palette.error.main,
      //       backgroundColor: colorSchemes.light.palette.error.lightOpacity,
      //       "& .fc-event-title, & .fc-event-time": {
      //         fontSize: typography.caption.fontSize,
      //         fontWeight: 500,
      //         color: colorSchemes.light.palette.error.main,
      //         padding: 0,
      //       },
      //     },
      //     "&.event-bg-warning": {
      //       border: 0,
      //       color: colorSchemes.light.palette.warning.main,
      //       backgroundColor: colorSchemes.light.palette.warning.lightOpacity,
      //       "& .fc-event-title, & .fc-event-time": {
      //         fontSize: typography.caption.fontSize,
      //         fontWeight: 500,
      //         color: colorSchemes.light.palette.warning.main,
      //         padding: 0,
      //       },
      //     },
      //     "&.event-bg-info": {
      //       border: 0,
      //       color: colorSchemes.light.palette.info.main,
      //       backgroundColor: colorSchemes.light.palette.info.lightOpacity,
      //       "& .fc-event-title, & .fc-event-time": {
      //         fontSize: typography.caption.fontSize,
      //         fontWeight: 500,
      //         color: colorSchemes.light.palette.info.main,
      //         padding: 0,
      //       },
      //     },
      //   },
      //   "&.event-bg-primary": {
      //     "& .fc-list-event-dot": {
      //       borderColor: colorSchemes.light.palette.primary.main,
      //       backgroundColor: colorSchemes.light.palette.primary.main,
      //     },
      //     "&:hover td": {
      //       backgroundColor: colorSchemes.light.palette.primary.lightOpacity,
      //     },
      //   },
      //   "&.event-bg-success": {
      //     "& .fc-list-event-dot": {
      //       borderColor: colorSchemes.light.palette.success.main,
      //       backgroundColor: colorSchemes.light.palette.success.main,
      //     },
      //     "&:hover td": {
      //       backgroundColor: colorSchemes.light.palette.success.lightOpacity,
      //     },
      //   },
      //   "&.event-bg-error": {
      //     "& .fc-list-event-dot": {
      //       borderColor: colorSchemes.light.palette.error.main,
      //       backgroundColor: colorSchemes.light.palette.error.main,
      //     },
      //     "&:hover td": {
      //       backgroundColor: colorSchemes.light.palette.error.lightOpacity,
      //     },
      //   },
      //   "&.event-bg-warning": {
      //     "& .fc-list-event-dot": {
      //       borderColor: colorSchemes.light.palette.warning.main,
      //       backgroundColor: colorSchemes.light.palette.warning.main,
      //     },
      //     "&:hover td": {
      //       backgroundColor: colorSchemes.light.palette.warning.lightOpacity,
      //     },
      //   },
      //   "&.event-bg-info": {
      //     "& .fc-list-event-dot": {
      //       borderColor: colorSchemes.light.palette.info.main,
      //       backgroundColor: colorSchemes.light.palette.info.main,
      //     },
      //     "&:hover td": {
      //       backgroundColor: colorSchemes.light.palette.info.lightOpacity,
      //     },
      //   },
      //   "&.fc-daygrid-event": {
      //     margin: 0,
      //     borderRadius: "500px",
      //   },
      // },
      // "& .fc-view-harness": {
      //   minHeight: "650px",
      //   margin: "0 -1.5rem", //edit
      // },

      // Calendar Head
      "& .fc-col-header": {
        "& .fc-col-header-cell-cushion": {
          ...typography.body1,
          fontWeight: 500,
          color: primary[500],
          padding: "0.5rem",
          textDecoration: "none !important",
        },
      },

      // Daygrid
      "& .fc-scrollgrid-section-liquid > td": {
        borderBottom: 0,
      },
      "& .fc-daygrid-event-harness": {
        "& .fc-event": {
          padding: "0.25rem 0.75rem",
          borderRadius: 4,
        },
        "&:not(:last-of-type) .fc-event": {
          marginBottom: "0.625rem !important",
        },
      },
      "& .fc-daygrid-day-bottom": {
        marginTop: "0.625rem",
      },
      "& .fc-daygrid-day": {
        padding: "8px",
        "& .fc-daygrid-day-top": {
          flexDirection: "row",
        },
      },
      "& .fc-scrollgrid": {
        borderColor: primary[500],
        borderInline: 0,
      },
      "& .fc-daygrid-day-events": {
        marginTop: "0.625rem",
        minHeight: "5rem !important",
      },
      "& .fc-day-other .fc-daygrid-day-top": {
        opacity: 1,
        "& .fc-daygrid-day-number": {
          color: `${primary[300]} !important`,
        },
      },

      // All Views Event
      "& .fc-daygrid-day-number, & .fc-timegrid-slot-label-cushion, & .fc-list-event-time":
        {
          textDecoration: "none !important",
        },
      "& .fc-daygrid-day-number": {
        color: `${primary[900]} !important`,
        padding: 0,
      },
      "& .fc-timegrid-slot-label-cushion, & .fc-list-event-time": {
        color: `${primary[700]} !important`,
      },
      "& .fc-day-today:not(.fc-popover)": {
        backgroundColor: primary[200],
      },

      // WeekView
      "& .fc-timegrid": {
        "& .fc-scrollgrid-section": {
          "& .fc-col-header-cell, & .fc-timegrid-axis": {
            borderLeft: 0,
            borderRight: 0,
            background: "transparent",
            borderColor: primary[500],
          },
          "& .fc-timegrid-axis": {
            borderColor: primary[600],
          },
          "& .fc-timegrid-axis-frame": {
            justifyContent: "center",
            padding: "0.5rem",
            alignItems: "flex-start",
          },
          "&:has(.fc-timegrid-divider)": {
            height: 0,
          },
        },
        "& .fc-timegrid-axis": {
          "&.fc-scrollgrid-shrink": {
            "& .fc-timegrid-axis-cushion": {
              ...typography.body2,
              padding: 0,
              textTransform: "capitalize",
              color: primary[900],
            },
          },
        },
        "& .fc-timegrid-slots": {
          "& .fc-timegrid-slot": {
            height: "3rem",
            borderColor: primary[400],
            "&.fc-timegrid-slot-label": {
              borderRight: 0,
              padding: "0.5rem",
              verticalAlign: "top",
            },
            "&.fc-timegrid-slot-lane": {
              borderLeft: 0,
            },
            "& .fc-timegrid-slot-label-frame": {
              textAlign: "center",
              "& .fc-timegrid-slot-label-cushion": {
                display: "block",
                padding: 0,
                ...typography.body2,
                textTransform: "uppercase",
              },
            },
          },
        },
        "& .fc-timegrid-divider": {
          display: "none",
        },
        "& .fc-timegrid-event": {
          "& .fc-event-time": {
            ...typography.caption,
            marginBlockEnd: 2,
          },
          "& .fc-event-title": {
            lineHeight: 1.5385,
          },
          boxShadow: "none",
        },
        ".fc-timegrid-col-events": {
          margin: 0,
          "& .fc-event-main": {
            padding: "0.5rem",
          },
        },
      },
      "& .fc-timeGridWeek-view .fc-timegrid-slot-minor": {
        borderBlockStart: 0,
      },

      // List View
      "& .fc-list": {
        border: "none",
        '& th[colspan="3"]': {
          position: "relative",
        },
        "& .fc-list-day-cushion": {
          background: "transparent",
          padding: "0.5rem 1rem",
        },
        ".fc-list-event": {
          cursor: "pointer",
          "&:hover": {
            "& td": {
              // backgroundColor: `rgba(${primary[900]}, 0.04)`,
            },
          },
          "& td": {
            borderColor: primary[400],
          },
        },
        "& .fc-list-event-graphic": {
          padding: "0.5rem",
        },
        "& .fc-list-day": {
          backgroundColor: primary[200],
          "& .fc-list-day-text, & .fc-list-day-side-text": {
            ...typography.body1,
            fontWeight: 500,
            textDecoration: "none",
          },
          "& > *": {
            background: "none",
            borderColor: primary[300],
          },
        },
        "& .fc-list-event-title": {
          ...typography.body1,
          color: `${primary[500]} !important`,
          padding: "0.5rem 1rem 0.5rem 0.5rem",
        },
        "& .fc-list-event-time": {
          ...typography.body1,
          color: `${primary[900]} !important`,
          padding: "0.5rem 1rem",
        },
        ".fc-list-table tbody > tr:first-child th": {
          borderTop: `2px solid ${primary[500]}`,
        },
        ".fc-list-table": {
          borderBottom: `3px solid ${primary[500]}`,
        },
      },

      // Popover
      "& .fc-popover": {
        zIndex: 20,
        '[data-skin="bordered"] &': {
          boxShadow: "none",
        },
        boxShadow: 1,
        borderColor: primary[300], // colorSchemes.light.palette.divider,
        borderRadius: `${shape.borderRadius}px`,
        background: primary[100], // colorSchemes.light.palette.background.paper,
        "& .fc-popover-header": {
          padding: "0.5rem",
          borderStartStartRadius: `${shape.borderRadius}px`,
          borderStartEndRadius: `${shape.borderRadius}px`,
          background: primary[200], //colorSchemes.light.palette.action.hover,
          "& .fc-popover-title, & .fc-popover-close": {
            color: primary[900], // colorSchemes.light.palette.text.primary,
          },
        },
      },

      // Media Queries

      "@media (min-width: 768px)": {
        "& .fc-sidebarToggle-button": {
          display: "none",
        },
        "& .fc-toolbar-title": {
          marginLeft: 0,
        },
      },
    },
  };
});

export default AppFullCalendar;
