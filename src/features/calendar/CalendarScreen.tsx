import React, { useState } from 'react';
import { View } from 'react-native';
import Calendar from './Calendar';
import {
    CalendarData,
    CalendarDayState,
    convertDateToCalendarData,
    getKRNow,
} from './helper';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};

/* <CalendarScreen/> =========================================================== */
export default function CalendarScreen() {
    const [selected, setSelected] = useState<CalendarData>(
        convertDateToCalendarData(getKRNow()),
    );

    const reports = ['2021-10-10', '2021-10-25'];

    const getDayStates = () => {
        const states: Record<string, CalendarDayState[]> =
            selected === undefined
                ? {}
                : { [selected.fullString]: ['SELECTED'] };
        reports.forEach(elem => {
            states[elem] = ['DOTTED'];
            if (selected?.fullString === elem) {
                states[elem].push('SELECTED');
            }
        });
        return states;
    };

    const dayStates = getDayStates();

    return (
        <View>
            <Calendar dayStates={dayStates} onPressDay={setSelected} />
        </View>
    );
}
CalendarScreen.defaultProps = {};
