import React, { useState } from 'react';
import { useRef } from 'react';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import styled, { css } from 'styled-components/native';
import Slider from '../slider/Slider';
import { toDigit } from './helper';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    uri: string;
};
/* <AudioPlayer/> =========================================================== */
const Container = styled.View`
    flex-direction: row;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 8px;
`;
const Button = styled.TouchableOpacity`
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    margin-right: 30px;
`;
const Icon = styled.Image`
    width: 100%;
    height: 100%;
`;
const Time = styled.Text`
    font-size: 14px;
    color: #232323;
`;
const sliderStyle = css`
    flex: 1;
    margin-right: 10px;
`;
export default function AudioPlayer(prop: Prop) {
    const { uri } = prop;

    const videoRef = useRef<Video | null>();
    const isPlayingRef = useRef(false);

    const [loaded, setLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const sliderPercent = loaded ? (currentTime / duration) * 100 : 0;
    const time = [toDigit(currentTime), toDigit(duration)].join(' / ');

    const icon = isPlaying
        ? require('./img/pause.png')
        : require('./img/playback.png');

    const _onPressPlaybackButton = () => {
        const next = !isPlaying;
        isPlayingRef.current = next;
        setIsPlaying(next);
    };

    const _onLoad = (data: OnLoadData) => {
        if (loaded) return;
        setDuration(data.duration * 1000);
        setLoaded(true);
    };

    const _onProgress = (data: OnProgressData) => {
        setCurrentTime(data.currentTime * 1000);
    };

    const _onChangeSlider = (value: number) => {
        videoRef.current?.seek((duration / 1000) * (value / 100));
    };

    const _onStartToSlide = () => {
        setIsPlaying(false);
    };

    const _onEndToSlide = () => {
        if (isPlayingRef.current) {
            setIsPlaying(true);
        }
    };

    return (
        <Container>
            <Button onPress={_onPressPlaybackButton}>
                <Icon source={icon} resizeMode="contain" />
            </Button>
            <Slider
                value={sliderPercent}
                css={sliderStyle}
                onChange={_onChangeSlider}
                onStartToSlide={_onStartToSlide}
                onEndToSlide={_onEndToSlide}
            />
            <Time>{time}</Time>
            <Video
                ref={ref => (videoRef.current = ref)}
                source={{ uri }}
                paused={!isPlaying}
                onLoad={_onLoad}
                onProgress={_onProgress}
                audioOnly
            />
        </Container>
    );
}
AudioPlayer.defaultProps = {};
