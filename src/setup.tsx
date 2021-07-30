import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';

const setup = () => {
    LogBox.ignoreAllLogs();

    function Root() {
        return (
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        );
    }
    return Root;
};

export default setup;
