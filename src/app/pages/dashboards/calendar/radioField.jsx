// Import Dependencies
import PropTypes from "prop-types";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { setThisClass } from "utils/setThisClass";

// Local Imports

// ----------------------------------------------------------------------

export function RadioField({ error, options, ...field }) {
  return (
    <RadioGroup {...field} error={error} className="mt-2 flex w-full gap-3">
      {options.map((option) => (
        <Field
          key={option.value}
          className={clsx("flex w-full gap-3", setThisClass(option.color))}
        >
          <Radio
            value={option.value}
            // color={option.color}
            className={({ checked }) =>
              clsx(
                "size-4 rounded-full ring-inherit ring-offset-2 ring-offset-white dark:ring-offset-dark-700",
                checked && "ring-2",
                setThisClass(option.color),
              )
            }
          >
            {({ checked }) => <>{checked && <CheckIcon />}</>}
          </Radio>

          <Label>{option.label}</Label>
        </Field>
      ))}
    </RadioGroup>

    // <RadioGroup {...props}>
    //   <Label>Task Color:</Label>
    //   <div className="mt-2 flex gap-2 lg:mt-3.5">
    //     {colors.map((color) => (
    //       <Radio
    //         as={Button}
    //         isIcon
    //         key={color}
    //         value={color}
    //         color={color}
    //         className={({ checked }) =>
    //           clsx(
    //             "size-5 rounded-full ring-inherit ring-offset-2 ring-offset-white dark:ring-offset-dark-700",
    //             checked && "ring-2",
    //           )
    //         }
    //       />
    //     ))}
    //   </div>
    // </RadioGroup>
  );
}

RadioField.propTypes = {
  fieldProps: PropTypes.object,
};
