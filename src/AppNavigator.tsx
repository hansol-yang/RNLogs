import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainScreen from './features/main/MainScreen';
import SliderScreen from './features/slider/SliderScreen';
import WordOrderScreen from './features/word-order/WordOrderScreen';
import { Routes } from './Routes';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <AppNavigator/> =========================================================== */
export type RNLog = {
    title: string;
    name: keyof Routes;
};
export const logs: RNLog[] = [
    {
        title: '어순배열🧩',
        name: 'WordOrderScreen',
    },
    {
        title: '슬라이더🎚️',
        name: 'SliderScreen',
    },
];
const Stack = createStackNavigator<Routes>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ title: 'RN Logs' }}
            />
            <Stack.Screen
                name="WordOrderScreen"
                component={WordOrderScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SliderScreen" component={SliderScreen} />
        </Stack.Navigator>
    );
}
AppNavigator.defaultProps = {};
