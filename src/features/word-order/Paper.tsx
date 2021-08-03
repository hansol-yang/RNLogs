import React, { PropsWithChildren } from 'react';
import { Platform, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { PAPER_PADDING } from './helper';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    elevation: number;
    alignCenter: boolean;
    width?: number;
    height?: number;
};
/* <Paper/> =========================================================== */
const Container = styled.View<{
    width?: number;
    height?: number;
    alignCenter: boolean;
}>`
    background-color: #fff;
    z-index: 1;
    padding: ${PAPER_PADDING}px;
    margin-bottom: 10px;
    ${prop => ({
        ...(prop.width && { width: `${prop.width}px` }),
        ...(prop.height && { width: `${prop.height}px` }),
        ...(prop.alignCenter && {
            alignItems: 'center',
            justifyContent: 'center',
        }),
    })}
`;
export default function Paper(prop: PropsWithChildren<Prop>) {
    const { children, width, height, elevation, alignCenter } = prop;

    const shadow: ViewStyle = {
        ...Platform.select({
            ios: {
                shadowColor: '#cccccc',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 1,
                shadowRadius: 10,
            },
            android: { elevation },
        }),
    };
    return (
        <Container
            style={[shadow]}
            width={width}
            height={height}
            alignCenter={alignCenter}>
            {children}
        </Container>
    );
}
Paper.defaultProps = {
    elevation: 1,
    alignCenter: false,
};
