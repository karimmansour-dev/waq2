/**
 * Adjusts the selected minutes in a flatpickr instance to the nearest increment.
 *
 * @param {Date[]} _selectedDates - The selected dates from flatpickr.
 * @param {string} dateString - The selected date as a string.
 * @param {Object} flatpickrInstance - The flatpickr instance.
 * @returns {Date|undefined} The adjusted date or undefined if no adjustment is made.
 */
export function adjustFlatpickrMinutes(
  _selectedDates,
  dateString,
  flatpickrInstance,
) {
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

  // Do nothing if the selected minutes already align with the increment
  if (selectedMinutes % minuteIncrement === 0) {
    return new Date(flatpickrInstance.parseDate(dateString));
  }

  // Calculate the nearest increment
  const remainder = selectedMinutes % minuteIncrement;
  let quotient = Math.floor(selectedMinutes / minuteIncrement);

  // Round up to the nearest increment if the remainder is more than half of the increment
  if (remainder / minuteIncrement > 0.5) {
    quotient++;
  }

  // Update the minutes to the nearest increment
  let adjustedMinutes = quotient * minuteIncrement;
  //flatpickrInstance.minuteElement.value = adjustedMinutes;

  // // Handle case where adjustedMinutes exceeds 59
  // if (adjustedMinutes === 60) {
  //   adjustedMinutes = 0; // Reset to 0 and increment the hour
  // }

  // Set the date with the updated minutes
  const adjustedDate = new Date(flatpickrInstance.parseDate(dateString));
  adjustedDate.setMinutes(adjustedMinutes);

  // Update the flatpickr instance with the adjusted date
  flatpickrInstance.setDate(adjustedDate);

  return adjustedDate;
}
