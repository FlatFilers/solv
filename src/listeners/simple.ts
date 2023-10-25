import { FlatfileListener } from '@flatfile/listener'
import api from '@flatfile/api'
import { FlatfileRecord, recordHook } from '@flatfile/plugin-record-hook'
import {
  isValidEmail,
  isValidUSPhoneNumber,
  isValidISODate,
} from '../utils/validationUtils'

/**
 * Example Listener
 */
export const listener = FlatfileListener.create((listener) => {
  listener.on('**', (event) => {
    console.log(`Received event: ${event.topic}`)
  })

  function validateField(
    record: FlatfileRecord,
    fieldName: string,
    validator: (value: string) => boolean,
    errorMessage: string
  ) {
    const value = record.get(fieldName)
    if (value != null && (typeof value !== 'string' || !validator(value))) {
      record.addError(fieldName, errorMessage)
    }
  }

  listener.use(
    recordHook('PatientBill', (record) => {
      validateField(
        record,
        'patientEmail',
        isValidEmail,
        'Invalid patient email format. Please enter a valid email address, e.g., example@example.com'
      )
      validateField(
        record,
        'guarantorEmail',
        isValidEmail,
        'Invalid guarantor email format. Please enter a valid email address, e.g., example@example.com'
      )
      validateField(
        record,
        'patientPhoneNumber',
        isValidUSPhoneNumber,
        'Invalid patient phone number format. Please enter a valid US phone number, e.g., (123) 456-7890, 123-456-7890, or 1234567890'
      )
      validateField(
        record,
        'guarantorPhone',
        isValidUSPhoneNumber,
        'Invalid guarantor phone number format. Please enter a valid US phone number, e.g., (123) 456-7890, 123-456-7890, or 1234567890'
      )
      validateField(
        record,
        'serviceDate',
        isValidISODate,
        'Invalid service date format. Please enter a valid date in the ISO format (YYYY-MM-DD)'
      )
      validateField(
        record,
        'patientDateOfBirth',
        isValidISODate,
        'Invalid patient date of birth format. Please enter a valid date in the ISO format (YYYY-MM-DD)'
      )
      return record
    })
  )

  listener.filter({ job: 'workbook:submitActionFg' }, (configure) => {
    configure.on('job:ready', async ({ context: { jobId } }) => {
      try {
        await api.jobs.ack(jobId, {
          info: 'Getting started.',
          progress: 10,
        })

        console.log('Make changes here when an action is clicked')

        await api.jobs.complete(jobId, {
          outcome: {
            acknowledge: true,
            message: 'This is now complete.',
            next: {
              type: 'wait',
            },
          },
        })
      } catch (error) {
        console.error('Error:', error)

        await api.jobs.fail(jobId, {
          outcome: {
            message: 'This job encountered an error.',
          },
        })
      }
    })
  })
})
