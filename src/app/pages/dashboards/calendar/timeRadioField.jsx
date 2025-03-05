// Import Dependencies
import PropTypes from "prop-types";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

// Local Imports
import { CheckIcon } from "@heroicons/react/20/solid";

// ----------------------------------------------------------------------

export function TimeRadioField({ name, value, onChange, options }) {
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full"
    >
      <Label className="w-full text-sm font-medium">Select time</Label>

      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {options.map((option) => (
          <Field key={option.value} className="flex w-full gap-2 items-center">
            <Radio
              value={option.value}
              className={({ checked, hover }) =>
                clsx(
                  "relative flex w-full cursor-pointer rounded-lg px-5 py-4 outline-none transition-colors",
                  checked
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-dark-600",
                  { "ring-2 ring-primary-500/50": hover },
                )
              }
            >
              {({ checked }) => (
                <>
                  <div className="g-x-5 flex w-full items-center justify-around">
                    <div className="flex flex-col items-start justify-between">
                      <Label
                        as="p"
                        className={`text-sm font-medium ${
                          checked
                            ? "text-white"
                            : "text-gray-900 dark:text-dark-50"
                        }`}
                      >
                        {option.label}
                      </Label>
                      {/* <span
                        className={`inline text-xs ${
                          checked
                            ? "text-primary-100"
                            : "text-gray-500 dark:text-dark-200"
                        }`}
                      >
                        {option.description}
                      </span> */}
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="size-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </Radio>
          </Field>
        ))}
      </div>
    </RadioGroup>
  );
}

TimeRadioField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.array,
  name: PropTypes.string,
};
