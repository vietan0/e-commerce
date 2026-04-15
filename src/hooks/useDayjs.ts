import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useLocale } from 'next-intl';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';

/**
 * Hook `dayjs` with locale defined by `next-intl`.
 * Use in client only.
 */
export default function useDayjs() {
  const locale = useLocale();
  dayjs.locale(locale.slice(0, 2)); // get 'vi' out of 'vi-VN'
  dayjs.extend(isSameOrBefore);
  dayjs.extend(localizedFormat);

  return dayjs;
}
