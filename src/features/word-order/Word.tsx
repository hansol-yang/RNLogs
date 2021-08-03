import React from 'react';
import styled from 'styled-components/native';
import { WORD_MARGIN } from './helper';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    word: string;
};
/* <Word/> =========================================================== */
const Container = styled.View`
    border: 1px solid #232323;
    padding: 5px 10px;
    margin-right: ${WORD_MARGIN}px;
    border-radius: 7px;
    background-color: #ffffff;
`;
const Text = styled.Text`
    font-size: 16px;
`;
export default function Word(prop: Prop) {
    const { word } = prop;
    return (
        <Container>
            <Text>{word}</Text>
        </Container>
    );
}
Word.defaultProps = {};
