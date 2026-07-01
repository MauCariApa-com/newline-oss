import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('id');

export function formatJakarta(
  dateInput: string | Date,
  pattern?: string
) {
  const isDateOnlyString =
    typeof dateInput === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateInput);

  const fmt = pattern
    ? pattern
    : isDateOnlyString
    ? 'DD MMMM YYYY'
    : "DD MMMM YYYY"

  if (isDateOnlyString) {
    return dayjs.tz(dateInput, 'Asia/Jakarta').format(fmt);
  } else {
    return dayjs
      .utc(dateInput)
      .tz('Asia/Jakarta')
      .format(fmt);
  }
}