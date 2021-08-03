import React, { ReactElement } from 'react';
import { useContext } from 'react';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { between, move, vec } from 'react-native-redash';
import styled from 'styled-components/native';
import useVector from '../../hooks/useVector';
import {
    calculateLayout,
    isNotInBank,
    lastOrder,
    PAPER_PADDING,
    remove,
    reorder,
    SCREEN_PADDING,
    WordLayout,
    WORD_HEIGHT,
    WORD_MARGIN,
} from './helper';
import WordLinesContext from './word-lines.context';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    children: ReactElement;
    layouts: WordLayout[];
    idx: number;
    availableWidth: number;
};
/* <Sortable/> =========================================================== */
const Placeholder = styled.View<{ layout: WordLayout }>`
    border: 1px solid #232323;
    padding: 5px 10px;
    margin-right: ${WORD_MARGIN}px;
    border-radius: 7px;
    background-color: #d9d9d9;
    ${prop => ({
        width: `${prop.layout.width.value - WORD_MARGIN}px`,
        height: `${prop.layout.height.value}px`,
    })}
`;
export default function Sortable(prop: Prop) {
    const { children, layouts, idx, availableWidth } = prop;
    const layout = layouts[idx];

    const { lines } = useContext(WordLinesContext);
    const LINES_HEIGHT = WORD_HEIGHT * lines;

    const isGestureActive = useSharedValue(false);
    const isAnimating = useSharedValue(false);
    const vector = useVector();
    const isInBank = useDerivedValue(() => layout.order.value === -1);

    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number; y: number }
    >({
        onStart: (_, ctx) => {
            if (isInBank.value) {
                vector.x.value = layout.originX.value;
                vector.y.value = layout.originY.value;
            } else {
                vector.x.value = layout.x.value;
                vector.y.value = layout.y.value - LINES_HEIGHT;
            }
            ctx.x = vector.x.value;
            ctx.y = vector.y.value;
            isGestureActive.value = true;
        },
        onActive: (ev, ctx) => {
            vector.x.value = ctx.x + ev.translationX;
            vector.y.value = ctx.y + ev.translationY;

            if (isInBank.value && vector.y.value < 0) {
                layout.order.value = lastOrder(layouts);
                calculateLayout(layouts, availableWidth);
            } else if (!isInBank.value && vector.y.value > 0) {
                layout.order.value = -1;
                remove(layouts, idx);
                calculateLayout(layouts, availableWidth);
            }
            for (let i = 0; i < layouts.length; i++) {
                const l = layouts[i]!;
                if (i === idx && l.order.value !== -1) {
                    continue;
                }
                if (
                    between(
                        vector.x.value,
                        l.x.value,
                        l.x.value + l.width.value,
                    ) &&
                    between(
                        vector.y.value,
                        l.y.value - LINES_HEIGHT,
                        l.y.value - LINES_HEIGHT + WORD_HEIGHT,
                    )
                ) {
                    reorder(layouts, layout.order.value, l.order.value);
                    calculateLayout(layouts, availableWidth);
                    break;
                }
            }
        },
        onEnd: ev => {
            isAnimating.value = true;
            const { velocityX, velocityY } = ev;
            vector.x.value = withSpring(
                layout.x.value,
                {
                    velocity: velocityX,
                },
                () => {
                    isAnimating.value = false;
                },
            );
            vector.y.value = withSpring(layout.y.value, {
                velocity: velocityY,
            });
            isGestureActive.value = false;
        },
    });
    const translationX = useDerivedValue(() => {
        if (isGestureActive.value) {
            return vector.x.value;
        }
        return withSpring(
            isInBank.value ? layout.originX.value : layout.x.value,
        );
    });
    const translationY = useDerivedValue(() => {
        if (isGestureActive.value) {
            return vector.y.value;
        }
        return withSpring(
            isInBank.value
                ? layout.originY.value
                : layout.y.value - LINES_HEIGHT,
        );
    });
    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    return (
        <>
            <Placeholder layout={layout} />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={style}>{children}</Animated.View>
            </PanGestureHandler>
        </>
    );
}
Sortable.defaultProps = {};
