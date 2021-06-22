import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../../scenes/editions-charisma-app/account/home.component';
import {ChangeEmailStep1Screen} from '../../scenes/editions-charisma-app/account/change-email-step1.component';
import {ChangeEmailStep2Screen} from '../../scenes/editions-charisma-app/account/change-email-step2.component';
import {ChangeEmailSuccessScreen} from '../../scenes/editions-charisma-app/account/change-email-success.component';
import {ChangeEmailErrorScreen} from '../../scenes/editions-charisma-app/account/change-email-error.component';
import {TermsScreen} from '../../scenes/editions-charisma-app/account/terms.component';
import {ChangePasswordStep1Screen} from '../../scenes/editions-charisma-app/account/change-password-step1.component';
import {ChangePasswordSuccessScreen} from '../../scenes/editions-charisma-app/account/change-password-success.component';
import {ChangePasswordErrorScreen} from '../../scenes/editions-charisma-app/account/change-password-error.component';
import {ContactScreen} from '../../scenes/editions-charisma-app/account/contact.component';

const Stack = createStackNavigator();

export const AccountNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>

        <Stack.Screen name='Home' component={HomeScreen}/>

        <Stack.Screen name='ChangeEmailStep1' component={ChangeEmailStep1Screen}/>
        <Stack.Screen name='ChangeEmailStep2' component={ChangeEmailStep2Screen}/>
        <Stack.Screen name='ChangeEmailSuccess' component={ChangeEmailSuccessScreen}/>
        <Stack.Screen name='ChangeEmailError' component={ChangeEmailErrorScreen}/>

        <Stack.Screen name='ChangePasswordStep1' component={ChangePasswordStep1Screen}/>
        <Stack.Screen name='ChangePasswordSuccess' component={ChangePasswordSuccessScreen}/>
        <Stack.Screen name='ChangePasswordError' component={ChangePasswordErrorScreen}/>

        <Stack.Screen name='Terms' component={TermsScreen}/>
        <Stack.Screen name='Contact' component={ContactScreen}/>
    </Stack.Navigator>
);
