// src/utils/date.ts
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
  // Deteksi date-only string "YYYY-MM-DD"
  const isDateOnlyString =
    typeof dateInput === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateInput);

  // Default pattern: tanpa waktu untuk date-only, dengan waktu untuk timestamp
  const fmt = pattern
    ? pattern
    : isDateOnlyString
    ? 'DD MMMM YYYY'
    : "DD MMMM YYYY"

  if (isDateOnlyString) {
    // Treat sebagai lokal date di Jakarta, tanpa adjust ke UTC
    return dayjs.tz(dateInput, 'Asia/Jakarta').format(fmt);
  } else {
    // Treat input sebagai UTC, lalu convert ke Jakarta
    return dayjs
      .utc(dateInput)
      .tz('Asia/Jakarta')
      .format(fmt);
  }
}