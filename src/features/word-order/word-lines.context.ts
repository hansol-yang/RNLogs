import { createContext } from 'react';

type WordLinesContextType = {
    lines: number;
    setLines: (lines: number) => void;
};
const WordLinesContext = createContext<WordLinesContextType>({
    lines: 1,
    setLines: (lines: number) => {},
});
export default WordLinesContext;
