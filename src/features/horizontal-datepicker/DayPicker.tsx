import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Insets, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import DatePickerContext from './date-picker.context';
import { getDefaultDates, getIdxOfFirstDate, isToday, TDate } from './helper';

/* Constants =========================================================== */
const SIZE = 30,
    PADDING_LEFT = 15,
    MARGIN_RIGHT = 10;
const HIT_SLOP: Insets = {
    left: SIZE + 5,
    right: SIZE + 5,
    top: SIZE + 7,
    bottom: SIZE + 7,
};
/* Prop =========================================================== */
type Prop = {
    minYear: number;
};
/* <DayPicker/> =========================================================== */
const Wrapper = styled.View`
    background-color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px ${PADDING_LEFT}px;
    border-radius: 20px;
    width: ${SIZE * 10 + PADDING_LEFT * 2 + MARGIN_RIGHT * 9}px;
`;
type ItemProp = {
    markToday: boolean;
};
const Item = styled.TouchableOpacity<ItemProp>`
    width: ${SIZE}px;
    height: ${SIZE}px;
    border: 1px solid #d9d9d9;
    justify-content: center;
    align-items: center;
    border-radius: ${SIZE / 2}px;
    margin-right: ${MARGIN_RIGHT}px;
    background-color: ${prop => (prop.markToday ? '#d9d9d9' : '#fff')};
`;
const Title = styled.Text``;
export default function DayPicker(prop: Prop) {
    const { minYear } = prop;

    const listRef = useRef<FlatList<TDate> | null>();
    const { date } = useContext(DatePickerContext);
    const [defaultDates, defaultIdx] = getDefaultDates(minYear);
    const [dates, setDates] = useState<TDate[]>(defaultDates);

    useEffect(() => {
        if (!date.needToScroll) return;
        const index = getIdxOfFirstDate(dates, date);
        listRef.current?.scrollToIndex({ animated: true, index });
    }, [date]);

    const renderItem: ListRenderItem<TDate> = ({ item }) => {
        const _onPress = () => {
            console.log(Object.values(item).join('-'));
        };
        const markToday = isToday(item);
        return (
            <Item markToday={markToday} onPress={_onPress}>
                <Title>{item.date}</Title>
            </Item>
        );
    };
    const keyExtractor = (item: TDate) => Object.values(item).join('-');
    const getItemLayout = (_: TDate[] | null | undefined, index: number) => ({
        length: SIZE + MARGIN_RIGHT,
        offset: (SIZE + MARGIN_RIGHT) * index,
        index,
    });

    return (
        <Wrapper>
            <FlatList
                ref={ref => (listRef.current = ref)}
                data={dates}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={defaultIdx - 3}
                hitSlop={HIT_SLOP}
                horizontal
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
            />
        </Wrapper>
    );
}
DayPicker.defaultProps = {};
