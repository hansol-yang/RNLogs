import React from 'react';
import { css } from 'styled-components';
import Container from '../../common/Container';

import Slider from './Slider';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <SliderScreen/> =========================================================== */
const containerStyle = css`
    padding: 100px;
`;
export default function SliderScreen() {
    const _onChange = (value: number) => {};

    return (
        <Container css={containerStyle}>
            <Slider value={90} onChange={_onChange} />
        </Container>
    );
}
SliderScreen.defaultProps = {};
