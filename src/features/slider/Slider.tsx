import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    runOnUI,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

/* Prop =========================================================== */
type Prop = {
    value: number; // percent
    onChange?: (value: number) => void; // (percent) => void
};
/* Constants =========================================================== */
const THUMB_WIDTH = 15;
/* <Slider/> =========================================================== */
const Container = styled.View`
    flex-direction: row;
`;
const Track = styled.View`
    background-color: #ccc;
    flex: 1;
    height: 10px;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
`;
const Fill = styled.View`
    position: absolute;
    left: 0;
    height: 100%;
    background-color: #72727180;
    border-radius: 5px;
`;
const Thumb = styled.View`
    width: ${THUMB_WIDTH}px;
    height: ${THUMB_WIDTH}px;
    background-color: #232323;
    border-radius: ${THUMB_WIDTH / 2}px;
    left: -${THUMB_WIDTH / 2}px;
`;
export default function Slider(prop: Prop) {
    const { value, onChange } = prop;

    const [width, setWidth] = useState<number>(0);

    const translateX = useSharedValue(0);
    const onThumbGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number }
    >({
        onStart: (ev, ctx) => {
            let current = ev.x;
            if (current < 0) {
                current = 0;
            }
            if (current > width) {
                current = width;
            }
            translateX.value = current;
            ctx.x = translateX.value;
        },
        onActive: (ev, ctx) => {
            let next = ctx.x + ev.translationX;
            if (next < 0) {
                next = 0;
            }
            if (next > width) {
                next = width;
            }
            translateX.value = next;
            if (width > 0 && onChange !== undefined) {
                runOnJS(onChange)((next / width) * 100);
            }
        },
    });
    const fillStyle = useAnimatedStyle(() => ({
        width: translateX.value,
    }));
    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    useEffect(() => {
        translateX.value = width * (value / 100);
    }, [value, width]);

    const _onLayout = (ev: LayoutChangeEvent) => {
        const nextWidth = ev.nativeEvent.layout.width;
        setWidth(nextWidth);
    };
    return (
        <Container onLayout={_onLayout}>
            <PanGestureHandler
                onGestureEvent={onThumbGestureEvent}
                hitSlop={{ left: 30, right: 30, top: 30, bottom: 30 }}>
                <Track as={Animated.View}>
                    <Fill as={Animated.View} style={fillStyle} />
                    <Thumb as={Animated.View} style={thumbStyle} />
                </Track>
            </PanGestureHandler>
        </Container>
    );
}
Slider.defaultProps = {
    inputInPercent: 0,
};
