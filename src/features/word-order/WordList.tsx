/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useContext, useRef } from 'react';
import { LayoutChangeEvent, useWindowDimensions, View } from 'react-native';
import { runOnJS, runOnUI, useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { PAPER_PADDING, SCREEN_PADDING, WordLayout } from './helper';
import ReadyToOrderContext from './read-to-order.context';
import Sortable from './Sortable';
import WordLinesContext from './word-lines.context';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = { children: ReactElement[] };
/* <WordList/> =========================================================== */
const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;
export default function WordList(prop: Prop) {
    const { children } = prop;

    const layouts: WordLayout[] = children.map(() => ({
        order: useSharedValue(0),
        width: useSharedValue(0),
        height: useSharedValue(0),
        x: useSharedValue(0),
        y: useSharedValue(0),
        originX: useSharedValue(0),
        originY: useSharedValue(0),
    }));

    const { width: containerWidth } = useWindowDimensions();
    const availableWidth =
        containerWidth - (PAPER_PADDING * 2 + SCREEN_PADDING * 2);

    const { ready, setReady } = useContext(ReadyToOrderContext);
    const { lines, setLines } = useContext(WordLinesContext);
    const widthRef = useRef(availableWidth);

    if (!children) {
        return null;
    }

    if (!ready) {
        const renderItem = (child: ReactElement, idx: number) => {
            const _onLayout = (ev: LayoutChangeEvent) => {
                const {
                    layout: { width, height, x, y },
                } = ev.nativeEvent;
                const layout = layouts[idx];
                layout.order.value = -1;
                layout.width.value = width;
                layout.height.value = height;
                layout.originX.value = x;
                layout.originY.value = y;

                widthRef.current -= width;
                if (widthRef.current < 0) {
                    widthRef.current = availableWidth - width;
                    setLines(lines + 1);
                }

                runOnUI(() => {
                    'worklet';

                    if (layouts.every(elem => elem.order.value === -1)) {
                        runOnJS(setReady)(true);
                    }
                })();
            };
            return (
                <View key={idx} onLayout={_onLayout}>
                    {child}
                </View>
            );
        };
        return <Container>{children.map(renderItem)}</Container>;
    } else {
        const renderItem = (child: ReactElement, idx: number) => (
            <Sortable
                key={idx}
                idx={idx}
                layouts={layouts}
                availableWidth={availableWidth}>
                {child}
            </Sortable>
        );
        return <Container>{children.map(renderItem)}</Container>;
    }
}
WordList.defaultProps = {};
