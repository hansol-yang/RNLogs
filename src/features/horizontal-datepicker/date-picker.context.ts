import { createContext } from 'react';

export type TDatePickerData = {
    year: number;
    month: number;
    needToScroll: boolean;
};
type TDatePickerContext = {
    date: TDatePickerData;
    setDate: (next: TDatePickerData) => void;
};
const DatePickerContext = createContext<TDatePickerContext>({
    date: { year: 0, month: 0, needToScroll: false },
    setDate: () => {},
});
export default DatePickerContext;
