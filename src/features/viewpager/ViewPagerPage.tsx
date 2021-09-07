import React, { ReactElement } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    children: ReactElement;
    translateX?: Animated.SharedValue<number>;
};
/* <ViewPagerPage/> =========================================================== */
const Wrapper = styled.View`
    width: 100%;
`;
export default function ViewPagerPage(prop: Prop) {
    const { children, translateX } = prop;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX?.value ?? 0 }],
    }));

    return (
        <Wrapper as={Animated.View} style={animatedStyle}>
            {children}
        </Wrapper>
    );
}
ViewPagerPage.defaultProps = {};
