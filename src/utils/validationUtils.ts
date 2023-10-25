/**
 * Validates the format of an email address.
 * @param email The email address to validate.
 * @returns True if the email address is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates the format of a US phone number.
 * @param phoneNumber The phone number to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export function isValidUSPhoneNumber(phoneNumber: string): boolean {
  const phoneNumberRegex =
    /^(?:\+1[-. ]?)?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/
  return phoneNumberRegex.test(phoneNumber)
}

/**
 * Validates if a string is in the ISO date format (YYYY-MM-DD).
 * @param date The date string to validate.
 * @returns True if the date is in the ISO format, false otherwise.
 */
export function isValidISODate(date: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
  return isoDateRegex.test(date)
}
