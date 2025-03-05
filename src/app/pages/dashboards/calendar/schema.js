// Import Dependencies
import * as Yup from "yup";

// Local Imports
// eslint-disable-next-line no-unused-vars
import { isDeltaNotEmpty } from "utils/quillUtils";

// ----------------------------------------------------------------------

// Helper function to check if a date is in the future
const isFutureDate = (value) => {
  if (!value) return false;
  return new Date(value) >= new Date(); // Dynamically check against the current time
};

export const schema = Yup.object().shape({
  // id: Yup.string().required("ID is required"),
  title: Yup.string()
    .trim()
    .min(2, "Title too short")
    .max(100, "Title too long")
    .required("Title is required"),

  start: Yup.date()
    .required("Start date is required")
    .test("is-future-or-now", "Start time must be in the future", isFutureDate),

  end: Yup.date()
    .required("End date is required")
    .min(Yup.ref("start"), "End date cannot be before start date"),

  timeSlot: Yup.date()
    .required("Time Slot is required")
    .min(Yup.ref("start"), "Time Slot cannot be before start date"),

  doctor: Yup.object()
    .shape({
      uid: Yup.string().required("Doctor's ID is required"),
      name: Yup.string().required("Doctor's name is required"),
      avatar: Yup.string().nullable(), //.required("Doctor's avatar is required"),
    })
    .required("Doctor's information is required"),

  patient: Yup.object()
    .shape({
      uid: Yup.string().required("Patient's ID is required"),
      name: Yup.string().required("Patient's name is required"),
      avatar: Yup.string().nullable(), //.required("Patient's avatar is required"),
    })
    .required("Patient's information is required"),

  status: Yup.string()
    .oneOf(
      ["confirmed", "pending", "canceled", "postponed"],
      "Status must be one of confirmed, pending, canceled, or postponed",
    )
    .required("Status is required"),

  type: Yup.string()
    .oneOf(
      ["consultation", "control", "emergency", "etc"],
      "Type must be one of consultation, control, emergency, or etc",
    )
    .required("Type is required"),

  dayPart: Yup.string()
    .oneOf(
      ["morning", "afternoon", "evening"],
      "Type must be one of morning, afternoon or evening",
    )
    .required("DayPart is required"),

  allDay: Yup.boolean().required("All day status is required"),

  oldOrder: Yup.number().required("OldOrder is required"),

  order: Yup.number()
    .required("Order is required")
    .min(Yup.ref("oldOrder"), "Order cannot be less than Old Order"),

  content: Yup.object().nullable(),
  // .required("Content is required")
  // .test("notEmpty", "Content Can't be empty", isDeltaNotEmpty),

  // createdAt: Yup.date().required("Created date is required"),
  // updatedAt: Yup.date().required("Updated date is required"),
});
