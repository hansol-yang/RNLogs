import React, { useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { WORD_HEIGHT } from './helper';
import WordLinesContext from './word-lines.context';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <Lines/> =========================================================== */
const Line = styled.View`
    height: ${WORD_HEIGHT}px;
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
`;
export default function Lines() {
    const { lines } = useContext(WordLinesContext);

    const renderItem = (_: number, idx: number) => <Line key={idx} />;

    return <View>{new Array(lines).fill(0).map(renderItem)}</View>;
}
Lines.defaultProps = {};
