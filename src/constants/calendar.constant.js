const statusOptions = [
  { value: "confirmed", label: "Confirmed", color: "success" },
  { value: "pending", label: "Pending", color: "info" },
  { value: "canceled", label: "Canceled", color: "warning" },
  { value: "postponed", label: "Postponed", color: "error" },
];
const typeOptions = [
  { value: "consultation", label: "Consultation", color: "primary" },
  { value: "control", label: "Control", color: "secondary" },
  { value: "emergency", label: "Emergency", color: "warning" },
  { value: "etc", label: "Other", color: "info" },
];

const blankEvent = {
  title: "ppp",
  // start: "",
  // end: "",
  // allDay: false,
  // url: "",
  extendedProps: {
    type: "emergency",
    status: "postponed",

    patient: {
      uid: "2",
      name: "Jane Smith 111",
      avatar: "/images/200x200.png",
    },
  },
};

const detailEvents = [
  { label: "doctor", checked: true, isHidden: false },
  { label: "patient", checked: true, isHidden: false },
  { label: "status", checked: true, isHidden: false },
  { label: "type", checked: true, isHidden: false },
  { label: "start", checked: true, isHidden: false },
  { label: "end", checked: true, isHidden: false },
  { label: "title", checked: true, isHidden: false },
  { label: "content", checked: true, isHidden: false },
  { label: "eventId", checked: true, isHidden: false },
  { label: "stateIndicators", checked: true, isHidden: false },
];

const dayPartsOptions = [
  { label: "Morning", value: "morning", color: "primary" },
  { label: "Afternoon", value: "afternoon", color: "info" },
  { label: "Evening", value: "evening", color: "warning" },
];

const isFlexibleSchedule = false;
const allowSunday = true;
const allowSaturday = true;
const openingTime = "09:00";
const closingTime = "22:00";
const minuteIncrement = 15;

// Extract selectedEventViews
const selectedEventViews = detailEvents
  .filter((event) => event.checked && !event.isHidden)
  .map((event) => event.label);

// Extract selectedTypes
const selectedTypes = typeOptions.map((option) => option.value);

// Extract selectedStatuses
const selectedStatuses = statusOptions.map((option) => option.value);

// Extract selectedDayParts
const selectedDayParts = dayPartsOptions.map((option) => option.value);

export {
  statusOptions,
  typeOptions,
  blankEvent,
  detailEvents,
  minuteIncrement,
  selectedEventViews,
  selectedDayParts,
  selectedTypes,
  selectedStatuses,
  isFlexibleSchedule,
  dayPartsOptions,
  openingTime,
  closingTime,
  allowSaturday,
  allowSunday,
};
