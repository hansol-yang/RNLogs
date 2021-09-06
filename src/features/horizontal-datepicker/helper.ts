export type TDayPickerUsedData = { year: number; month: number };
export type TDate = { year: number; month: number; date: number };

export const KOR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const getNow = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    return new Date(utc + KOR_TIME_DIFF);
};
export const getRange = (start: number, end: number) => {
    return new Array(end - start + 1).fill(0).map((_, idx) => start + idx);
};
export const getNumberOfDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};
export const getPrevYearAndMonth = (_year: number, _month: number) => {
    const startOfYear = _month === 1;
    let year = startOfYear ? _year - 1 : _year;
    let month = startOfYear ? 12 : _month - 1;
    return {
        year,
        month,
    };
};
export const getNextYearAndMonth = (_year: number, _month: number) => {
    const endOfYear = _month === 12;
    let year = endOfYear ? _year + 1 : _year;
    let month = endOfYear ? 1 : _month + 1;
    return {
        year,
        month,
    };
};
export const getDates = (year: number, month: number): TDate[] => {
    const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month);
    const range = getRange(1, numberOfDaysInMonth);
    return range.map(date => ({ year, month, date }));
};
