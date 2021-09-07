import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    visible: boolean;
};
/* <Loading/> =========================================================== */
const Dimmer = styled.View`
    background-color: #00000080;
`;
const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Title = styled.Text`
    color: #fff;
    font-size: 48px;
`;
export default function Loading(prop: Prop) {
    const { visible } = prop;

    const hidden = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(
            hidden.value ? 1 : 0,
            { duration: 500 },
            isFinished => {
                if (isFinished) {
                    hidden.value = !hidden.value;
                }
            },
        ),
    }));

    return (
        <Modal visible={visible} transparent>
            <Dimmer style={StyleSheet.absoluteFill} />
            <Wrapper>
                <Title as={Animated.Text} style={animatedStyle}>
                    LOADING
                </Title>
            </Wrapper>
        </Modal>
    );
}
Loading.defaultProps = { visible: false };
