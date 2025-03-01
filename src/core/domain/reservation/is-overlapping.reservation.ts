export function isOverlapping(
  newHour: number,
  newDuration: number,
  existingHour: number,
  existingDuration: number,
): boolean {
  const newStart = newHour;
  const newEnd = newHour + newDuration;
  const existingStart = existingHour;
  const existingEnd = existingHour + existingDuration;
  return newStart < existingEnd && existingStart < newEnd;
}
