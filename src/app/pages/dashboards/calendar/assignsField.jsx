// Import Dependencies
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

// Local Imports
import { Avatar, Input, InputErrorMsg, Tag } from "components/ui";

const allMembers = [
  {
    uid: "1",
    name: "John Doe",
    avatar: null,
  },
  {
    uid: "2",
    name: "Emilia Clarke",
    avatar: "/images/200x200.png",
  },
  {
    uid: "3",
    name: "Majid Yahyaei",
    avatar: "/images/200x200.png",
  },
  {
    uid: "4",
    name: "Travis Fuller",
    avatar: null,
  },
  {
    uid: "5",
    name: "Alfredo Elliott",
    avatar: "/images/200x200.png",
  },
  {
    uid: "6",
    name: "Henry Curtis",
    avatar: null,
  },
  {
    uid: "10",
    name: "Lance Tucker",
    avatar: "/images/200x200.png",
  },
  {
    uid: "11",
    name: "Katrina West",
    avatar: "/images/200x200.png",
  },
  {
    uid: "12",
    name: "Samantha Shelton",
    avatar: "/images/200x200.png",
  },
  {
    uid: "13",
    name: "Corey Evans",
    avatar: "/images/200x200.png",
  },
  {
    uid: "14",
    name: "Joe Perkins",
    avatar: "/images/200x200.png",
  },
  {
    uid: "15",
    name: "Henry Cavil",
    avatar: null,
  },
];

// ----------------------------------------------------------------------

export function AssignsField({ onChange, value, name, error }) {
  const [query, setQuery] = useState("");
  const members = allMembers || [];

  const filteredMembers =
    query === ""
      ? members
      : members.filter((member) =>
          member.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  const removeItem = () => {
    onChange(null);
  };

  return (
    <Combobox value={value || null} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <Label>{`${name[0].toUpperCase()}${name.substr(1)}`}:</Label>

          <div
            className={clsx(
              "relative mt-1.5 rounded-lg border transition-colors",
              //focus-within
              // error
              // ? "border-error dark:border-error-lighter"
              // : "border-gray-300 hover:border-gray-400 dark:border-dark-450 dark:hover:border-dark-400 focus-within:!border-primary-600 dark:focus-within:!border-primary-500",
              error
                ? "border-error dark:border-error-lighter"
                : open
                  ? "border-primary-600 dark:border-primary-500"
                  : "border-gray-300 hover:border-gray-400 dark:border-dark-450 dark:hover:border-dark-400",
            )}
          >
            <ul
              className={clsx(
                "flex flex-wrap gap-1.5 border-b px-3 py-2 transition-colors",
                open
                  ? "border-primary-600 dark:border-primary-500"
                  : "border-gray-300 dark:border-dark-450",
              )}
            >
              {value?.name ? (
                <Tag
                  onClick={() => removeItem()}
                  component="button"
                  type="button"
                  variant="outlined"
                  className="flex h-6 rounded-full p-px align-top"
                >
                  <Avatar
                    size={5.5}
                    src={value.avatar}
                    name={value.name}
                    initialColor="auto"
                    classNames={{ display: "text-tiny+" }}
                  />
                  <span className="mx-2">{value.name}</span>
                </Tag>
              ) : (
                <span className="h-6 italic text-gray-400 dark:text-dark-300">
                  Unassigned
                </span>
              )}
            </ul>

            <div className="relative w-full cursor-default overflow-hidden px-3 py-2 text-start outline-none ltr:pr-9 rtl:pl-9">
              <ComboboxInput
                as={Input}
                unstyled
                classNames={{
                  root: "flex-1",
                  input:
                    "placeholder:text-gray-400 dark:placeholder:text-dark-300",
                }}
                // displayValue={(member) => member.name}
                autoComplete="off"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                value={query}
                placeholder={`Select ${name[0].toUpperCase()}${name.substr(1)}`}
              />
              <ComboboxButton className="absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
                <ChevronDownIcon
                  className={clsx(
                    "size-5 text-gray-400 transition-transform dark:text-dark-300",
                    open && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>

            <Transition
              as={ComboboxOptions}
              enter="transition ease-out"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
              className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-none focus-visible:outline-none dark:border-dark-500 dark:bg-dark-700 dark:shadow-none"
            >
              {filteredMembers.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-800 dark:text-dark-100">
                  Nothing found for {query}
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <ComboboxOption
                    key={member.uid}
                    className={({ selected, active }) =>
                      clsx(
                        "relative cursor-pointer select-none px-3 py-2 outline-none transition-colors",
                        (active || selected) &&
                          "text-gray-800 dark:text-dark-100",
                        active && !selected && "bg-gray-100 dark:bg-dark-600",
                        selected && "bg-gray-200 dark:bg-dark-500",
                      )
                    }
                    value={member}
                  >
                    {({ selected }) => (
                      <span className="flex items-center justify-between">
                        <span className="flex min-w-0 items-center gap-2">
                          <Avatar
                            size={6}
                            src={member.avatar}
                            name={member.name}
                            initialColor="auto"
                            classNames={{ display: "text-tiny+" }}
                          />
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {member.name}
                          </span>
                        </span>
                        {selected && <CheckIcon className="size-4.5" />}
                      </span>
                    )}
                  </ComboboxOption>
                ))
              )}
            </Transition>
          </div>

          <InputErrorMsg when={error && typeof error !== "boolean"}>
            {error}
          </InputErrorMsg>
        </div>
      )}
    </Combobox>
  );
}

AssignsField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  name: PropTypes.string,
  error: PropTypes.string,
};
