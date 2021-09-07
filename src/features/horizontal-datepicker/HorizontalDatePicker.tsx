import React, { useState } from 'react';
import styled from 'styled-components/native';
import DatePickerContext, { TDatePickerData } from './date-picker.context';
import DayPicker from './DayPicker';
import { getNow } from './helper';
import MonthPicker from './MonthPicker';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <HorizontalDatePicker/> =========================================================== */
const Wrapper = styled.View`
    width: 100%;
    flex-direction: row;
    /* background-color: red; */
`;
export default function HorizontalDatePicker() {
    const now = getNow();
    const [date, setDate] = useState<TDatePickerData>({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        needToScroll: false,
    });

    return (
        <DatePickerContext.Provider value={{ date, setDate }}>
            <Wrapper>
                <MonthPicker />
                <DayPicker minYear={2013} />
            </Wrapper>
        </DatePickerContext.Provider>
    );
}
HorizontalDatePicker.defaultProps = {};
