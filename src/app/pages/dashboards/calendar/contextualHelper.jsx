/* eslint-disable no-unused-vars */
// React Imports
import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import propTypes from "prop-types";

// imports
import { ContextualHelp } from "components/shared/ContextualHelp";
import { setThisClass } from "utils/setThisClass";
import { Tag } from "components/ui";
import { statusOptions, typeOptions } from "constants/calendar.constant";

const ContextualHelper = (eventInfo, selectedEventViews) => {
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
  const typeColor = typeOptions.find((option) => option.value === type)?.color;
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
      className={clsx(
        "mmmmmmmmmmmmmmmmmmmmmmm absolute bottom-1 right-1 z-50",
        setThisClass(typeColor),
        {
          "opacity-50": isGone,
          "border-dashed": isMirror,
          "ring-2 ring-primary-500": isSelected,
        },
      )}
      content={
        <>
          <p>
            Segments identify who your visitors are, what devices and services
            they use, where they navigated from, and much more.
          </p>

          {/* Event Title */}
          {selectedEventViews.includes("title") && (
            <h3 className="text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
              {title}
            </h3>
          )}
          {/* Event Time */}
          {selectedEventViews.includes("start") && (
            <p className="mt-2 text-sm text-gray-600 dark:text-dark-200">
              <span className="font-medium">Start:</span> {startTime}
            </p>
          )}
          {selectedEventViews.includes("end") && (
            <p className="mt-1 text-sm text-gray-600 dark:text-dark-200">
              <span className="font-medium">End:</span> {endTime}
            </p>
          )}
          {/* Event Type and Status */}
          {(selectedEventViews.includes("type") &&
            selectedEventViews.includes("status")) || (
            <div className="mt-2 flex gap-2">
              {selectedEventViews.includes("type") && (
                <Tag
                  className={clsx(
                    "text-blue-800",
                    "bg-this",
                    setThisClass(typeColor),
                  )}
                >
                  {type}
                </Tag>
              )}
              {selectedEventViews.includes("status") && (
                <Tag
                  className={clsx(
                    "text-blue-800",
                    "bg-this",
                    setThisClass(statusColor),
                  )}
                >
                  {status}
                </Tag>
              )}
            </div>
          )}
          {/* Doctor Details */}
          {selectedEventViews.includes("doctor") &&
            event.extendedProps.doctor && (
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
          {selectedEventViews.includes("patient") &&
            event.extendedProps.patient && (
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
          {selectedEventViews.includes("content") &&
            event.extendedProps.content && (
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
          {selectedEventViews.includes("stateIndicators") && (
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
          )}
          {/* Footer */}
          {selectedEventViews.includes("eventId") && (
            <p className="mt-3 text-xs text-gray-400 dark:text-dark-300">
              Event ID: {event.id}
            </p>
          )}
        </>
      }
    />
  );
};

ContextualHelper.propTypes = {
  eventInfo: propTypes.object,
  selectedEventViews: propTypes.array,
};

export default ContextualHelper;
