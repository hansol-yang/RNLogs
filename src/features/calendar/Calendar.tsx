import React, { useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Picture from '../../common/Picture';
import {
    CalendarActiveMonth,
    CalendarData,
    CalendarDayState,
    generateMatrix,
    getKRNow,
    getNextCalendarActiveMonth,
    getPrevCalendarActiveMonth,
    isToday,
    WEEK_DAYS,
} from './helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* Constants =========================================================== */
const STATE_BLUE = 'rgb(70, 126, 249)';
const HEADER_HEIGHT = 37,
    DAY_HEADER_HEIGHT = 23,
    ROW_HEIGHT = 40;
/* Prop =========================================================== */
type Prop = {
    dayStates?: Record<string, CalendarDayState[]>;
    onPressDay?: (data: CalendarData) => void;
};
/* <Calendar/> =========================================================== */
const Wrapper = styled.View`
    /* background-color: red; */
`;
const Header = styled.View`
    justify-content: center;
    align-items: center;
    height: ${HEADER_HEIGHT}px;
`;
const HeaderText = styled.Text`
    font-size: 14px;
    color: #000;
`;
const DayHeader = styled.View`
    flex-direction: row;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
    height: ${DAY_HEADER_HEIGHT}px;
`;
type DayTextProp = { firstDay: boolean };
const DayText = styled.Text<DayTextProp>`
    font-size: 13px;
    color: ${prop => (prop.firstDay ? 'rgb(234, 85, 65)' : '#000')};
    text-align: center;
`;
const Row = styled.View`
    flex-direction: row;
    height: ${ROW_HEIGHT}px;
    padding-top: 7px;
`;
const DayWrapper = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;
const Selected = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${STATE_BLUE};
    position: absolute;
`;
const Dot = styled.View`
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background-color: ${STATE_BLUE};
    position: absolute;
    bottom: 5px;
`;
const ArrowButton = styled.TouchableOpacity`
    position: absolute;
    width: 20px;
    height: 20px;
`;
const arrowIconStyle: TextStyle = { fontSize: 20, color: '#000' };

export default function Calendar(prop: Prop) {
    const { dayStates, onPressDay } = prop;

    const today = getKRNow();

    const [activeMonth, setActiveMonth] = useState<CalendarActiveMonth>({
        year: today.getFullYear(),
        month: today.getMonth(),
    });

    const keyPrefix = `${activeMonth.year}-${activeMonth.month}`;
    const matrix = generateMatrix(activeMonth.year, activeMonth.month);

    if (matrix === undefined) return null;

    const renderDayHeaderText = (item: string, idx: number) => {
        return (
            <DayText key={item} firstDay={idx === 0}>
                {item}
            </DayText>
        );
    };

    const renderDay = (item: CalendarData, idx: number) => {
        const markToday = isToday(today, item);
        const state = dayStates?.[item.fullString];
        const markSelected = state?.includes('SELECTED');
        const markDot = state?.includes('DOTTED');

        const textStyle: TextStyle | undefined = markSelected
            ? { color: '#fff' }
            : markToday
            ? { color: STATE_BLUE }
            : undefined;

        const _onPress = () => {
            onPressDay?.(item);
        };

        return (
            <DayWrapper key={`${keyPrefix}-${idx}`} onPress={_onPress}>
                {markSelected && <Selected />}
                <DayText firstDay={idx === 0} style={[textStyle]}>
                    {item.date === -1 ? '' : item.date}
                </DayText>
                {markDot && <Dot />}
            </DayWrapper>
        );
    };

    const renderRow = (item: CalendarData[], idx: number) => {
        const rowStyle: ViewStyle | undefined =
            idx !== 6
                ? { borderBottomWidth: 0.6, borderColor: 'rgb(221,221,221)' }
                : undefined;
        return (
            <Row key={`${keyPrefix}-row-${idx}`} style={rowStyle}>
                {item.map(renderDay)}
            </Row>
        );
    };

    const _onPressLeftArrow = () =>
        setActiveMonth(getPrevCalendarActiveMonth(activeMonth));
    const _onPressRightArrow = () =>
        setActiveMonth(getNextCalendarActiveMonth(activeMonth));

    return (
        <Wrapper>
            <Header>
                <ArrowButton style={{ left: 10 }} onPress={_onPressLeftArrow}>
                    <Icon name="chevron-left" style={arrowIconStyle} />
                </ArrowButton>
                <HeaderText>
                    {activeMonth.year}년 {activeMonth.month + 1}월
                </HeaderText>
                <ArrowButton style={{ right: 10 }} onPress={_onPressRightArrow}>
                    <Icon name="chevron-right" style={arrowIconStyle} />
                </ArrowButton>
            </Header>
            <DayHeader>{WEEK_DAYS.map(renderDayHeaderText)}</DayHeader>
            {matrix.map(renderRow)}
        </Wrapper>
    );
}
Calendar.defaultProps = {};
