// Import Dependencies
import { useState } from "react";

// Local Imports
import { CollapsibleSearch } from "components/shared/CollapsibleSearch";
import { FacedtedFilter } from "./FacedtedFilter";
import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CalendarConfig } from "./calendarConfig";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const statusOptions = [
  { value: "confirmed", label: "Confirmed", color: "success", icon: ClockIcon },
  { value: "pending", label: "Pending", color: "info", icon: ClockIcon },
  { value: "canceled", label: "Canceled", color: "warning", icon: ClockIcon },
  { value: "postponed", label: "Postponed", color: "error", icon: ClockIcon },
];

export function CalendarHeader({ isFullScreen, setIsFullScreen }) {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div>
      <div className="table-toolbar flex items-center justify-between">
        <h2 className="truncate text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Calendar Details
        </h2>
        <div className="flex">
          <CollapsibleSearch
            placeholder="Search here..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <FacedtedFilter
            options={statusOptions}
            title="Status"
            Icon={ChartBarIcon}
          />
          <CalendarConfig
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
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
