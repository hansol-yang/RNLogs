import React from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import Container from '../../common/Container';
import LinearChart from './LinearChart';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
type TLinearChartData = { score: number; takenAt: string };
/* <LinearChartScreen/> =========================================================== */
const containerStyle = css`
    justify-content: center;
    align-items: center;
`;
const ChartWrapper = styled.View`
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
`;
export default function LinearChartScreen() {
    const { width, height } = useWindowDimensions();
    const wrapperSizeStyle: ViewStyle = {
        width: width * 0.5,
        height: height * 0.5,
    };
    const data: TLinearChartData[] = [
        { score: 0, takenAt: '2021-01-15T16:35:11.492' },
        { score: 100, takenAt: '2021-01-15T16:35:11.492' },
        { score: 55, takenAt: '2021-01-15T16:35:11.492' },
        { score: 80, takenAt: '2021-01-15T16:35:11.492' },
        { score: 170, takenAt: '2021-01-15T16:35:11.492' },
    ];
    const scores = data.map(elem => elem.score);
    const takenAts = data.map(elem => {
        const splitted = elem.takenAt.split('T');
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayIdx = new Date(splitted[0]).getDay();
        const date = splitted[0].substr(5, 5);
        const time = splitted[1].substr(0, 5);
        return `${date}(${days[dayIdx]})\n${time}`;
    });

    return (
        <Container css={containerStyle}>
            <ChartWrapper style={[shadow, wrapperSizeStyle]}>
                <LinearChart
                    values={scores}
                    horizontalLabels={takenAts}
                    showHorizontalLines
                />
            </ChartWrapper>
        </Container>
    );
}
LinearChartScreen.defaultProps = {};
const shadow: ViewStyle = {
    elevation: 1,
};
