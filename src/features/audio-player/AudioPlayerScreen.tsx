import React from 'react';
import { css } from 'styled-components';
import Container from '../../common/Container';
import AudioPlayer from './AudioPlayer';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <AudioPlayerScreen/> =========================================================== */
const containerStyle = css`
    padding: 20px;
`;
export default function AudioPlayerScreen() {
    const uri = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';
    return (
        <Container css={containerStyle}>
            <AudioPlayer uri={uri} />
        </Container>
    );
}
AudioPlayerScreen.defaultProps = {};
