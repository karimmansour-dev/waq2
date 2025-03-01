// Import Dependencies
import PropTypes from "prop-types";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { Checkbox } from "components/ui";

// ----------------------------------------------------------------------

export function RadioField({ name, value, onChange, error, options }) {
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      className="mt-2 flex w-full gap-3"
    >
      {options.map((option) => (
        <Field key={option.value} className="flex w-full gap-3">
          <Radio
            value={option.value}
            as={Checkbox}
            color={option.color}
            checked={option.value === value}
            onChange={() => {}}
            className={({ checked, hover }) => {
              return clsx(
                "size-4 rounded-full ring-this ring-offset-2 ring-offset-white dark:ring-offset-dark-700",
                (hover || checked) && "ring-2",
                setThisClass(option.color),
              );
            }}
          ></Radio>

          <Label>{option.label}</Label>
        </Field>
      ))}
    </RadioGroup>
  );
}

RadioField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.array,
  error: PropTypes.string,
  name: PropTypes.string,
};
