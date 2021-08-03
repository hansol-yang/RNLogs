import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import WordOrderScreen from './features/word-order/WordOrderScreen';
import MainScreen from './features/main/MainScreen';
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
        </Stack.Navigator>
    );
}
AppNavigator.defaultProps = {};
