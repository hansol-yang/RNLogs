import React, { ReactElement, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { getNextPage, TViewPagerState } from './helper';
import ViewPagerPage from './ViewPagerPage';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    children: ReactElement[];
    onChangePage?: (page: number) => void;
};
/* <ViewPager/> =========================================================== */
const Wrapper = styled.View`
    background-color: red;
    flex-direction: row;
    flex: 1;
    width: 50%;
    overflow: hidden;
`;
export default function ViewPager(prop: Prop) {
    const { children, onChangePage } = prop;
    const maxIndex = children.length - 1;

    const [width, setWidth] = useState(0);
    const [page, setPage] = useState(0);

    const translateX = useSharedValue(0);
    const state = useSharedValue<TViewPagerState>('IDLE');
    const _onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number }
    >({
        onStart: (_, ctx) => {
            ctx.x = translateX.value;
        },
        onActive: (ev, ctx) => {
            const diff = translateX.value - (ctx.x + ev.translationX);

            if (diff > 0) {
                state.value = 'SCROLL_LEFT';
            } else {
                state.value = 'SCROLL_RIGHT';
            }

            translateX.value = ctx.x + ev.translationX;
        },
        onEnd: () => {
            const nextPage = getNextPage(page, maxIndex, state.value);

            const nextTranslateX = -(width * nextPage);
            translateX.value = withSpring(nextTranslateX);

            runOnJS(setPage)(nextPage);
            if (onChangePage !== undefined) {
                runOnJS(onChangePage)(nextPage);
            }

            state.value = 'IDLE';
        },
    });

    const renderItem = (item: ReactElement) => (
        <ViewPagerPage key={item.key} translateX={translateX}>
            {item}
        </ViewPagerPage>
    );

    const _onLayout = (ev: LayoutChangeEvent) => {
        const { layout } = ev.nativeEvent;
        runOnJS(setWidth)(layout.width);
    };

    return (
        <PanGestureHandler onGestureEvent={_onGestureEvent}>
            <Wrapper as={Animated.View} onLayout={_onLayout}>
                {children.map(renderItem)}
            </Wrapper>
        </PanGestureHandler>
    );
}
ViewPager.defaultProps = {};