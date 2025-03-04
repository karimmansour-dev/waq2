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

const statusOptions = [
  { value: "confirmed", label: "Confirmed", color: "success" },
  { value: "pending", label: "Pending", color: "info" },
  { value: "canceled", label: "Canceled", color: "warning" },
  { value: "postponed", label: "Postponed", color: "error" },
];
const typeOptions = [
  { value: "consultation", label: "Consultation", color: "primary" },
  { value: "control", label: "Control", color: "secondary" },
  { value: "emergency", label: "Emergency", color: "warning" },
  { value: "etc", label: "Other", color: "info" },
];

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
  const { events, addEvent, selectEvent, updateEvent, filterEvents } =
    useCalendarStore();

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
    const {
      isDraggable,
      isDragging,
      isEnd,
      isEndResizable,
      isFuture,
      isMirror,
      isPast,
      isResizing,
      isSelected,
      isStart,
      isStartResizable,
      isToday,
      textColor,
      timeText,
    } = eventInfo;

    const { event } = eventInfo;

    const title = event.title;
    const type = event.extendedProps.type;
    const status = event.extendedProps.status;
    const typeColor = typeOptions.find(
      (option) => option.value === type,
    )?.color;
    const statusColor = statusOptions.find(
      (option) => option.value === status,
    )?.color;

    // Determine if the event is gone (past)
    const isGone = isPast && !isToday;

    // Format start and end times
    const startTime = event.start ? dayjs(event.start).format("h:mm A") : "N/A";
    const endTime = event.end ? dayjs(event.end).format("h:mm A") : "N/A";
    // const startTime = eventInfo.event.start
    //   ? dayjs(eventInfo.event.start).isValid()
    //     ? dayjs(eventInfo.event.start).fromNow() // Use relative time for user-friendly display
    //     : dayjs(eventInfo.event.start).format("MMM D, YYYY h:mm A") // Fallback to formatted time
    //   : "N/A";

    // const endTime = eventInfo.event.end
    //   ? dayjs(eventInfo.event.end).isValid()
    //     ? dayjs(eventInfo.event.end).fromNow() // Use relative time for user-friendly display
    //     : dayjs(eventInfo.event.end).format("MMM D, YYYY h:mm A") // Fallback to formatted time
    //   : "N/A";

    // console.log("eventInfo");
    // console.log({
    //   isDraggable,
    //   isDragging,
    //   isEnd,
    //   isEndResizable,
    //   isFuture,
    //   isMirror,
    //   isPast,
    //   isResizing,
    //   isSelected,
    //   isStart,
    //   isStartResizable,
    //   isToday,
    //   textColor,
    //   timeText,
    // });

    return (
      <ContextualHelp
        title="What is a segment?"
        anchor={{ to: "bottom end", gap: 12 }}
        className={clsx(setThisClass(typeColor), {
          "opacity-50": isGone,
          "border-dashed": isMirror,
          "ring-2 ring-primary-500": isSelected,
        })}
        content={
          <>
            <p>
              Segments identify who your visitors are, what devices and services
              they use, where they navigated from, and much more.
            </p>

            {/* Event Title */}
            <h3 className="text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
              {title}
            </h3>
            {/* Event Time */}
            <p className="mt-2 text-sm text-gray-600 dark:text-dark-200">
              <span className="font-medium">Start:</span> {startTime}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-dark-200">
              <span className="font-medium">End:</span> {endTime}
            </p>
            {/* Event Type and Status */}
            <div className="mt-2 flex gap-2">
              <Tag
                className={clsx(
                  "text-blue-800",
                  "bg-this",
                  setThisClass(typeColor),
                )}
              >
                {type}
              </Tag>
              <Tag
                className={clsx(
                  "text-blue-800",
                  "bg-this",
                  setThisClass(statusColor),
                )}
              >
                {status}
              </Tag>
            </div>
            {/* Doctor Details */}
            {event.extendedProps.doctor && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-800 dark:text-dark-100">
                  Doctor:
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {event.extendedProps.doctor.avatar && (
                    <img
                      src={event.extendedProps.doctor.avatar}
                      alt="Doctor Avatar"
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  <p className="text-sm text-gray-600 dark:text-dark-200">
                    {event.extendedProps.doctor.name}
                  </p>
                </div>
              </div>
            )}
            {/* Patient Details */}
            {event.extendedProps.patient && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-800 dark:text-dark-100">
                  Patient:
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {event.extendedProps.patient.avatar && (
                    <img
                      src={event.extendedProps.patient.avatar}
                      alt="Patient Avatar"
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  <p className="text-sm text-gray-600 dark:text-dark-200">
                    {event.extendedProps.patient.name}
                  </p>
                </div>
              </div>
            )}
            {/* Additional Content */}
            {event.extendedProps.content && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-800 dark:text-dark-100">
                  Notes:
                </p>
                <p className="text-sm text-gray-600 dark:text-dark-200">
                  {event.extendedProps.content}
                </p>
              </div>
            )}
            {/* Event State Indicators */}
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600 dark:text-dark-200">
                <span className="font-medium">Draggable:</span>{" "}
                {isDraggable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600 dark:text-dark-200">
                <span className="font-medium">Resizable:</span>{" "}
                {isStartResizable || isEndResizable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600 dark:text-dark-200">
                <span className="font-medium">date Status:</span>{" "}
                {isPast
                  ? "Past Event"
                  : isFuture
                    ? "Upcoming Event"
                    : "Ongoing Event"}
              </p>
              {isToday && (
                <p className="text-sm text-gray-600 dark:text-dark-200">
                  <span className="font-medium">Today:</span> Yes
                </p>
              )}
            </div>
            {/* Footer */}
            <p className="mt-3 text-xs text-gray-400 dark:text-dark-300">
              Event ID: {event.id}
            </p>
          </>
        }
      />
      // {/* </PopoverPanel>
      //   </Transition>
      // </Popover> */}
      // </div>
    );
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
    eventContent: renderEventContent,
    eventDidMount: function (info) {
      const { event } = info;

      // Create a container for event details
      const detailsContainer = document.createElement("div");
      detailsContainer.classList.add("flex", "flex-col", "gap-1", "text-sm");

      // Add title
      const titleEl = document.createElement("div");
      titleEl.innerText = event.title;
      titleEl.classList.add("font-medium");
      detailsContainer.appendChild(titleEl);

      // Add start and end time
      const startTime = event.start
        ? dayjs(event.start).format("h:mm A")
        : "N/A";
      const endTime = event.end ? dayjs(event.end).format("h:mm A") : "N/A";
      const timeEl = document.createElement("div");
      timeEl.innerText = `${startTime} - ${endTime}`;
      timeEl.classList.add("text-xs", "text-gray-200");
      detailsContainer.appendChild(timeEl);

      // Add patient name and avatar
      if (event.extendedProps.patient) {
        const patientContainer = document.createElement("div");
        patientContainer.classList.add("flex", "items-center", "gap-2", "mt-1");

        if (event.extendedProps.patient.avatar) {
          const avatarEl = document.createElement("img");
          avatarEl.src = event.extendedProps.patient.avatar;
          avatarEl.alt = "Patient Avatar";
          avatarEl.classList.add("h-6", "w-6", "rounded-full");
          patientContainer.appendChild(avatarEl);
        }

        const patientNameEl = document.createElement("div");
        patientNameEl.innerText = event.extendedProps.patient.name;
        patientNameEl.classList.add("text-xs", "text-gray-200");
        patientContainer.appendChild(patientNameEl);

        detailsContainer.appendChild(patientContainer);
      }

      // Add type and status
      const { type, status } = event.extendedProps;

      const typeColor = typeOptions.find(
        (option) => option.value === type,
      )?.color;
      const statusColor = statusOptions.find(
        (option) => option.value === status,
      )?.color;

      const typeStatusContainer = document.createElement("div");
      typeStatusContainer.classList.add("flex", "gap-2", "mt-1");

      const typeEl = document.createElement("div");
      typeEl.innerText = `${type}`;
      typeEl.classList.add(
        "px-2",
        "py-1",
        "rounded",
        "bg-opacity-50",
        // "bg-lighter",
        // `this:${typeColor}`,
        "text-xs",
      );
      typeStatusContainer.appendChild(typeEl);

      const statusEl = document.createElement("div");
      statusEl.innerText = `${status}`;
      statusEl.classList.add(
        "px-2",
        "py-1",
        "rounded",
        "bg-opacity-50",
        "bg-this",
        `this:${statusColor}`,
        "text-xs",
      );
      typeStatusContainer.appendChild(statusEl);

      detailsContainer.appendChild(typeStatusContainer);

      // Append the container to the event element
      info.el.appendChild(detailsContainer);
    },
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
