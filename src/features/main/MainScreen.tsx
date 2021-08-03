import { StackNavigationProp } from '@react-navigation/stack';
import React, { Fragment } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { logs, RNLog } from '../../AppNavigator';
import { Routes } from '../../Routes';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    navigation: StackNavigationProp<Routes, 'MainScreen'>;
};
/* <MainScreen/> =========================================================== */
const Row = styled.TouchableOpacity`
    padding: 10px;
`;
const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const Divider = styled.View`
    background-color: #232323;
    height: ${StyleSheet.hairlineWidth}px;
`;

export default function MainScreen(prop: Prop) {
    const { navigation } = prop;

    const renderItem = (item: RNLog, idx: number) => {
        const _onPress = () => {
            navigation.navigate(item.name);
        };

        return (
            <Fragment key={idx}>
                <Row onPress={_onPress}>
                    <Title>{item.title}</Title>
                </Row>
                {idx === logs.length - 1 || <Divider />}
            </Fragment>
        );
    };

    return <ScrollView>{logs.map(renderItem)}</ScrollView>;
}
MainScreen.defaultProps = {};
