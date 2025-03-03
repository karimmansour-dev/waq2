/* eslint-disable no-unused-vars */
// Import Dependencies
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";
import { Badge, Button, Checkbox, Input } from "components/ui";
import { useFuse } from "hooks";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";

// Local Imports
// import { Badge, Button, Checkbox, Input } from "components/ui";
// import { useFuse } from "hooks";
// import { ResponsiveFilter } from "./ResponsiveFilter";
// import { useBreakpointsContext } from "app/contexts/breakpoint/context";

// ----------------------------------------------------------------------

export function FacedtedFilter({
  title,
  options,
  labelField = "label",
  valueField = "value",
  Icon,
  renderPrefix,
  showCheckbox = true,
  onChange,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  useEffect(
    () => () =>
      setSelectedValues(["confirmed", "pending", "canceled", "postponed"]),
    [],
  );

  const selectedItems = options?.filter((o) =>
    selectedValues.includes(o[valueField]),
  );

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          {Icon && <Icon className="size-4" />}

          <span>{title}</span>

          {selectedItems?.length > 0 && (
            <>
              <div className="h-full w-px bg-gray-300 dark:bg-dark-450" />
              <Badge className="lg:hidden">{selectedItems.length}</Badge>

              {selectedItems.length > 2 ? (
                <Badge className="max-lg:hidden">
                  {selectedItems.length} selected
                </Badge>
              ) : (
                <div className="hidden gap-1 lg:flex">
                  {selectedItems.map((val) => (
                    <Badge key={val[valueField]} className="gap-1">
                      {val.icon && <val.icon className="size-4 stroke-1" />}
                      <span>{val[labelField]}</span>
                    </Badge>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      }
    >
      <ComboboxFilter
        {...{
          title,
          options,
          labelField,
          valueField,
          renderPrefix,
          showCheckbox,
          selectedValues,
          setSelectedValues,
          onChange,
        }}
      />
    </ResponsiveFilter>
  );
}

function ComboboxFilter({
  title,
  options,
  labelField,
  valueField,
  renderPrefix,
  showCheckbox,
  selectedValues,
  setSelectedValues,
  onChange,
}) {
  const inputRef = useRef();
  const {
    result: filteredItems,
    query,
    setQuery,
  } = useFuse(options, {
    keys: [labelField],
    threshold: 0.2,
    matchAllOnEmptyQuery: true,
  });

  const { smAndUp } = useBreakpointsContext();

  useEffect(() => {
    smAndUp && inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Combobox
      value={options?.filter((o) => selectedValues.includes(o[valueField]))}
      onChange={(list) => {
        const values = list.map((item) => item[valueField]);
        setSelectedValues(values);
        onChange(values);
      }}
      multiple
      className="h-[366px] sm:h-auto sm:max-h-80 sm:w-56"
    >
      <div className="relative flex flex-col">
        <div className="relative bg-gray-100 py-1 dark:bg-dark-900">
          <ComboboxInput
            as={Input}
            className="border-none"
            ref={inputRef}
            autoComplete="new"
            placeholder={title}
            displayValue={({ name }) => name}
            onChange={(event) => setQuery(event.target.value)}
            prefix={<MagnifyingGlassIcon className="size-4" />}
          />
        </div>

        <ComboboxOptions
          static
          className="h-auto w-full overflow-y-auto py-1 outline-none"
        >
          {filteredItems.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none px-2.5 py-2 text-gray-800 dark:text-dark-100">
              Nothing found for {query}
            </div>
          ) : (
            filteredItems.map(({ item, refIndex }) => (
              <ComboboxOption
                key={refIndex}
                className={({ focus }) =>
                  clsx(
                    "relative cursor-pointer select-none px-2.5 py-2 text-gray-800 outline-none transition-colors dark:text-dark-100",
                    focus && "bg-gray-100 dark:bg-dark-600",
                  )
                }
                value={item}
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {showCheckbox && <Checkbox checked={selected} readOnly />}
                      {item.icon && <item.icon className="size-4.5 stroke-1" />}
                      {renderPrefix && renderPrefix(item, selected)}
                      <span className="block truncate text-xs+">
                        {item[labelField]}
                      </span>
                    </div>
                    <span className="font-mono text-xs">
                      {selectedValues.length}
                    </span>
                  </div>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
        {selectedValues?.length > 0 && (
          <Button
            onClick={() => {
              setSelectedValues([]);
              onChange([]);
            }}
            className="w-full shrink-0 rounded-none"
          >
            Clear Filter
          </Button>
        )}
      </div>
    </Combobox>
  );
}

FacedtedFilter.propTypes = {
  title: PropTypes.string,
  labelField: PropTypes.string,
  valueField: PropTypes.string,
  options: PropTypes.array,
  Icon: PropTypes.elementType,
  renderPrefix: PropTypes.func,
  showCheckbox: PropTypes.bool,
  onChange: PropTypes.func,
};

ComboboxFilter.propTypes = {
  title: PropTypes.string,
  labelField: PropTypes.string,
  valueField: PropTypes.string,
  options: PropTypes.array,
  renderPrefix: PropTypes.func,
  showCheckbox: PropTypes.bool,
  selectedValues: PropTypes.array,
  setSelectedValues: PropTypes.func,
  onChange: PropTypes.func,
};
