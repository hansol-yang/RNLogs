const twoDigits = (value: number): string =>
    value >= 10 ? value.toString() : `0${value}`;

export const toDigit = (ms: number) => {
    let s = Number((ms / 1000).toFixed());

    const h = Math.floor(s / 3600);
    s = s % 3600;

    const m = Math.floor(s / 60);
    s = s % 60;

    const digits = [twoDigits(h), twoDigits(m), twoDigits(s)];

    if (h === 0) {
        digits.splice(0, 1);
    }

    return digits.join(':');
};
