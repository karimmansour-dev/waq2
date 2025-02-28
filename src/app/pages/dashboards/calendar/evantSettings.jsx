/* eslint-disable no-unused-vars */
// Local Imports
import { Button, Checkbox, Switch } from "components/ui";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";

// ----------------------------------------------------------------------
const detailEvents = [
  { label: "doctor", checked: true, isHiddenColumn: false },
  { label: "patient", checked: true, isHiddenColumn: false },
  { label: "status", checked: true, isHiddenColumn: false },
  { label: "type", checked: true, isHiddenColumn: false },
  { label: "start", checked: true, isHiddenColumn: false },
  { label: "end", checked: true, isHiddenColumn: false },
  { label: "title", checked: true, isHiddenColumn: false },
  { label: "content", checked: true, isHiddenColumn: false },
  { label: "url", checked: true, isHiddenColumn: false },
];

export function EvantSettings({ isFullScreen, setIsFullScreen }) {
  const [filteredSelectors, setFilteredSelectors] = useState([]);
  useEffect(
    () => () =>
      setFilteredSelectors(
        detailEvents.map((event) => event.checked && event.label),
      ),
    [],
  );

  const handleToggleVisibility = (label, checked) => {
    setFilteredSelectors((prevSelectors) => {
      if (checked) {
        //if (!prevSelectors.includes(label))
        if (!prevSelectors.includes(label)) {
          return [...prevSelectors, label];
        }
      } else {
        return prevSelectors.filter((item) => item !== label);
      }
      return prevSelectors;
    });
  };

  return (
    <>
      <div className="mb-4 mt-3 flex flex-col items-start space-y-2 px-3 text-gray-600 dark:text-dark-100">
        <Switch
          label="Full Screen"
          checked={isFullScreen}
          onChange={(e) => {
            setIsFullScreen(!isFullScreen);
          }}
          className="h-4 w-8"
        />
      </div>

      <div className="flex items-center space-x-2 px-3 rtl:space-x-reverse">
        <p className="text-tiny uppercase">column visibility</p>
        <hr className="flex-1 border-gray-300 dark:border-dark-500" />
      </div>

      <div className="mt-3 flex max-h-[50vh] flex-col space-y-2 overflow-y-auto overscroll-y-contain px-3 pb-3 text-gray-600 dark:text-dark-100">
        {detailEvents
          .filter((column) => !column?.isHiddenColumn)
          .map((column) => (
            <div
              className="flex items-center justify-between ltr:-mr-2 rtl:-ml-2"
              key={column.id}
            >
              <Checkbox
                label={column?.label}
                checked={filteredSelectors.includes(column?.label)}
                onChange={(event) =>
                  handleToggleVisibility(column?.label, event.target.checked)
                }
                className="size-4.5"
              />
            </div>
          ))}
      </div>

      <Button
        variant="flat"
        className="h-9 w-full shrink-0 rounded-t-none border-t border-gray-300 text-xs+ leading-none dark:border-dark-500"
        onClick={() =>
          setFilteredSelectors(detailEvents.map((event) => event.label))
        }
      >
        Show All Columns
      </Button>
    </>
  );
}

EvantSettings.propTypes = {
  handle: PropTypes.func,
};
