/* eslint-disable no-unused-vars */
// React Imports
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
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
import { Button, Tag } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { locales } from "i18n/langs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ContextualHelp } from "components/shared/ContextualHelp";
import {
  blankEvent,
  minuteIncrement,
  statusOptions,
  typeOptions,
} from "constants/calendar.constant";
import ContextualHelper from "./ContextualHelper";
import { calculateStartAndEndTimes } from "utils/calculateStartAndEndTimes";
import renderEventDidMount from "utils/renderEventDidMount";

// dayjs.extend(relativeTime);

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
  const {
    events,
    selectedEventViews,
    addEvent,
    selectEvent,
    updateEvent,
    filterEvents,
  } = useCalendarStore();

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current?.getApi());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [localeData, setLocaleData] = useState({});
  const { locale, direction } = useLocaleContext();

  useEffect(() => {
    const loadLocale = async () => {
      const load = locales[locale].fullcalendar;
      if (load) {
        const loadedLocale = await load();
        setLocaleData(loadedLocale);
      } else {
        setLocaleData({}); // Fallback if no locale is found
      }
    };

    loadLocale();
  }, [locale]);

  function renderEventContent(eventInfo) {
    return ContextualHelper(eventInfo, selectedEventViews);
  }

  const date = new Date();
  const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);

  const calendarOptions = {
    events: events,
    // [
    //   {
    //     id: "11",
    //     title: "Appointment",
    //     start: date,
    //     end: nextDay,
    //     allDay: false,

    //     extendedProps: {
    //       type: "control",
    //       status: "confirmed",
    //       // doctor: {
    //       //   uid: "1",
    //       //   name: "Dr. John Doe",
    //       //   avatar: "https://example.com/avatar.jpg",
    //       // },
    //       // patient: {
    //       //   uid: "2",
    //       //   name: "Jane Smith",
    //       //   avatar: "https://example.com/avatar.jpg",
    //       // },
    //       // content: "Follow-up appointment for routine checkup.",
    //     },
    //   },
    // ],
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
        id: "11",
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

      const { start, end } = calculateStartAndEndTimes(
        clickDate,
        minuteIncrement,
      );

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

      const { start, end } = calculateStartAndEndTimes(
        dropDate,
        minuteIncrement,
      );

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
    eventContent: renderEventContent,
    eventDidMount: (eventInfo) =>
      renderEventDidMount(eventInfo, selectedEventViews),
    eventResize({ event: resizedEvent }) {
      updateEvent(resizedEvent);
      filterEvents();
    },
    ref: calendarRef,
    direction,
    locales: [localeData],
    locale,
  };

  return <FullCalendar {...calendarOptions} />;
};

export default Calendar;
