/**
 * Adjusts the selected minutes in a flatpickr instance to the nearest increment.
 *
 * @param {Date[]} _selectedDates - The selected dates from flatpickr.
 * @param {string} dateString - The selected date as a string.
 * @param {Object} flatpickrInstance - The flatpickr instance.
 */
export function adjustFlatpickrMinutes(_selectedDates, dateString, flatpickrInstance) {
  const minuteIncrement = flatpickrInstance.config.minuteIncrement;

  // Ensure minuteIncrement is valid
  if (!minuteIncrement || minuteIncrement <= 0) {
    console.warn("minuteIncrement is not defined or invalid.");
    return;
  }

  const selectedMinutes = Number(flatpickrInstance.minuteElement.value);

  // Ensure selectedMinutes is a valid number
  if (isNaN(selectedMinutes)) {
    console.warn("Selected minutes is not a valid number.");
    return;
  }

  console.log("selectedMinutes:", selectedMinutes);
  console.log("minuteIncrement:", minuteIncrement);

  const remainder = selectedMinutes % minuteIncrement;
  console.log("remainder:", remainder);

  // Do nothing if the selected minutes already align with the increment
  if (remainder === 0) return;

  // Calculate the quotient for the nearest increment
  let quotient = Math.floor(selectedMinutes / minuteIncrement);
  console.log("quotient:", quotient);

  console.log("remainder / minuteIncrement:", remainder / minuteIncrement);
  console.log("quotient * minuteIncrement:", quotient * minuteIncrement);
  console.log("(quotient + 1) * minuteIncrement:", (quotient + 1) * minuteIncrement);

  // Round up to the nearest increment if the remainder is more than half of the increment
  if (remainder / minuteIncrement > 0.5) {
    quotient++;
  }

  // Update the minutes to the nearest increment
  const adjustedMinutes = quotient * minuteIncrement;
  flatpickrInstance.minuteElement.value = adjustedMinutes;

  // Set the date with the updated minutes
  const adjustedDate = new Date(flatpickrInstance.parseDate(dateString));
  adjustedDate.setMinutes(adjustedMinutes);
  flatpickrInstance.setDate(adjustedDate);
}