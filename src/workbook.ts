import { Flatfile } from '@flatfile/api'

export const workbook: Pick<
  Flatfile.CreateWorkbookConfig,
  'name' | 'labels' | 'sheets' | 'actions'
> = {
  name: 'Patient Bill',
  labels: ['pinned'],
  sheets: [
    {
      name: 'Patient Bill',
      slug: 'PatientBill',
      fields: [
        // Patient Fields

        {
          key: 'patientFirstName',
          type: 'string',
          label: 'Patient First Name',
          constraints: [
            {
              type: 'required',
            },
          ],
        },
        {
          key: 'patientLastName',
          type: 'string',
          label: 'Patient Last Name',
          constraints: [
            {
              type: 'required',
            },
          ],
        },

        // Does this need a validation?

        {
          key: 'patientEmrId',
          type: 'string',
          label: 'Patient EMR ID',
        },

        // Add US Phone Validation

        {
          key: 'patientPhoneNumber',
          type: 'string',
          label: 'Patient Phone Number',
        },

        // Add Email Validation

        {
          key: 'patientEmail',
          type: 'string',
          label: 'Patient Email',
        },

        // Add ISO Date Validation

        {
          key: 'patientDateOfBirth',
          type: 'date',
          label: 'Patient Date of Birth',
          constraints: [
            {
              type: 'required',
            },
          ],
        },

        // Guarantor Fields

        {
          key: 'guarantorFirstName',
          type: 'string',
          label: 'Guarantor First Name',
        },

        {
          key: 'guarantorLastName',
          type: 'string',
          label: 'Guarantor Last Name',
        },

        // Add US Phone Validation

        {
          key: 'guarantorPhone',
          type: 'string',
          label: 'Guarantor Phone',
        },

        // Add Email Validation

        {
          key: 'guarantorEmail',
          type: 'string',
          label: 'Guarantor Email',
        },

        {
          key: 'visitEmrId',
          type: 'string',
          label: 'Visit EMR ID',
        },

        // Add ISO Date Validation

        {
          key: 'serviceDate',
          type: 'date',
          label: 'Service Date',
          constraints: [
            {
              type: 'required',
            },
          ],
        },

        // // Does this need a validation?

        {
          key: 'pendingBalance',
          type: 'string',
          label: 'Pending Balance',
        },
      ],
      actions: [
        {
          operation: 'dedupe-email',
          mode: 'background',
          label: 'Remove Duplicate Records',
          description:
            'This action will remove duplicate records based on the values in the Patient Email field and keep the latest record',
          tooltip:
            'This action will remove duplicate records based on the values in the Patient Email field and keep the latest record',
          confirm: true,
          primary: true,
        },
        {
          operation: 'mergeSelectedRecords',
          tooltip:
            'Merge multiple selected records into a single record. The process prioritizes newer, non-empty values and combines them into a primary record. The original merged records are then deleted, leaving only the combined record.',
          requireSelection: true,
          mode: 'foreground',
          label: 'Merge Selected Records',
          description: 'This will merge selected records together.',
          primary: true,
          confirm: true,
          inputForm: {
            type: 'simple',
            fields: [
              {
                key: 'First Name',
                label: 'Enter First Name',
                type: 'string',
                description:
                  'Enter the first name to be kept on the merged record.',
              },
            ],
          },
        },
      ],
    },
  ],
  actions: [
    {
      operation: 'submitActionFg',
      mode: 'foreground',
      label: 'Submit Data to Solv',
      description:
        'This action submits all of the data in the workbook to Solv.  Once the process completes you will be able to view the data in Solv.',
      primary: true,
      tooltip: 'Submit data to Solv',
      confirm: true,
    },
  ],
}
