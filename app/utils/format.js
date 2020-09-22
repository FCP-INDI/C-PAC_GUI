import { Set } from 'immutable'

const isInSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()

export default function format(timestamp, customStyle = {}) {
  const now = new Date()
  const date = new Date(timestamp)
  const style = {
    dateStyle: isInSameDay(now, date) ? undefined : 'short',
    timeStyle: 'short'
  }
  const fmt = new Intl.DateTimeFormat(undefined, { ...style, ...customStyle })
  return fmt.format(date)
}
