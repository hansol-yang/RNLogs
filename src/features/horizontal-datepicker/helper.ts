import { TDatePickerData } from './date-picker.context';

export type TDayPickerUsedData = { year: number; month: number };
export type TDate = { year: number; month: number; date: number };

export const KOR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const MIN_YEAR = 2013;

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
export const getDefaultDates = (minYear: number): [TDate[], number] => {
    const _now = getNow();
    const now = {
        year: _now.getFullYear(),
        month: _now.getMonth() + 1,
        date: _now.getDate(),
    };
    const dates: TDate[] = [];
    const yearRange = getRange(minYear, now.year);
    yearRange.forEach(year => {
        const sameYear = year === now.year;
        const monthRange = getRange(1, sameYear ? now.month : 12);
        monthRange.forEach(month => {
            const dateRange = getRange(1, getNumberOfDaysInMonth(year, month));
            dates.push(...dateRange.map(date => ({ year, month, date })));
        });
    });

    const idx = dates.findIndex(
        elem =>
            elem.year === now.year &&
            elem.month === now.month &&
            elem.date === now.date,
    );

    return [dates, idx];
};
export const isToday = (input: TDate): boolean => {
    const _now = getNow();
    const now = {
        year: _now.getFullYear(),
        month: _now.getMonth() + 1,
        date: _now.getDate(),
    };
    return (
        now.year === input.year &&
        now.month === input.month &&
        now.date === input.date
    );
};
export const getIdxOfFirstDate = (dates: TDate[], date: TDatePickerData) => {
    return dates.findIndex(
        elem =>
            date.year === elem.year &&
            date.month === elem.month &&
            elem.date === 1,
    );
};
