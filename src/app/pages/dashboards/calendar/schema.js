// Import Dependencies
import * as Yup from "yup";

// Local Imports
// eslint-disable-next-line no-unused-vars
import { isDeltaNotEmpty } from "utils/quillUtils";
import {
  selectedDayParts,
  selectedStatuses,
  selectedTypes,
} from "constants/calendar.constant";

// ----------------------------------------------------------------------

// Helper function to check if a date is in the future
const isFutureDate = (value) => {
  if (!value) return false;

  // Parse the input date
  const date = new Date(value);

  // Check if the date is valid
  if (isNaN(date.getTime())) return false;

  // Get the current date without time (to compare only dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight

  // Compare the input date with today's date
  return date >= today;
};

// Custom validation function for end-or-timeSlot logic
function endOrTimeSlotValidator(value) {
  const { end, timeSlot } = value;

  // console.log("endOrTimeSlotValidator");
  // console.log(end, timeSlot);

  // Check if both fields are provided
  if (end && timeSlot) {
    return this.createError({
      path: "end",
      message: "Cannot provide both end and timeSlot",
    });
  }

  // Check if neither field is provided
  if (!end && !timeSlot) {
    return this.createError({
      path: "end",
      message: "Either end or timeSlot must be provided",
    });
  }

  // Validation passes
  return true;
}

// Schema for doctor and patient objects to avoid repetition
const personSchema = Yup.object().shape({
  uid: Yup.string().required("ID is required"),
  name: Yup.string().required("Name is required"),
  avatar: Yup.string().nullable(), // Optional field
});

// Base schema with common fields
const baseSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),

  start: Yup.date()
    .required("Start date is required")
    .test("is-future-or-now", "Start date must be in the future", isFutureDate),

  status: Yup.string()
    .oneOf(
      selectedStatuses,
      `Status must be one of: ${selectedStatuses.join(", ")}`,
    )
    .required("Status is required"),

  type: Yup.string()
    .oneOf(selectedTypes, `Type must be one of: ${selectedTypes.join(", ")}`)
    .required("Type is required"),

  doctor: personSchema.required("Doctor's information is required"),

  patient: personSchema.required("Patient's information is required"),

  // allDay: Yup.boolean().required("All day status is required"),

  content: Yup.object().nullable(),
  // .required("Content is required")
  // .test("notEmpty", "Content Can't be empty", isDeltaNotEmpty),

  // createdAt: Yup.date().required("Created date is required"),
  // updatedAt: Yup.date().required("Updated date is required"),
});

// Function to dynamically extend the schema based on `isFlexibleSchedule`
const getSchema = (isFlexibleSchedule) => {
  let schema = baseSchema;

  if (!isFlexibleSchedule) {
    // Add fields for fixed schedule
    schema = schema
      .shape({
        end: Yup.date()
          .nullable()
          .min(Yup.ref("start"), "End date cannot be before the start date"),

        timeSlot: Yup.date()
          .nullable()
          .min(Yup.ref("start"), "Time slot cannot be before the start date"),
      })
      .test(
        "end-or-timeSlot",
        "Either end or timeSlot must be provided, but not both",
        endOrTimeSlotValidator,
      );
  } else {
    // Add fields for flexible schedule
    schema = schema.shape({
      dayPart: Yup.string()
        .oneOf(
          selectedDayParts,
          `Day part must be one of: ${selectedDayParts.join(", ")}`,
        )
        .required("Day part is required"),
      // oldOrder: Yup.number().required("Old order is required"),
      // order: Yup.number()
      //   .required("Order is required")
      //   .when("oldOrder", (oldOrder, schema) => {
      //     if (oldOrder === 0) {
      //       return schema.oneOf([1], "Order must be 1 when old order is 0");
      //     } else if (oldOrder > 0) {
      //       return schema.oneOf(
      //         [oldOrder + 1],
      //         `Order must be ${oldOrder + 1} when old order is ${oldOrder}`,
      //       );
      //     }
      //     return schema;
      //   }),
    });
  }

  return schema;
};

export default getSchema;
