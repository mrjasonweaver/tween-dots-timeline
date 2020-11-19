export const ONE_SECOND = 1000;
export const FRAME_RATE = 60;
export const RANGE_PERCENTAGE = 98.5;
export const TICK_RATE = ONE_SECOND / FRAME_RATE;

export const getComputedPerentage = (timer, nextDate, currentRange) => {
  const startWidth = (RANGE_PERCENTAGE / 5) * (currentRange - 1);
  const percentage = (((FRAME_RATE - (nextDate - timer)) / FRAME_RATE) * RANGE_PERCENTAGE) / 5;
  if (currentRange == 6) {
    return RANGE_PERCENTAGE;
  } else {
    return startWidth + percentage;
  }
}
