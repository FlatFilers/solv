import { FlatfileRecord } from '@flatfile/plugin-record-hook'

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

/**
 * Validates a field based on a provided validation function.
 * @param record The record being validated.
 * @param fieldName The name of the field to validate.
 * @param validator A function that takes a string and returns a boolean.
 * @param errorMessage The error message to show if validation fails.
 */
export function validateField(
  record: FlatfileRecord,
  fieldName: string,
  validator: (value: string) => boolean,
  errorMessage: string
): void {
  const value = record.get(fieldName)
  if (value != null && (typeof value !== 'string' || !validator(value))) {
    record.addError(fieldName, errorMessage)
  }
}
