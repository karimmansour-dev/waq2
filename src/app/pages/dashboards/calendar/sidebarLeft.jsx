/* eslint-disable no-unused-vars */
import { Button, Checkbox } from "components/ui";
import useCalendarStore from "./store";
import { Transition, TransitionChild } from "@headlessui/react";
import clsx from "clsx";

import { useEffect, useRef } from "react";
import { Divider } from "app/layouts/MainLayout/Sidebar/PrimePanel/Menu/Divider";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { createPortal } from "react-dom";
import { setThisClass } from "utils/setThisClass";
import { Draggable } from "@fullcalendar/interaction";
import { DatePicker } from "components/shared/form/Datepicker";
import SimpleBar from "simplebar-react";
import { useIsomorphicEffect } from "hooks";

const typeOptions = [
  { value: "consultation", label: "Consultation", color: "primary" },
  { value: "control", label: "Control", color: "secondary" },
  { value: "emergency", label: "Emergency", color: "warning" },
  { value: "etc", label: "Other", color: "info" },
];

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

  // Vars
  // const colorsArr = calendarsColor ? Object.entries(calendarsColor) : [];
  // Zustand Store
  const {
    selectedCalendars,
    filterAllCalendarLabels,
    filterCalendarLabel,
    selectEvent,
  } = useCalendarStore();

  //   // load external events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const label = eventEl.getAttribute("title");
        const value = eventEl.dataset.value;
        const color = eventEl.dataset.color;

        console.log("eventEl ", label, value, color);
        return {
          color: color,
          title: label,
          extendedProps: {
            type: value,
            status: "confirmed",
          },
        };
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
            checked={selectedCalendars.indexOf(value) > -1}
            onChange={() => filterCalendarLabel(value)}
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

          className={clsx( //p-4
            "inset-y-0 top-[65px] z-[2] flex w-[18.75rem] max-w-4xl flex-col overflow-y-auto bg-white  transition-opacity duration-300 dark:bg-dark-700 sm:px-5",
            { static: mdAbove, fixed: !mdAbove },
          )}
        >
          <SimpleBar className="h-full border-2 border-primary-300 p-1">
            <div className="w-full">
              <div className="is-full p-6">
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

              <Divider className="is-full" />

              <DatePicker
                isCalendar
                onChange={(date) => {
                  calendarApi.gotoDate(date[0]);
                }}
              />

              <Divider className="w-full" />

              <div id="external-events" className="mt-6 space-y-1.5">
                <p className="pb-2 text-sm">
                  Drag and drop your event or click in the calendar
                </p>

                {typeOptions.map(({ label, value, color }, index) => (
                  <div
                    key={index}
                    title={label}
                    data={index + 1}
                    data-color={color}
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

              <Divider className="w-full" />

              <Checkbox
                id="drop-remove"
                label="remove after drop"
                value={false}
              />

              <Divider className="w-full" />

              <div className="flex w-full flex-col p-6">
                <h5 className="mb-4">Event Filters</h5>

                <Checkbox
                  className="mb-4"
                  label="View All"
                  color="secondary"
                  checked={selectedCalendars.length === typeOptions.length}
                  onChange={(e) => filterAllCalendarLabels(e.target.checked)}
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
