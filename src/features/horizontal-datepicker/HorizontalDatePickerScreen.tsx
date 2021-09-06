import React from 'react';
import styled from 'styled-components/native';
import Container from '../../common/Container';
import HorizontalDatePicker from './HorizontalDatePicker';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <HorizontalDate PickerScreen/> =========================================================== */
const Wrapper = styled.View``;
export default function HorizontalDatePickerScreen() {
    return (
        <Container>
            <Wrapper>
                <HorizontalDatePicker />
            </Wrapper>
        </Container>
    );
}
HorizontalDatePickerScreen.defaultProps = {};
