import React, { ReactNode } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import styled from 'styled-components/native';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    children: ReactNode;
    css?: FlattenSimpleInterpolation;
};
/* <Container/> =========================================================== */
type FluidProp = { css?: FlattenSimpleInterpolation };
const Fluid = styled.View<FluidProp>`
    flex: 1;
    ${prop => prop.css}
`;
export default function Container(prop: Prop) {
    const { children, ...styles } = prop;
    return <Fluid {...styles}>{children}</Fluid>;
}
Container.defaultProps = {};
