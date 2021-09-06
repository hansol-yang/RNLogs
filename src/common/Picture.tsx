import React from 'react';
import { StyleSheet } from 'react-native';
import { FlattenSimpleInterpolation } from 'styled-components';
import styled from 'styled-components/native';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    source: number;
    style?: FlattenSimpleInterpolation;
    rnStyle?: StyleSheet.NamedStyles<{}>;
};
/* <Picture/> =========================================================== */
type ImageProp = { css?: FlattenSimpleInterpolation };
const Image = styled.Image<ImageProp>`
    ${prop => prop.css}
`;
export default function Picture(prop: Prop) {
    const { source, style, rnStyle } = prop;

    return (
        <Image
            css={style}
            style={rnStyle}
            source={source}
            resizeMode="contain"
        />
    );
}
Picture.defaultProps = {};
