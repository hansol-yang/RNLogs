import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Routes } from '../../Routes';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {
    navigation: StackNavigationProp<Routes, 'WordOrderScreen'>;
};
/* <WordOrderScreen/> =========================================================== */
export default function WordOrderScreen(prop: Prop) {
    const {} = prop;
    return (
        <View>
            <Text>WordOrderScreen</Text>
        </View>
    );
}
WordOrderScreen.defaultProps = {};
