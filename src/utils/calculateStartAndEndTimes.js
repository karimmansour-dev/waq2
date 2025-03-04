/**
 * Calculates the start and end times based on the current time and a specified minute increment.
 *
 * @param {Date} dropDate - The date on which the event is dropped.
 * @param {number} minuteIncrement - The interval in minutes to round the time to.
 * @returns {Object} - An object containing the start and end times as Date objects.
 */
export function calculateStartAndEndTimes(dropDate, minuteIncrement) {
  if (!(dropDate instanceof Date) || isNaN(dropDate.getTime())) {
    throw new TypeError("dropDate must be a valid Date object.");
  }

  if (typeof minuteIncrement !== "number" || minuteIncrement <= 0) {
    throw new TypeError("minuteIncrement must be a positive number.");
  }

  // Extract hours and minutes from the dropDate
  const dropHours = dropDate.getHours();
  const dropMinutes = dropDate.getMinutes();

  // Calculate the next interval based on the dropDate's minutes
  let nextInterval = Math.ceil(dropMinutes / minuteIncrement) * minuteIncrement;

  // Handle case where nextInterval is 60 (roll over to next hour)
  if (nextInterval === 60) {
    // now.setHours(now.getHours() + 1);
    dropDate.setHours(dropHours + 1); // Increment the hour
    nextInterval = 0;
  }

  // Set the start time to the dropDate with adjusted minutes
  const start = new Date(dropDate);
  start.setMinutes(nextInterval, 0, 0); // Reset seconds and milliseconds to 0

  // Calculate the end time by adding the minuteIncrement
  const end = new Date(start.getTime() + minuteIncrement * 60 * 1000);

  return { start, end };
}
