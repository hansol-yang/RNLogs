import React, { Fragment, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import Svg, { Circle, Line, Rect, Text } from 'react-native-svg';
import styled from 'styled-components/native';
import { getRange } from '../horizontal-datepicker/helper';

/* Constants =========================================================== */
const BACKGROUND = '#f5f7f9',
    BACKGROUND_LINE = '#c9c9c9',
    DOT = '#9fa0a0',
    LAST_DOT = '#467ef9';
const DOT_RADIUS = 5,
    LABEL_WIDTH = 30,
    LABEL_HEIGHT = 15,
    HORIZONTAL_LABEL_HEIGHT = 50;
/* Prop =========================================================== */
type Prop = {
    values: number[];
    horizontalLabels: string[];
    showVerticalLines: boolean;
    showHorizontalLines: boolean;
};
type Coordinate = { x: number; y: number };
/* <LinearChart/> =========================================================== */
const Wrapper = styled.View`
    flex: 1;
`;
const HorizontalLabelWrapper = styled.View`
    height: ${HORIZONTAL_LABEL_HEIGHT}px;
    flex-direction: row;
`;
const HorizontalLabel = styled.View`
    justify-content: center;
    align-items: center;
`;
const HorizontalLabelText = styled.Text`
    font-size: 11px;
    color: #232323;
    text-align: center;
`;
export default function LinearChart(prop: Prop) {
    const { values, showVerticalLines, showHorizontalLines, horizontalLabels } =
        prop;

    const [rect, setRect] = useState<LayoutRectangle>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const showHorizontalLabel = horizontalLabels.length > 0;
    const chartHeight = showHorizontalLabel
        ? rect.height - HORIZONTAL_LABEL_HEIGHT
        : rect.height;
    const backgroundLinesNumber = 5;
    const horizontalLinesGap = chartHeight / (backgroundLinesNumber + 1);
    const horizontalLine: Coordinate[] = [
        { x: 0, y: horizontalLinesGap },
        { x: rect.width, y: horizontalLinesGap },
    ];
    const verticalLineGap = rect.width / (backgroundLinesNumber + 1);
    const verticalLine: Coordinate[] = [
        { x: verticalLineGap, y: 0 },
        { x: verticalLineGap, y: chartHeight },
    ];
    const _onLayout = (ev: LayoutChangeEvent) => {
        const { layout } = ev.nativeEvent;
        setRect(layout);
    };
    const renderHorizontalLine = (item: number, idx: number) => (
        <Line
            key={idx}
            x1={horizontalLine[0].x}
            y1={horizontalLine[0].y * item}
            x2={horizontalLine[1].x}
            y2={horizontalLine[1].y * item}
            stroke={BACKGROUND_LINE}
        />
    );
    const renderVerticalLine = (item: number, idx: number) => (
        <Line
            key={idx}
            x1={verticalLine[0].x * item}
            y1={verticalLine[0].y}
            x2={verticalLine[1].x * item}
            y2={verticalLine[1].y}
            stroke={BACKGROUND_LINE}
        />
    );
    const renderDot = (item: number, idx: number) => {
        const lastDot = values.length - 1 === idx;
        const centerX = verticalLineGap * (idx + 1);
        const centerY = chartHeight - item - DOT_RADIUS;
        return (
            <Fragment key={idx}>
                <Rect
                    x={centerX - LABEL_WIDTH / 2}
                    y={centerY - LABEL_HEIGHT - 8}
                    rx={6}
                    ry={6}
                    width={LABEL_WIDTH}
                    height={LABEL_HEIGHT}
                    fill="#fff"
                />
                <Text
                    x={centerX}
                    y={centerY - 11}
                    stroke={DOT}
                    fontWeight={100}
                    fontSize={11}
                    textAnchor="middle">
                    {item}
                </Text>
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={DOT_RADIUS}
                    fill={lastDot ? LAST_DOT : DOT}
                />
            </Fragment>
        );
    };
    const renderDashedLine = (item: number, idx: number) => {
        const valid = values[idx + 1] !== undefined;
        if (!valid) return null;
        return (
            <Line
                key={idx}
                x1={verticalLineGap * (idx + 1)}
                y1={chartHeight - item - DOT_RADIUS}
                x2={verticalLineGap * (idx + 2)}
                y2={chartHeight - values[idx + 1] - DOT_RADIUS}
                stroke={DOT}
                strokeDasharray="5,5"
            />
        );
    };
    const renderHorizontalLabel = (item: string, idx: number) => {
        const labelWidth = rect.width / (backgroundLinesNumber + 1);
        return (
            <HorizontalLabel
                key={idx}
                style={{ width: labelWidth, left: labelWidth / 2 }}>
                <HorizontalLabelText>{item}</HorizontalLabelText>
            </HorizontalLabel>
        );
    };
    const linesRange = getRange(1, backgroundLinesNumber);
    return (
        <Wrapper onLayout={_onLayout}>
            <Svg
                width={rect.width}
                height={chartHeight}
                viewBox={`0 0 ${rect.width} ${chartHeight}`}>
                <Rect
                    x={0}
                    y={0}
                    rx={10}
                    ry={10}
                    width={rect.width}
                    height={chartHeight}
                    fill={BACKGROUND}
                />
                {showHorizontalLines && linesRange.map(renderHorizontalLine)}
                {showVerticalLines &&
                    getRange(1, backgroundLinesNumber).map(renderVerticalLine)}
                {values.map(renderDashedLine)}
                {values.map(renderDot)}
            </Svg>
            {showHorizontalLabel && (
                <HorizontalLabelWrapper>
                    {horizontalLabels.map(renderHorizontalLabel)}
                </HorizontalLabelWrapper>
            )}
        </Wrapper>
    );
}
LinearChart.defaultProps = {
    showVerticalLines: false,
    showHorizontalLines: false,
};
