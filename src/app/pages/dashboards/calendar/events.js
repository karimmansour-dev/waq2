// Vars
const date = new Date();
const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);

const nextMonth =
  date.getMonth() === 11
    ? new Date(date.getFullYear() + 1, 0, 1)
    : new Date(date.getFullYear(), date.getMonth() + 1, 1);

const prevMonth =
  date.getMonth() === 11
    ? new Date(date.getFullYear() - 1, 0, 1)
    : new Date(date.getFullYear(), date.getMonth() - 1, 1);

  
export const events = [
  {
    id: "1",
    url: "",
    title: "Design Review",
    start: date,
    end: nextDay,
    allDay: false,
    extendedProps: {
      type: "consultation",
      status: "confirmed",
    },
  },
  {
    id: "2",
    url: "",
    title: "Meeting With Client",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      type: "emergency",
      status: "pending",
    },
  },
  {
    id: "3",
    url: "",
    title: "Family Trip",
    allDay: true,
    start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    extendedProps: {
      type: "control",
      status: "canceled",
    },
  },
  {
    id: "4",
    url: "",
    title: "Doctor's Appointment",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      type: "consultation",
      status: "postponed",
    },
  },
  {
    id: "5",
    url: "",
    title: "Dart Game?",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      type: "etc",
      status: "confirmed",
    },
  },
  {
    id: "6",
    url: "",
    title: "Meditation",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      type: "control",
      status: "pending",
    },
  },
  {
    id: "7",
    url: "",
    title: "Dinner",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      type: "consultation",
      status: "canceled",
    },
  },
  {
    id: "8",
    url: "",
    title: "Product Review",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      type: "emergency",
      status: "postponed",
    },
  },
  {
    id: "9",
    url: "",
    title: "Monthly Meeting",
    start: nextMonth,
    end: nextMonth,
    allDay: true,
    extendedProps: {
      type: "control",
      status: "confirmed",
    },
  },
  {
    id: "10",
    url: "",
    title: "Monthly Checkup",
    start: prevMonth,
    end: prevMonth,
    allDay: true,
    extendedProps: {
      type: "etc",
      status: "pending",
    },
  },
];
