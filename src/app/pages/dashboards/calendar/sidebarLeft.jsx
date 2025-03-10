/* eslint-disable no-unused-vars */
import { Button, Card, Checkbox } from "components/ui";
import useCalendarStore from "./store";
import { Transition, TransitionChild } from "@headlessui/react";
import clsx from "clsx";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";
import minMaxTimePlugin from "flatpickr/dist/plugins/minMaxTimePlugin";

import { useEffect, useRef } from "react";
import { Divider } from "app/layouts/MainLayout/Sidebar/PrimePanel/Menu/Divider";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { createPortal } from "react-dom";
import { setThisClass } from "utils/setThisClass";
import { Draggable } from "@fullcalendar/interaction";
import { DatePicker } from "components/shared/form/Datepicker";
import SimpleBar from "simplebar-react";
import { useIsomorphicEffect } from "hooks";
import { useLocaleContext } from "app/contexts/locale/context";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // Import Arabic locale
import {
  blankEvent,
  minuteIncrement,
  typeOptions,
} from "constants/calendar.constant";
import { adjustFlatpickrMinutes } from "utils/adjustFlatpickrMinutes";

const SidebarLeft = (props) => {
  // Props
  const {
    mdAbove,
    calendarApi,
    // calendarsColor,
    leftSidebarOpen,
    handleLeftSidebarToggle,
    handleAddEventToggle,
  } = props;

  // const colorsArr = calendarsColor ? Object.entries(calendarsColor) : [];
  // Zustand Store
  const {
    selectedTypes,
    addEvent,
    filterEvents,
    filterAllTypeLabels,
    filterTypeLabel,
    selectEvent,
  } = useCalendarStore();

  const { locale } = useLocaleContext();

  //   // load external events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const label = eventEl.getAttribute("title");
        const value = eventEl.dataset.value;

        const newEvent = {
          ...blankEvent,
          title: label,
          // allDay: false,
          extendedProps: { ...blankEvent.extendedProps, type: value },
        };

        console.log("eventEl ", newEvent);
        return newEvent;
      },
    });
  }, []);

  const renderTypeFilters = typeOptions.length
    ? typeOptions.map(({ label, value, color }) => {
        return (
          <Checkbox
            className="mb-1"
            key={value}
            label={label}
            color={color}
            checked={selectedTypes.indexOf(value) > -1}
            onChange={() => filterTypeLabel(value)}
          />
        );
      })
    : null;

  const handleAddEventToggleSidebar = () => {
    selectEvent(null);
    handleAddEventToggle();
  };

  const Sidebar = () => {
    return (
      <Transition appear show={leftSidebarOpen} as="div">
        {/* className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5" */}

        {!mdAbove && (
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 top-[65px] z-[1] bg-gray-900/50 transition-opacity dark:bg-black/40"
            onClick={handleLeftSidebarToggle}
            // className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40"
          />
        )}
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          // className="hide-scrollbar relative flex w-full max-w-md flex-col overflow-y-auto rounded-lg bg-white p-4 transition-opacity duration-300 dark:bg-dark-700 sm:px-5"

          className={clsx(
            //p-4
            "inset-y-0 top-[65px] z-[2] flex w-[18.75rem] max-w-4xl flex-col overflow-y-auto bg-white transition-opacity duration-300 dark:bg-dark-700 sm:px-5",
            { static: mdAbove, fixed: !mdAbove },
          )}
        >
          <SimpleBar>
            <div className="h-full w-full border-2 border-primary-300 py-3">
              <div className="p-5">
                <Button
                  isGlow
                  color="primary"
                  className="flex w-full gap-3"
                  onClick={handleAddEventToggleSidebar}
                >
                  <TableSortIcon />
                  Add Event
                </Button>
              </div>

              <div className="my-2.5 h-px bg-gray-200 dark:bg-dark-500" />
              {/* {dayjs(new Date()).locale("ar").format("D MMMM YYYY HH:mm")}
              {dayjs(new Date()).locale("ar").format("D MMMM YYYY HH:mm")}
              {dayjs(new Date()).locale("ar").format("D MMMM YYYY HH:mm")} */}

              <Card className="m-2 flex items-center justify-center overflow-hidden [&_.flatpickr-calendar]:min-w-full">
                <DatePicker
                  isCalendar
                  label="start date:"
                  placeholder="Choose start date..."
                  onChange={(_, dateStr) => {
                    // console.log("dateStr");
                    // console.log(dateStr);
                    console.log(dateStr);

                    calendarApi.gotoDate(dateStr);
                  }}
                  options={{
                    // dateFormat: "Y-m-d G:00 K",
                    // dateFormat: "Y-m-d H:i",
                    // minuteIncrement,
                    // time_24hr: true,
                    // minTime: "16:00",
                    // maxTime: "22:30",
                    // defaultDate: new Date(),
                    // weekNumbers: true,
                    // noCalendar: true,
                    // enableTime: true,
                    // minDate: "today",
                    //maxDate: new Date().fp_incr(14)
                    // locale: { firstDayOfWeek: 1 },
                    //enable: {},
                    // formatDate: (date, format, locale_) => {
                    //   return dayjs(date).locale("ar").format("D MMMM YYYY HH:mm");
                    // },
                    disable: [
                      // {
                      //   from: "2025-03-05",
                      //   to: "2025-03-10",
                      // },
                      // "2025-03-07",
                      // "2025-03-08",
                      // "2025-03-09",
                      //new Date(2025, 0, 17),
                      // new Date().fp_incr(14)

                      function (date) {
                        const disabledDates = [
                          "2025-03-07",
                          "2025-03-08",
                          "2025-03-09",
                        ];
                        const disabledDateTimes = {
                          "2025-03-02": ["12:00", "14:30"],
                          "2025-03-10": ["12:00", "14:30"],
                          "2025-03-11": ["09:00", "18:00"],
                        };

                        const dateStr = date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD
                        // // console.log("date");
                        // // console.log(date);
                        // // console.log(disabledDates.includes(dateStr));
                        // // console.log(disabledDateTimes[dateStr]);

                        if (disabledDates.includes(dateStr)) return true; // Disable full date

                        // if (disabledDateTimes[dateStr]) {
                        //   let timeStr = date.toTimeString().slice(0, 5); // Get HH:MM format
                        //   console.log(timeStr);
                        //   return disabledDateTimes[dateStr].includes(timeStr);
                        //   // const day = String(date.getDate()).padStart(2, "0");
                        //   // const month = String(date.getMonth() + 1).padStart(
                        //   //   2,
                        //   //   "0",
                        //   // );
                        //   // const hours = String(date.getHours()).padStart(2, "0");
                        //   // const minutes = String(date.getMinutes()).padStart(
                        //   //   2,
                        //   //   "0",
                        //   // );
                        //   // const dateTimeStr = `${month}-${day} ${hours}:${minutes}`;
                        //   // console.log("dateTimeStr");
                        //   // console.log(dateTimeStr);
                        // }

                        return false; // Enable everything else
                      },
                    ],
                    plugins: [
                      // new confirmDatePlugin({}),
                      // new rangePlugin({ input: "#secondRangeInput" }),
                      // new minMaxTimePlugin({
                      //   table: {
                      //     "2025-03-02": {
                      //       minTime: "16:00",
                      //       maxTime: "22:00",
                      //     },
                      //     "2025-01-10": {
                      //       minTime: "16:00",
                      //       maxTime: "22:00",
                      //     },
                      //   },
                      // }),
                    ],
                  }}
                />
              </Card>

              <div className="my-2.5 h-px bg-gray-200 dark:bg-dark-500" />

              <div id="external-events" className="m-2 space-y-1.5">
                <p className="pb-2 text-sm">
                  Drag and drop your event or click in the calendar
                </p>

                {typeOptions.map(({ label, value, color }, index) => (
                  <div
                    key={index}
                    title={label}
                    data={index + 1}
                    data-value={value}
                    className="fc-event flex cursor-move items-center space-x-2 rounded bg-slate-100 px-4 py-1.5 text-sm shadow-sm dark:bg-slate-700 rtl:space-x-reverse"
                  >
                    <span
                      className={clsx(
                        "h-2 w-2 rounded-full bg-this",
                        setThisClass(color),
                      )}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="my-2.5 h-px bg-gray-200 dark:bg-dark-500" />

              <Checkbox
                className="m-2"
                id="drop-remove"
                label="remove after drop"
                value={false}
              />

              <div className="my-2.5 h-px bg-gray-200 dark:bg-dark-500" />

              <div className="mx-5 my-2 flex w-full flex-col">
                <h5 className="mb-4">Event Filters</h5>

                <Checkbox
                  className="mb-4"
                  label="View All"
                  color="secondary"
                  checked={selectedTypes.length === typeOptions.length}
                  onChange={(e) => filterAllTypeLabels(e.target.checked)}
                />

                {renderTypeFilters}
              </div>
            </div>
          </SimpleBar>
        </TransitionChild>
      </Transition>
    );
  };

  if (renderTypeFilters) {
    return <>{mdAbove ? Sidebar() : createPortal(Sidebar(), document.body)}</>;
  } else return null;
};

export default SidebarLeft;
