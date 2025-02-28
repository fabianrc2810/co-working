export class InvalidHotDeskNumberError extends Error {
  static withInvalidHotDeskNumber(number: number): InvalidHotDeskNumberError {
    return new InvalidHotDeskNumberError(
      `HotDesk number must be a valid positive integer: '${number}'.`,
    );
  }
}
