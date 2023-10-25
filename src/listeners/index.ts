import { FlatfileListener } from '@flatfile/listener'
import { dedupePlugin } from '@flatfile/plugin-dedupe'

/**
 * This default export is used by Flatfile to register event handlers for any
 * event that occurs within the Flatfile Platform.
 *
 * @param listener
 */
export default function (listener: FlatfileListener) {
  listener.on('**', (event) => {
    console.log(
      `-> My event listener received an event: ${JSON.stringify(event)}`
    )
  })

  listener.use(
    dedupePlugin('dedupe-email', {
      on: 'patientEmail',
      keep: 'last',
    })
  )
}
