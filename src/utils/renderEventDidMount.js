/* eslint-disable no-unused-vars */
// Import Dependencies
import { statusOptions, typeOptions } from "constants/calendar.constant";
import dayjs from "dayjs";
import { colorFromText } from "utils/colorFromText";

// Helper Functions
function createElement(tag, className = "", textContent = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

function createAvatar({ src, name, size = 12, initialColor = "neutral" }) {
  const avatar = createElement("div", "avatar relative inline-flex shrink-0");
  avatar.style.height = `${size / 4}rem`;
  avatar.style.width = `${size / 4}rem`;

  if (src) {
    const img = createElement(
      "img",
      "avatar-image avatar-display relative h-full w-full rounded-full",
    );
    img.src = src;
    img.alt = name || "avatar";
    avatar.appendChild(img);
  } else if (name) {
    const initialContainer = createElement(
      "div",
      "avatar-initial avatar-display flex h-full w-full select-none items-center justify-center font-medium uppercase",
    );
    const color = initialColor === "auto" ? colorFromText(name) : initialColor;

    initialContainer.classList.add(`this:${color}`);
    initialContainer.classList.add(`bg-this-darker`);
    initialContainer.textContent = name
      .match(/\b(\w)/g)
      .slice(0, 2)
      .join("");
    avatar.appendChild(initialContainer);
  }

  return avatar;
}

function createButton({
  color,
  variant,
  isIcon,
  onClick,
  children,
  disabled,
  isGlow,
  className,
  tooltipContent,
  tooltipVariant,
}) {
  const button = createElement("button");
  button.addEventListener("click", onClick);

  if (isIcon) {
    button.classList.add("shrink-0", "p-0");
  }

  // if (color && variant) {
  //   button.classList.add(`bg-${color}`, `text-${color}-contrast`);
  // }

  if (isGlow) {
    button.classList.add("shadow-lg", `shadow-${color}/50`);
  }

  if (disabled) {
    button.disabled = true;
    button.setAttribute("data-disabled", "true");
  }

  if (className) {
    button.classList.add(...className.split(" "));
  }

  // Add tooltip attributes if provided
  if (tooltipContent) {
    button.setAttribute("data-tooltip", "");
    button.setAttribute("data-tooltip-content", tooltipContent);
  }

  if (tooltipVariant) {
    button.setAttribute("data-tooltip-variant", tooltipVariant);
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => button.appendChild(child));
    } else {
      button.appendChild(children);
    }
  }

  return button;
}

function createCard({ skin = "none", className = "", children, typeColor }) {
  const card = createElement(  
    "div",
    `relative !p-1 this:${typeColor} bg-this-lighter rounded-lg w-full h-full flex items-center justify-between content-center flex-wrap overflow-hidden`, ///
  );

  if (!skin === "bordered") {
    card.classList.add(
      "border",
      "border-gray-200",
      "dark:border-dark-600",
      "print:border-0",
    );
  } else if (skin === "shadow") {
    card.classList.add(
      "shadow-soft",
      "dark:bg-dark-700",
      "dark:shadow-none",
      "print:shadow-none",
    );
  }

  if (className) {
    card.classList.add(...className.split(" "));
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => card.appendChild(child));
    } else {
      card.appendChild(children);
    }
  }

  return card;
}

function createEventCard(eventInfo) {
  const { event } = eventInfo;
  const {
    title,
    start,
    end,
    extendedProps: { type, status, patient },
  } = event;

  // Format start time and duration
  const formattedStart = dayjs(start).format("ddd, D MMMM HH:mm");
  const durationInMinutes = dayjs(end).diff(dayjs(start), "minute");

  const typeColor = typeOptions.find((option) => option.value === type)?.color;
  // const statusColor = statusOptions.find(
  //   (option) => option.value === status,
  // )?.color;

  // Create card container
  const card = createCard({ skin: "shadow", typeColor, className: "p-4" }); ///space-y-4

  // Patient Info Section
  const patientInfo = createElement(
    "div",
    "flex items-center justify-center content-center flex-wrap gap-2",
  );
  const avatar = createAvatar({
    // src: patient.avatar,
    name: patient.name,
    size: 10,
    initialColor: "auto",
  });
  const patientDetails = createElement("div");
  const patientName = createElement(
    "h3",
    "truncate font-medium text-gray-800",
    patient.name,
  );
  const patientUid = createElement(
    "p",
    "mt-0.5 text-xs text-gray-400",
    patient.uid,
  );

  patientDetails.appendChild(patientName);
  patientDetails.appendChild(patientUid);
  patientInfo.appendChild(avatar);
  patientInfo.appendChild(patientDetails);

  // Time and Duration Section
  const timeContainer = createElement(
    "div",
    "flex flex-col items-start justify-center whitespace-normal", ///
  );
  const startTime = createElement("p", "", formattedStart);
  const duration = createElement(
    "p",
    "text-md font-medium text-gray-800",
    `${durationInMinutes || 0} mins`,
  );

  timeContainer.appendChild(startTime);
  timeContainer.appendChild(duration);

  // Buttons Section
  const buttonsContainer = createElement("div", "flex gap-2");
  //const leftButtons = createElement("div", "flex gap-2");

  const confirmButton = createButton({
    children: createElement("span", "", "✔️"),
    tooltipContent: type,
    tooltipVariant: "warning",
  });

  const cancelButton = createButton({
    children: createElement("span", "", "❌"),
    tooltipContent: status,
    tooltipVariant: "info",
  });

  buttonsContainer.appendChild(confirmButton);
  buttonsContainer.appendChild(cancelButton);
  //buttonsContainer.appendChild(leftButtons);

  // Assemble Card
  card.appendChild(patientInfo);
  card.appendChild(timeContainer);
  card.appendChild(buttonsContainer);

  return card;
}

// Export the EventCard function
export default function renderEventDidMount(eventInfo) {
  //eventInfo.el.innerHTML = "";
  const card = createEventCard(eventInfo);
  eventInfo.el.appendChild(card);
}
