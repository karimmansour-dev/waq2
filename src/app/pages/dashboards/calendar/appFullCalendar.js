import styled from "styled-components";

// Styled Components
const AppFullCalendar = styled("div")(() => {
  return {
    display: "flex",
    position: "relative",
    borderRadius: "4px", // Assuming default MUI shape border radius
    "& .fc": {
      zIndex: 1,
      ".fc-col-header, .fc-daygrid-body, .fc-scrollgrid-sync-table, .fc-timegrid-body, .fc-timegrid-body table":
        {
          width: "100% !important",
        },

      // Toolbar
      "& .fc-toolbar": {
        flexWrap: "wrap",
        flexDirection: "row !important",
        "&.fc-header-toolbar": {
          gap: "16px", // theme.spacing(2)
          marginBottom: "48px", // theme.spacing(6)
        },
        "& .fc-button-group:has(.fc-next-button)": {
          marginInlineStart: "16px", // theme.spacing(2)
        },
        "& .fc-button": {
          padding: "8px", // theme.spacing()
          "&:active, .&:focus": {
            boxShadow: "none",
          },
        },
        ".fc-prev-button, & .fc-next-button": {
          display: "flex",
          backgroundColor: "transparent",
          padding: "12px", // theme.spacing(1.5)
          border: "0px",
          "& .fc-icon": {
            color: "#000", // assuming primary text color
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
          rowGap: "16px", // theme.spacing(2)
          "@media (max-width: 960px)": {
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
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // theme.typography.button
              fontWeight: "500",
              textTransform: "capitalize",
              backgroundColor: "rgba(0, 0, 255, 0.1)", // assuming primary light opacity
              padding: "14px 32px", // theme.spacing(1.75, 4)
              color: "#1976d2", // primary main
              borderColor: "transparent",
              "&.fc-button-active, &:hover": {
                color: "#1976d2", // primary main
                backgroundColor: "rgba(25, 118, 210, 0.1)", // primary main opacity
              },
            },
          },
          "& .fc-sidebarToggle-button": {
            border: "0 !important",
            lineHeight: 0.8,
            paddingBottom: "0 !important",
            backgroundColor: "transparent !important",
            marginInlineEnd: "16px", // theme.spacing(2)
            color: "#9e9e9e", // secondary text color
            marginLeft: "-16px !important", // theme.spacing(-2)
            padding: "10px 16px !important", // theme.spacing(1.25, 2)
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
              padding: "17.6px 48px", // theme.spacing(2.2, 6)
              "&:last-of-type, &:first-of-type": {
                borderRadius: "4px", // assuming default border radius
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
          marginInline: "32px", // theme.spacing(4)
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // theme.typography.h4
          fontSize: "1.5rem", // theme.typography.h4.fontSize
        },
        ".fc-button:empty:not(.fc-sidebarToggle-button), & .fc-toolbar-chunk:empty":
          {
            display: "none",
          },
      },

      // Calendar head & body common
      "& tbody td, & thead th": {
        borderColor: "#e0e0e0", // assuming divider color
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
      "& .fc-event": {
        "& .fc-event-title-container, .fc-event-main-frame": {
          lineHeight: 1,
        },
        "&:not(.fc-list-event)": {
          "&.event-bg-primary": {
            border: 0,
            color: "#1976d2", // primary main
            backgroundColor: "rgba(25, 118, 210, 0.1)", // primary light opacity
            "& .fc-event-title, & .fc-event-time": {
              fontSize: "0.75rem", // theme.typography.caption.fontSize
              fontWeight: "500",
              color: "#1976d2", // primary main
              padding: 0,
            },
          },
          "&.event-bg-success": {
            border: 0,
            color: "#388e3c", // success main
            backgroundColor: "rgba(56, 142, 60, 0.1)", // success light opacity
            "& .fc-event-title, & .fc-event-time": {
              fontSize: "0.75rem", // theme.typography.caption.fontSize
              fontWeight: "500",
              color: "#388e3c", // success main
              padding: 0,
            },
          },
          "&.event-bg-error": {
            border: 0,
            color: "#d32f2f", // error main
            backgroundColor: "rgba(211, 47, 47, 0.1)", // error light opacity
            "& .fc-event-title, & .fc-event-time": {
              fontSize: "0.75rem", // theme.typography.caption.fontSize
              fontWeight: "500",
              color: "#d32f2f", // error main
              padding: 0,
            },
          },
          "&.event-bg-warning": {
            border: 0,
            color: "#f57c00", // warning main
            backgroundColor: "rgba(245, 124, 0, 0.1)", // warning light opacity
            "& .fc-event-title, & .fc-event-time": {
              fontSize: "0.75rem", // theme.typography.caption.fontSize
              fontWeight: "500",
              color: "#f57c00", // warning main
              padding: 0,
            },
          },
          "&.event-bg-info": {
            border: 0,
            color: "#0288d1", // info main
            backgroundColor: "rgba(2, 136, 209, 0.1)", // info light opacity
            "& .fc-event-title, & .fc-event-time": {
              fontSize: "0.75rem", // theme.typography.caption.fontSize
              fontWeight: "500",
              color: "#0288d1", // info main
              padding: 0,
            },
          },
        },
        "&.event-bg-primary": {
          "& .fc-list-event-dot": {
            borderColor: "#1976d2", // primary main
            backgroundColor: "#1976d2", // primary main
          },
          "&:hover td": {
            backgroundColor: "rgba(25, 118, 210, 0.1)", // primary light opacity
          },
        },
        "&.event-bg-success": {
          "& .fc-list-event-dot": {
            borderColor: "#388e3c", // success main
            backgroundColor: "#388e3c", // success main
          },
          "&:hover td": {
            backgroundColor: "rgba(56, 142, 60, 0.1)", // success light opacity
          },
        },
        "&.event-bg-error": {
          "& .fc-list-event-dot": {
            borderColor: "#d32f2f", // error main
            backgroundColor: "#d32f2f", // error main
          },
          "&:hover td": {
            backgroundColor: "rgba(211, 47, 47, 0.1)", // error light opacity
          },
        },
        "&.event-bg-warning": {
          "& .fc-list-event-dot": {
            borderColor: "#f57c00", // warning main
            backgroundColor: "#f57c00", // warning main
          },
          "&:hover td": {
            backgroundColor: "rgba(245, 124, 0, 0.1)", // warning light opacity
          },
        },
        "&.event-bg-info": {
          "& .fc-list-event-dot": {
            borderColor: "#0288d1", // info main
            backgroundColor: "#0288d1", // info main
          },
          "&:hover td": {
            backgroundColor: "rgba(2, 136, 209, 0.1)", // info light opacity
          },
        },
        "&.fc-daygrid-event": {
          margin: 0,
          borderRadius: "500px", // Assumed rounded border radius
        },
      },
      "& .fc-view-harness": {
        minHeight: "650px",
        margin: "0 -48px", // theme.spacing(0, -6)
      },

      // Calendar Head
      "& .fc-col-header": {
        "& .fc-col-header-cell-cushion": {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // theme.typography.body1
          fontWeight: "500",
          color: "#000", // primary text color
          padding: "16px", // theme.spacing(2)
          textDecoration: "none !important",
        },
      },

      // Daygrid
      "& .fc-scrollgrid-section-liquid > td": {
        borderBottom: 0,
      },
      "& .fc-daygrid-event-harness": {
        "& .fc-event": {
          padding: "8px 24px", // theme.spacing(1, 3)
          borderRadius: "4px", // assuming border radius
        },
        "&:not(:last-of-type) .fc-event": {
          marginBottom: "20px", // theme.spacing(2.5)
        },
      },
      "& .fc-daygrid-day-bottom": {
        marginTop: "20px", // theme.spacing(2.5)
      },
      "& .fc-daygrid-day": {
        padding: "8px",
        "& .fc-daygrid-day-top": {
          flexDirection: "row",
        },
      },
      "& .fc-scrollgrid": {
        borderColor: "#e0e0e0", // assuming divider color
        borderInline: 0,
      },
      "& .fc-daygrid-day-events": {
        marginTop: "20px", // theme.spacing(2.5)
        minHeight: "5rem !important",
      },
      "& .fc-day-other .fc-daygrid-day-top": {
        opacity: 1,
        "& .fc-daygrid-day-number": {
          color: "#9e9e9e !important", // secondary text color
        },
      },

      // All Views Event
      "& .fc-daygrid-day-number, & .fc-timegrid-slot-label-cushion, & .fc-list-event-time":
        {
          textDecoration: "none !important",
        },
      "& .fc-daygrid-day-number": {
        color: "#757575 !important", // secondary text color
        padding: 0,
      },
      "& .fc-timegrid-slot-label-cushion, & .fc-list-event-time": {
        color: "#000 !important", // primary text color
      },
      "& .fc-day-today:not(.fc-popover)": {
        backgroundColor: "rgba(0, 0, 0, 0.08)", // action hover color
      },

      // WeekView
      "& .fc-timegrid": {
        "& .fc-scrollgrid-section": {
          "& .fc-col-header-cell, & .fc-timegrid-axis": {
            borderLeft: 0,
            borderRight: 0,
            background: "transparent",
            borderColor: "#e0e0e0", // divider color
          },
          "& .fc-timegrid-axis": {
            borderColor: "#e0e0e0", // divider color
          },
          "& .fc-timegrid-axis-frame": {
            justifyContent: "center",
            padding: "16px", // theme.spacing(2)
            alignItems: "flex-start",
          },
          "&:has(.fc-timegrid-divider)": {
            height: 0,
          },
        },
        "& .fc-timegrid-axis": {
          "&.fc-scrollgrid-shrink": {
            "& .fc-timegrid-axis-cushion": {
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // theme.typography.body2
              padding: 0,
              textTransform: "capitalize",
              color: "#9e9e9e", // secondary text color
            },
          },
        },
        "& .fc-timegrid-slots": {
          "& .fc-timegrid-slot": {
            height: "3rem",
            borderColor: "#e0e0e0", // divider color
            borderTopWidth: 0,
            borderLeftWidth: 0,
          },
        },
      },
    },
  };
});

export default AppFullCalendar;
