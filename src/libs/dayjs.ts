import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')


export function changeTime(time: string | Date) {
  return dayjs(time).fromNow()
}

export function formatTime(time: string | Date, format = 'YYYY.MM.DD h:mm A') {
  return dayjs(time).format(format)
}

