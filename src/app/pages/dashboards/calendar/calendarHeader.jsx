/* eslint-disable no-unused-vars */
// Import Dependencies
import { useState } from "react";

// Local Imports
import { CollapsibleSearch } from "components/shared/CollapsibleSearch";
import { FacedtedFilter } from "./FacedtedFilter";
import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CalendarConfig } from "./calendarConfig";
import PropTypes from "prop-types";
import useCalendarStore from "./store";
import { statusOptions } from "constants/calendar.constant";

// ---------------------------------------------------------------------- 

export function CalendarHeader({ isFullScreen, setIsFullScreen }) {
  // const [globalFilter, setGlobalFilter] = useState("");
  const {
    selectedStatuses,
    selectedEventViews,
    filterStatusLabel,
    // filterAllStatusLabels,
    filterEventViewLabel,
    globalFilter,
    setGlobalFilter,
  } = useCalendarStore();

  return (
    <div>
      <div className="table-toolbar flex items-center justify-between">
        <h2 className="truncate text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Calendar Details
        </h2>
        <div className="flex gap-x-2 p-1">
          <CollapsibleSearch
            placeholder="Search here..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <FacedtedFilter
            options={statusOptions}
            title="Status"
            Icon={ChartBarIcon}
            onChange={(values) => {
              const isAdding = values.length > selectedStatuses.length;

              let changedItem;
              if (isAdding) {
                changedItem = values.find(
                  (val) => !selectedStatuses.includes(val),
                );
              } else {
                changedItem = selectedStatuses.find(
                  (val) => !values.includes(val),
                );
              }

              // if (values.length === statusOptions?.length) {
              //   filterAllStatusLabels(true);
              // } else {
              filterStatusLabel(changedItem);
              // }
            }}
          />
          <CalendarConfig
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            onChange={(lable) => {
              filterEventViewLabel(lable)
            }}
          />
        </div>
      </div>
    </div>
  );
}

CalendarHeader.propTypes = {
  isFullScreen: PropTypes.bool,
  setIsFullScreen: PropTypes.func,
};
