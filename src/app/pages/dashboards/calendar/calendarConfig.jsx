// Import Dependencies
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";
import { EvantSettings } from "./evantSettings";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export function CalendarConfig({ isFullScreen, setIsFullScreen, onChange }) {
  const { smAndDown } = useBreakpointsContext();

  return (
    <ResponsiveFilter
      anchor={{ to: "bottom end", gap: 12 }}
      buttonContent={
        <>
          <ViewColumnsIcon className="size-4" />
          <span>View</span>
        </>
      }
      classNames={{
        button: "!border-solid",
      }}
    >
      {smAndDown ? (
        <div className="mx-auto flex h-12 w-full shrink-0 items-center justify-between border-b border-gray-200 px-3 dark:border-dark-500">
          <p className="truncate text-start text-base font-medium text-gray-800 dark:text-dark-50">
            Table View
          </p>
        </div>
      ) : (
        <h3 className="px-3 pt-2.5 text-sm+ font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Table View
        </h3>
      )}

      <div className="flex flex-col max-sm:overflow-hidden sm:w-64">
        <EvantSettings
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          onChange={onChange}
        />
      </div>
    </ResponsiveFilter>
  );
}

CalendarConfig.propTypes = {
  isFullScreen: PropTypes.bool,
  setIsFullScreen: PropTypes.func,
  onChange: PropTypes.func,
};
