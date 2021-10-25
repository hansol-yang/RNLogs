export const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
export const N_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MAX_ROW_COL = 7;

export type CalendarActiveMonth = { year: number; month: number };
export type CalendarData = {
    year: number;
    month: number;
    date: number;
    fullString: string;
};
export type CalendarDayState = 'SELECTED' | 'DOTTED';

export const getKRNow = () => {
    const krOffset = 9 * 60 * 60 * 1000;
    return new Date(Date.now() + krOffset);
};

export const convertDateToCalendarData = (input: Date): CalendarData => {
    const year = input.getFullYear(),
        month = input.getMonth(),
        date = input.getDate();
    const fullString = `${year}-${month + 1}-${date}`;

    return {
        year,
        month,
        date,
        fullString,
    };
};

export const getNextCalendarActiveMonth = (
    input: CalendarActiveMonth,
): CalendarActiveMonth => {
    const { year, month } = input;

    let nextYear = year;
    let nextMonth = month + 1;

    if (nextMonth > 11) {
        nextYear += 1;
        nextMonth = 0;
    }

    return {
        year: nextYear,
        month: nextMonth,
    };
};
export const getPrevCalendarActiveMonth = (
    input: CalendarActiveMonth,
): CalendarActiveMonth => {
    const { year, month } = input;

    let nextYear = year;
    let nextMonth = month - 1;

    if (nextMonth < 0) {
        nextYear -= 1;
        nextMonth = 11;
    }

    return {
        year: nextYear,
        month: nextMonth,
    };
};

const toDigit = (input: number) => {
    return input >= 10 ? input : `0${input}`;
};

export const generateMatrix = (
    year: number,
    month: number,
): CalendarData[][] => {
    const matrix: CalendarData[][] = [];

    const firstDay = new Date(year, month, 1).getDay();

    let numberOfDays = N_DAYS[month];

    // 윤달 처리
    if (isLeapMonth(year, month)) {
        numberOfDays += 1;
    }

    let counter = 1;
    for (let row = 1; row < MAX_ROW_COL; row++) {
        matrix[row] = [];
        for (let col = 0; col < MAX_ROW_COL; col++) {
            matrix[row][col] = { year, month, date: -1, fullString: '' };
            if (row === 1 && col >= firstDay) {
                matrix[row][col] = {
                    year,
                    month,
                    date: counter,
                    fullString: `${year}-${month + 1}-${toDigit(counter)}`,
                };
                counter += 1;
            } else if (row > 1 && counter <= numberOfDays) {
                matrix[row][col] = {
                    year,
                    month,
                    date: counter,
                    fullString: `${year}-${month + 1}-${toDigit(counter)}`,
                };
                counter += 1;
            }
        }
    }

    return matrix;
};

export const isLeapMonth = (year: number, month: number) => {
    if (month !== 1) return false;

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const isToday = (date: Date, calendarData: CalendarData) => {
    return date.toISOString().substr(0, 10) === calendarData.fullString;
};
