import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { css } from 'styled-components/native';
import Container from '../../common/Container';
import { Routes } from '../../Routes';
import { SCREEN_PADDING } from './helper';
import Lines from './Lines';
import Paper from './Paper';
import ReadyToOrderContext from './read-to-order.context';
import Word from './Word';
import WordLinesContext from './word-lines.context';
import WordList from './WordList';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    navigation: StackNavigationProp<Routes, 'WordOrderScreen'>;
};
/* <WordOrderScreen/> =========================================================== */
const words = [
    'HermesVM:',
    'JSI',
    'rethrowing',
    'JS',
    'exception:',
    'Cannot',
    'determine',
    'default',
    'value',
    'of',
    'object',
    'HermesVM:',
    'JSI',
    'rethrowing',
    'JS',
    'exception:',
    'Cannot',
    'determine',
    'default',
    'value',
    'of',
    'object',
];
const containerStyle = css`
    padding: ${SCREEN_PADDING}px;
    background-color: #dfdfdf;
`;
export default function WordOrderScreen(prop: Prop) {
    const {} = prop;

    const [lines, setLines] = useState(1);
    const [ready, setReady] = useState(false);

    const renderWord = (item: string, idx: number) => (
        <Word key={idx} word={item} />
    );

    return (
        <Container css={containerStyle}>
            <ReadyToOrderContext.Provider value={{ ready, setReady }}>
                <WordLinesContext.Provider value={{ lines, setLines }}>
                    <Paper>
                        <Lines />
                        <WordList>{words.map(renderWord)}</WordList>
                    </Paper>
                </WordLinesContext.Provider>
            </ReadyToOrderContext.Provider>
        </Container>
    );
}
WordOrderScreen.defaultProps = {};
