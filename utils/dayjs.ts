import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;

export const parseDateString = (datestring: string) => dayjs(datestring);
export const sanitizeBookingDate = (date: Date) => dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate();
export const calculateDayDifference = (startDate: string | Date, endDate: string | Date) => {
	const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
	const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
	return dayjs(formattedEndDate).diff(dayjs(formattedStartDate), 'day');
};
export const subtractDays = (date: Date, days: number) => dayjs(date).subtract(days, 'days').toDate();
export const addMinutes = (date: Date, minutes: number) => dayjs(date).add(minutes, 'minutes').toDate();
export const formatDatabaseTime = (date: Date) => {
	return date.toTimeString().split(' ')[0];
};
export const formatBookingDate = (date: string, checkInOutTime: Date, tz: string) => {
	const time = formatDatabaseTime(checkInOutTime);
	return dayjs(`${date}T${time}`).tz(tz).toDate();
};
export const getLocalizedDate = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const isValidDateFormat = (date: string) => dayjs(date, 'YYYY-MM-DD').isValid();
export const formattedDate = (date: string) => {
	return dayjs(date).format('MMM DD, YYYY');
};
export const getCalendarFromTo = () => {
	const currentDate = dayjs();
	const from = currentDate.format('YYYY-MM-DD');
	const to = currentDate.add(6, 'months').format('YYYY-MM-DD');
	return { from, to };
};
