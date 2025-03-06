/**
 * Generates time slots between opening and closing times, respecting the minute increment and day constraints.
 *
 * @param {Date} date - The date for which to generate time slots.
 * @param {string} openingTime - The opening time in 'HH:MM' format.
 * @param {string} closingTime - The closing time in 'HH:MM' format.
 * @param {number} minuteIncrement - The interval in minutes between time slots (default: 15).
 * @param {boolean} saturday - Whether Saturday is enabled (default: false).
 * @param {boolean} sunday - Whether Sunday is enabled (default: false).
 * @returns {Array} - An array of time slot objects with `value`, `label`, and `description`.
 */
const generateTimeSlots = (
  date,
  openingTime,
  closingTime,
  minuteIncrement = 15,
  saturday = false,
  sunday = false,
) => {
  // Validate inputs
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError("date must be a valid Date object.");
  }

  if (
    typeof openingTime !== "string" ||
    typeof closingTime !== "string" ||
    !openingTime.match(/^\d{2}:\d{2}$/) ||
    !closingTime.match(/^\d{2}:\d{2}$/)
  ) {
    throw new TypeError(
      "openingTime and closingTime must be strings in 'HH:MM' format.",
    );
  }

  if (typeof minuteIncrement !== "number" || minuteIncrement <= 0) {
    throw new TypeError("minuteIncrement must be a positive number.");
  }

  // Block disabled days
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  if ((dayOfWeek === 6 && !saturday) || (dayOfWeek === 0 && !sunday)) {
    return [];
  }

  // Parse opening and closing times
  const [openingHour, openingMinute] = openingTime.split(":").map(Number);
  const [closingHour, closingMinute] = closingTime.split(":").map(Number);

  // Adjust start time if the date is today
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  let startHour, startMinute;

  if (isToday) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Round up to the nearest minuteIncrement
    const nextInterval =
      Math.ceil(currentMinute / minuteIncrement) * minuteIncrement;

    if (nextInterval === 60) {
      startHour = currentHour + 1;
      startMinute = 0;
    } else {
      startHour = currentHour;
      startMinute = nextInterval;
    }

    // Ensure the adjusted start time is not before the opening time
    if (
      startHour < openingHour ||
      (startHour === openingHour && startMinute < openingMinute)
    ) {
      startHour = openingHour;
      startMinute = openingMinute;
    }
  } else {
    startHour = openingHour;
    startMinute = openingMinute;
  }

  // Create start and end time Date objects
  const startTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHour,
    startMinute,
    0,
  );
  const endTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    closingHour,
    closingMinute,
    0,
  );

  // Generate time slots
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime <= endTime) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const timeLabel = `${formattedHours}:${formattedMinutes} ${ampm}`;

    timeSlots.push({
      value: currentTime.toISOString(), // Store the full ISO string for uniqueness
      label: timeLabel, // Display in 12-hour format
      description: `Available at ${timeLabel} on ${date.toDateString()}`,
    });

    // Increment the current time by the minuteIncrement
    currentTime.setMinutes(currentTime.getMinutes() + minuteIncrement);
  }

  return timeSlots;
};

export default generateTimeSlots
// // Example usage
// const date = new Date();
// const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
// const date = new Date(); // Use current date
// const openingTime = "09:00";
// const closingTime = "17:00";
// const minuteIncrement = 15;
// const allowSaturday = false;
// const allowSunday = true;

// const timeSlots = generateTimeSlots(
//   date,
//   openingTime,
//   closingTime,
//   minuteIncrement,
//   allowSaturday,
//   allowSunday,
// );
// console.log(timeSlots);
