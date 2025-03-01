/* eslint-disable no-unused-vars */
// React Imports
import { useEffect, useRef, useState } from "react";

// MUI Imports
// import { useTheme } from '@mui/material/styles';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useCalendarStore from "./store";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { defaultTheme } from "configs/theme.config";
import i18n from "i18n/config";
import clsx from "clsx";
import { setThisClass } from "utils/setThisClass";

const blankEvent = {
  title: "ppp",
  start: "",
  end: "",
  allDay: false,
  url: "",
  color: "this:primary",
  extendedProps: {
    type: "emergency",
    status: "postponed",
  },
};

const typeOptions = [
  { value: "consultation", label: "Consultation", color: "primary" },
  { value: "control", label: "Control", color: "secondary" },
  { value: "emergency", label: "Emergency", color: "warning" },
  { value: "etc", label: "Other", color: "info" },
];

const Calendar = (props) => {
  // Props
  const {
    calendarApi,
    setCalendarApi,
    // calendarsColor,
    leftSidebarOpen,
    handleAddEventToggle,
    handleLeftSidebarToggle,
  } = props;

  // Refs
  const calendarRef = useRef();

  // Zustand Store
  const { events, selectEvent, updateEvent, filterEvents } = useCalendarStore();

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current?.getApi());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set the initial language from i18n or fallback to the default theme language
  const initialLang =
    localStorage.getItem("i18nextLng") || defaultTheme.defaultLang;

  const initialDir = i18n.dir(initialLang);

  // calendarOptions(Props)
  const calendarOptions = {
    events: events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev, next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    views: {
      week: {
        titleFormat: { year: "numeric", month: "short", day: "numeric" },
      },
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,

    selectable: true,
    selectMirror: true,
    // weekends: true,
    customButtons: {
      sidebarToggle: {
        icon: `
            relative w-8 h-6 flex flex-col justify-between items-center p-0 bg-transparent border-0 cursor-pointer
            before:content-[''] before:absolute before:w-full before:h-1 before:bg-primary-600 before:rounded-sm before:top-1
            before:transition-all 
            after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary-600 after:rounded-sm after:bottom-1
            after:transition-all 
          `,

        click() {
          handleLeftSidebarToggle();
        },
      },
    },

    eventClassNames({ event: calendarEvent }) {
      const color = typeOptions.find(
        (option) => option.value === calendarEvent._def.extendedProps.type,
      )?.color;

      // console.log("color");
      // console.log(calendarEvent._def.extendedProps.type);
      // console.log(calendarEvent._def);
      // console.log(color);

      return clsx("bg-this", setThisClass(color));
    },
    eventClick({ event: clickedEvent, jsEvent }) {
      jsEvent.preventDefault();
      console.log("eventClick");
      console.log(clickedEvent);

      selectEvent(clickedEvent);

      // handleAddEventToggle();
      if (clickedEvent.url) {
        // Open the URL in a new tab
        window.open(clickedEvent.url, "_blank");
      }
    },

    dateClick(info) {
      console.log("dateClick");
      console.log(info);

      const ev = { ...blankEvent };
      ev.start = info.date;
      ev.end = info.date;
      ev.allDay = true;

      selectEvent(ev);
      //handleAddEventToggle();
    },
    eventDrop({ event: droppedEvent }) {
      console.log("eventDrop");
      console.log(droppedEvent);

      updateEvent(droppedEvent);
      filterEvents();
    },
    droppable: true,
    drop({ draggedEl }) {
      // is the "remove after drop" checkbox checked?
      if (document.getElementById("drop-remove").checked) {
        // if so, remove the element from the "Draggable Events" list
        draggedEl.parentNode.removeChild(draggedEl);
      }
    },

    eventResize({ event: resizedEvent }) {
      console.log("resizedEvent");
      console.log(resizedEvent);

      // updateEvent(resizedEvent);
      // filterEvents();
    },
    ref: calendarRef,
    direction: initialDir,
  };

  return <FullCalendar {...calendarOptions}/>;
};

export default Calendar;
