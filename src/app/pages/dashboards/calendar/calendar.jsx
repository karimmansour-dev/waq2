/* eslint-disable no-unused-vars */
// React Imports
import { useEffect, useRef, useState } from "react";

// imports
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
  const { events, addEvent, selectEvent, updateEvent, filterEvents } =
    useCalendarStore();

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
    allDaySlot: false,
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

      return clsx("bg-this", setThisClass(color));
    },
    eventClick({ event: clickedEvent, jsEvent }) {
      jsEvent.preventDefault();
      selectEvent({
        url: clickedEvent._def.url,
        title: clickedEvent._def.title,
        allDay: clickedEvent._def.allDay,
        end: clickedEvent._instance.range.end,
        start: clickedEvent._instance.range.start,
        extendedProps: clickedEvent._def.extendedProps,
      });

      handleAddEventToggle();
      if (clickedEvent.url) {
        // Open the URL in a new tab
        window.open(clickedEvent.url, "_blank");
      }
    },

    dateClick(info) {
      const clickDate = info.date; // Get the date where event is clicked

      const minuteIncrement = 15;

      const now = new Date(); // Get current time

      let currentMinutes = now.getMinutes();
      let nextInterval =
        Math.ceil(currentMinutes / minuteIncrement) * minuteIncrement;

      // Handle case where nextInterval is 60 (roll over to next hour)
      if (nextInterval === 60) {
        now.setHours(now.getHours() + 1);
        nextInterval = 0;
      }

      const start = new Date(clickDate);
      start.setHours(now.getHours(), nextInterval, 0, 0); // Keep dropped date, use current adjusted time
      const end = new Date(start.getTime() + minuteIncrement * 60 * 1000);

      const ev = { ...blankEvent };
      ev.start = start;
      ev.end = end;
      ev.allDay = false;

      selectEvent(ev);
      handleAddEventToggle();
    },
    eventDrop({ event: droppedEvent }) {
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
    eventReceive(info) {
      const dropDate = info.event.start; // Get the date where event is dropped
      const minuteIncrement = 15;

      const now = new Date(); // Get current time

      let currentMinutes = now.getMinutes();
      let nextInterval =
        Math.ceil(currentMinutes / minuteIncrement) * minuteIncrement;

      // Handle case where nextInterval is 60 (roll over to next hour)
      if (nextInterval === 60) {
        now.setHours(now.getHours() + 1);
        nextInterval = 0;
      }

      const start = new Date(dropDate);
      start.setHours(now.getHours(), nextInterval, 0, 0); // Keep dropped date, use current adjusted time
      const end = new Date(start.getTime() + minuteIncrement * 60 * 1000);

      // Update event with correct time
      info.event.setProp("allDay", false); // Ensure it's not an all-day event
      info.event.setStart(start);
      info.event.setEnd(end);

      addEvent({
        allDay: info.event.allDay,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        extendedProps: info.event.extendedProps,
      });
      filterEvents();
    },
    eventResize({ event: resizedEvent }) {
      updateEvent(resizedEvent);
      filterEvents();
    },
    ref: calendarRef,
    direction: initialDir,
  };

  return <FullCalendar {...calendarOptions} />;
};

export default Calendar;
