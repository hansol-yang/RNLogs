import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    ListRenderItem,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { runOnJS, runOnUI, useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import DatePickerContext from './date-picker.context';
import {
    getDates,
    getNextYearAndMonth,
    getNumberOfDaysInMonth,
    getPrevYearAndMonth,
    TDate,
} from './helper';

/* Constants =========================================================== */
const SIZE = 50,
    WRAPPER_PADDING = 15,
    MARGIN = 10;
/* Prop =========================================================== */
type Prop = {};
/* <DayPicker/> =========================================================== */
const Wrapper = styled.View`
    background-color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px ${WRAPPER_PADDING}px;
    border-radius: 20px;
    width: ${SIZE * 10 + MARGIN * 9 + WRAPPER_PADDING * 2 + 2}px;
`;
const Item = styled.TouchableOpacity`
    width: ${SIZE}px;
    height: ${SIZE}px;
    margin-right: ${MARGIN}px;
    border: 1px solid #d9d9d9;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;
const Title = styled.Text``;

export default function DayPicker() {
    const listRef = useRef<FlatList<TDate> | null>();
    const { date, setDate } = useContext(DatePickerContext);
    const [dates, setDates] = useState<TDate[]>([]);

    const isAnimating = useSharedValue(false);

    const setDefaultDates = () => {
        const prev = getPrevYearAndMonth(date.year, date.month);
        const next = getNextYearAndMonth(date.year, date.month);

        const prevDates = getDates(prev.year, prev.month);
        const currentDates = getDates(date.year, date.month);
        const nextDates = getDates(next.year, next.month);

        setDates([...prevDates, ...currentDates, ...nextDates]);
    };

    useEffect(() => {
        setDefaultDates();
    }, []);

    useEffect(() => {
        if (dates.length === 0) return;
        const neverRendered =
            dates.findIndex(
                elem => elem.year === date.year && elem.month === date.month,
            ) === -1;

        if (neverRendered) {
            setDefaultDates();
        } else {
            if (date.needToScroll) {
                listRef.current?.scrollToIndex({
                    animated: true,
                    index: dates.findIndex(
                        elem =>
                            elem.year === date.year &&
                            elem.month === date.month,
                    ),
                });
            }
        }
    }, [date, dates]);

    const renderItem: ListRenderItem<TDate> = ({ item }) => {
        const _onPress = () => {
            console.log(Object.values(item).join('-'));
        };
        return (
            <Item onPress={_onPress}>
                <Title>{item.date}</Title>
            </Item>
        );
    };

    const _onMomentumScrollBegin = () => {
        isAnimating.value = true;
    };

    const _onMomentumScrollEnd = (
        ev: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        runOnUI(() => {
            'worklet';
            if (isAnimating.value) {
                // Animation has been ended
                const { contentOffset } = ev.nativeEvent;
                const estimatedIdx = contentOffset.x / (SIZE + MARGIN);
                const current = dates[Math.floor(estimatedIdx)];
                if (
                    current.year !== date.year ||
                    current.month !== date.month
                ) {
                    runOnJS(setDate)({
                        year: current.year,
                        month: current.month,
                        needToScroll: false,
                    });
                }
                isAnimating.value = false;
            }
        })();
    };
    return (
        <Wrapper>
            <FlatList
                ref={ref => (listRef.current = ref)}
                data={dates}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={getNumberOfDaysInMonth(
                    date.year,
                    date.month,
                )}
                horizontal
                keyExtractor={item => Object.values(item).join('-')}
                getItemLayout={(_, index) => ({
                    length: SIZE + MARGIN,
                    offset: (SIZE + MARGIN) * index,
                    index,
                })}
                renderItem={renderItem}
                onMomentumScrollBegin={_onMomentumScrollBegin}
                onMomentumScrollEnd={_onMomentumScrollEnd}
            />
        </Wrapper>
    );
}
DayPicker.defaultProps = {};
