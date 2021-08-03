import Animated from 'react-native-reanimated';
import { move } from 'react-native-redash';

export const SCREEN_PADDING = 20;
export const PAPER_PADDING = 10;
export const WORD_HEIGHT = 40;
export const WORD_MARGIN = 10;

export type SharedValues<T extends Record<string, string | number | boolean>> =
    {
        [K in keyof T]: Animated.SharedValue<T[K]>;
    };

export type WordLayout = SharedValues<{
    order: number;
    width: number;
    height: number;
    x: number;
    y: number;
    originX: number;
    originY: number;
}>;

export const isNotInBank = (layout: WordLayout) => {
    'worklet';
    return layout.order.value !== -1;
};

export const lastOrder = (layouts: WordLayout[]) => {
    'worklet';
    return layouts.filter(isNotInBank).length;
};

export const byOrder = (a: WordLayout, b: WordLayout) => {
    'worklet';
    return a.order.value > b.order.value ? 1 : -1;
};

export const remove = (layouts: WordLayout[], idx: number) => {
    'worklet';
    const _layouts = layouts
        .filter((_, _idx) => _idx !== idx)
        .filter(isNotInBank)
        .sort(byOrder);
    _layouts.map((l, i) => (l.order.value = i));
};

export const reorder = (layouts: WordLayout[], from: number, to: number) => {
    'worklet';
    const _layouts = layouts.filter(isNotInBank).sort(byOrder);
    const newOffset = move(_layouts, from, to);
    newOffset.map((_layout, _idx) => (_layout.order.value = _idx));
};

export const calculateLayout = (
    layouts: WordLayout[],
    availableWidth: number,
) => {
    'worklet';
    const _layouts = layouts.filter(isNotInBank).sort(byOrder);
    if (_layouts.length === 0) {
        return;
    }
    let lineNumber = 0;
    let lineBreak = 0;
    _layouts.forEach((_layout, _idx) => {
        const total = _layouts
            .slice(lineBreak, _idx)
            .reduce((acc, l) => acc + l.width.value, 0);
        if (total + _layout.width.value > availableWidth) {
            lineNumber += 1;
            lineBreak = _idx;
            _layout.x.value = 0;
        } else {
            _layout.x.value = total;
        }
        _layout.y.value = WORD_HEIGHT * lineNumber;
    });
};
