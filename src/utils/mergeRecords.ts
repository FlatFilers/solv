import api, { Flatfile } from '@flatfile/api'

export class MergeRecords {
  private readonly sheetId: string
  private mergedRecord: Flatfile.RecordWithLinks | null = null
  private recordIdsToDelete: string[] = []

  constructor(sheetId: string) {
    this.sheetId = sheetId
  }

  public async mergeSelectedRecords(
    selectedRecords: Flatfile.RecordWithLinks[]
  ) {
    console.log(
      'Incoming selected records:',
      JSON.stringify(selectedRecords, null, 2)
    )

    if (selectedRecords.length === 0) {
      console.log('No records were selected for merging.')
      return
    }

    this.processAndMergeRecords(selectedRecords)
    await this.deleteMergedRecords()
    await this.updateMergedRecord()
  }

  private processAndMergeRecords(selectedRecords: Flatfile.RecordWithLinks[]) {
    for (const record of selectedRecords) {
      if (!this.mergedRecord) {
        this.mergedRecord = record
        continue
      }
      this.recordIdsToDelete.push(record.id)
      this.mergedRecord.values = this.mergeValues(
        this.mergedRecord.values,
        record.values
      )
    }
  }

  private mergeValues(
    oldValues: Flatfile.RecordDataWithLinks,
    newValues: Flatfile.RecordDataWithLinks
  ): Flatfile.RecordDataWithLinks {
    return Object.entries(newValues).reduce(
      (merged, [key, val]) => {
        if (key === 'updatedAt') {
          merged[key] =
            typeof val.value === 'object' ? val : { value: val.value }
          return merged
        }

        const newValue = val.value === '' ? null : val.value

        // Only update the field if the new value is not null
        if (newValue !== null) {
          merged[key] = { value: newValue }
        }

        return merged
      },
      { ...oldValues }
    )
  }

  private async deleteMergedRecords() {
    if (this.recordIdsToDelete.length > 0) {
      await api.records.delete(this.sheetId, { ids: this.recordIdsToDelete })
    }
  }

  private async updateMergedRecord() {
    if (this.mergedRecord) {
      const updatedValues = { ...this.mergedRecord.values }
      Object.keys(updatedValues).forEach((key) => {
        if ('updatedAt' in updatedValues[key]) {
          delete updatedValues[key].updatedAt
        }
      })

      console.log(
        'Merged Record before updating:',
        JSON.stringify(this.mergedRecord, null, 2)
      )

      await api.records.update(this.sheetId, [
        {
          id: this.mergedRecord.id,
          values: updatedValues,
        },
      ])
    }
  }
}
