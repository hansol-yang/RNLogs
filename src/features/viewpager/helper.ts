export type TViewPagerState = 'IDLE' | 'SCROLL_LEFT' | 'SCROLL_RIGHT';

export const getNextPage = (
    curr: number,
    max: number,
    state: TViewPagerState,
) => {
    'worklet';
    let nextPage =
        state === 'SCROLL_LEFT'
            ? curr + 1
            : state === 'SCROLL_RIGHT'
            ? curr - 1
            : 0;

    if (nextPage < 0) {
        nextPage = 0;
    }

    if (nextPage > max) {
        nextPage = max;
    }

    return nextPage;
};
