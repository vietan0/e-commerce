import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi';

const dayjsExt = dayjs;

dayjs.locale('vi');
dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);

export { dayjsExt };
