import React from 'react';
import styled from 'styled-components/native';
import Slider from './Slider';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <SliderScreen/> =========================================================== */
const Container = styled.View`
    flex: 1;
    padding: 100px;
`;
export default function SliderScreen() {
    const _onChange = (value: number) => {
        console.log(value);
    };

    return (
        <Container>
            <Slider value={90} onChange={_onChange} />
        </Container>
    );
}
SliderScreen.defaultProps = {};
