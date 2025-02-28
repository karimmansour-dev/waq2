// Import Dependencies
import * as Yup from "yup";

// Local Imports
import { isDeltaNotEmpty } from "utils/quillUtils";

// ----------------------------------------------------------------------

// color: color,
// custom: custom,
// create: true,

// id: '1',
// url: '',
// title: 'Design Review',
// start: date,
// end: nextDay,
// allDay: false,
// doctor
// fullName
// status (confirmed, pending, canceled, postponed)
// type (consultation, control, emergency, etc)
// extendedProps: {
//   calendar: 'Business'
// }
// content;
// createdAt;
// updatedAt;

export const schema = Yup.object().shape({
  // id: Yup.string().required("ID is required"),
  title: Yup.string()
    .trim()
    .min(2, "Title too short")
    .max(100, "Title too long")
    .required("Title is required"),
  start: Yup.date().required("Start date is required"),
  end: Yup.date()
    .min(Yup.ref("start"), "End date cannot be before start date")
    .required("End date is required"),
  allDay: Yup.boolean().required("All day status is required"),
  doctor: Yup.object()
    .shape({
      uid: Yup.string().required("Doctor's ID is required"),
      name: Yup.string().required("Doctor's name is required"),
      avatar: Yup.string().required("Doctor's avatar is required"),
      // avatar: Yup.mixed().nullable(), // Avatar can be null
    })
    .required("Doctor's information is required"),
  patient: Yup.object()
    .shape({
      uid: Yup.string().required("Patient's ID is required"),
      name: Yup.string().required("Patient's name is required"),
      avatar: Yup.string().required("Patient's avatar is required"),
      // avatar: Yup.mixed().nullable(), // Avatar can be null
    })
    .required("Patient's information is required"),
  // fullName: Yup.string()
  //   .trim()
  //   .min(2, "Full name is too short")
  //   .max(100, "Full name is too long")
  //   .required("Full name is required"),
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
  url: Yup.string().url("Invalid URL").nullable(),

  content: Yup.object()
    .required("Content is required")
    .test("notEmpty", "Content Can't be empty", isDeltaNotEmpty),

  // createdAt: Yup.date().required("Created date is required"),
  // updatedAt: Yup.date().required("Updated date is required"),
});
