import { statusOptions, typeOptions } from "constants/calendar.constant";
import dayjs from "dayjs";

/**
 * Creates a container for event details.
 * @returns {HTMLDivElement} - The details container element.
 */
function createDetailsContainer() {
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("flex", "flex-col", "gap-1", "text-sm");
  return detailsContainer;
}

/**
 * Creates an element for the event title.
 * @param {string} title - The event title.
 * @returns {HTMLDivElement} - The title element.
 */
function createTitleElement(title) {
  const titleEl = document.createElement("div");
  titleEl.innerText = title;
  titleEl.classList.add("font-medium");
  return titleEl;
}

/**
 * Creates an element for the event time range.
 * @param {string} startTime - The formatted start time.
 * @param {string} endTime - The formatted end time.
 * @returns {HTMLDivElement} - The time element.
 */
function createTimeElement(startTime, endTime) {
  const timeEl = document.createElement("div");
  timeEl.innerText = `${startTime} - ${endTime}`;
  timeEl.classList.add("text-xs", "text-gray-200");
  return timeEl;
}

/**
 * Creates an element for the patient details.
 * @param {Object} patient - The patient object (contains name and avatar).
 * @returns {HTMLDivElement} - The patient container element.
 */
function createPatientElement(patient) {
  const patientContainer = document.createElement("div");
  patientContainer.classList.add("flex", "items-center", "gap-2", "mt-1");

  if (patient.avatar) {
    const avatarEl = document.createElement("img");
    avatarEl.src = patient.avatar;
    avatarEl.alt = "Patient Avatar";
    avatarEl.classList.add("h-6", "w-6", "rounded-full");
    patientContainer.appendChild(avatarEl);
  }

  const patientNameEl = document.createElement("div");
  patientNameEl.innerText = patient.name;
  patientNameEl.classList.add("text-xs", "text-gray-200");
  patientContainer.appendChild(patientNameEl);

  return patientContainer;
}

/**
 * Creates an element for the event type or status.
 * @param {string} text - The type or status text.
 * @param {string} color - The background color for the element.
 * @returns {HTMLDivElement} - The type or status element.
 */
function createTypeStatusElement(text, color) {
  const element = document.createElement("div");
  element.innerText = text;
  element.classList.add(
    "px-2",
    "py-1",
    "rounded",
    "bg-opacity-50",
    "text-xs",
    "bg-this",
    `this:${color}`,
  );
  return element;
}

/**
 * Renders event details when the event is mounted.
 * @param {Object} eventInfo - The event information object.
 * @param {Array} selectedEventViews - The list of event views to display.
 */
function renderEventDidMount(eventInfo, selectedEventViews) {
  const { event } = eventInfo;

  // Create a container for event details
  const detailsContainer = createDetailsContainer();

  // Add title (if "title" is in selectedEventViews)
  if (selectedEventViews.includes("title")) {
    detailsContainer.appendChild(createTitleElement(event.title));
  }

  // Add start and end time (if "start" or "end" is in selectedEventViews)
  if (
    selectedEventViews.includes("start") ||
    selectedEventViews.includes("end")
  ) {
    const startTime = event.start ? dayjs(event.start).format("h:mm A") : "N/A";
    const endTime = event.end ? dayjs(event.end).format("h:mm A") : "N/A";
    detailsContainer.appendChild(createTimeElement(startTime, endTime));
  }

  // Add patient name and avatar (if "patient" is in selectedEventViews)
  if (selectedEventViews.includes("patient") && event.extendedProps.patient) {
    detailsContainer.appendChild(
      createPatientElement(event.extendedProps.patient),
    );
  }

  // Add type and status (if "type" or "status" is in selectedEventViews)
  if (
    selectedEventViews.includes("type") ||
    selectedEventViews.includes("status")
  ) {
    const { type, status } = event.extendedProps;

    const typeColor = typeOptions.find(
      (option) => option.value === type,
    )?.color;
    const statusColor = statusOptions.find(
      (option) => option.value === status,
    )?.color;

    const typeStatusContainer = document.createElement("div");
    typeStatusContainer.classList.add("flex", "flex-col", "gap-2", "mt-1");

    if (selectedEventViews.includes("type")) {
      typeStatusContainer.appendChild(createTypeStatusElement(type, typeColor));
    }

    if (selectedEventViews.includes("status")) {
      typeStatusContainer.appendChild(
        createTypeStatusElement(status, statusColor),
      );
    }

    detailsContainer.appendChild(typeStatusContainer);
  }

  // Append the container to the event element
  eventInfo.el.appendChild(detailsContainer);
}

export default renderEventDidMount;
