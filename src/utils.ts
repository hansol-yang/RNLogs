export const getNumberRange = (start: number, end: number) => {
    return new Array(end - start + 1).fill(0).map((_, idx) => idx + 1);
};
