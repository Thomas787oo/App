import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {HomeNavigator} from './home.navigator';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {AuthNavigator} from './auth.navigator';

const Stack = createStackNavigator();
/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const ConditionalNavigator = (props): React.ReactElement => {

    // Guard that makes the user cannot access the protected area if no authentication data is found
    const isLogged = props.authenticationData !== null;

    return (
        <Stack.Navigator headerMode='none'>
            {
                isLogged ?
                    <Stack.Screen name='AuthenticatedNavigator' {...props} component={HomeNavigator}/>
                    :
                    <Stack.Screen name='Auth' {...props} component={AuthNavigator}/>
            }
        </Stack.Navigator>
    );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationData: state.setAuthenticationTokens.authenticationData,
    };
};

const MainNavigator = connect(mapStateToProps)(ConditionalNavigator);

export const AppNavigator = (): React.ReactElement => (
  <NavigationContainer theme={navigatorTheme}>
    <MainNavigator/>
  </NavigationContainer>
);
