import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpStep1Screen} from '../../scenes/editions-charisma-app/auth/sign-up-step1.component';
import {TermsScreen} from '../../scenes/editions-charisma-app/auth/terms.component';
import {SignInScreen} from '../../scenes/editions-charisma-app/auth/sign-in.component';
import {ForgotPasswordStep1Screen} from '../../scenes/editions-charisma-app/auth/forgot-password-step1.component';
import {ForgotPasswordStep2Screen} from '../../scenes/editions-charisma-app/auth/forgot-password-step2.component';
import {ForgotPasswordSuccessScreen} from '../../scenes/editions-charisma-app/auth/forgot-password-success.component';
import {ForgotPasswordErrorScreen} from '../../scenes/editions-charisma-app/auth/forgot-password-error.component';
import {SignUpStep2Screen} from '../../scenes/editions-charisma-app/auth/sign-up-step2.component';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>

    <Stack.Screen name='SignIn' component={SignInScreen}/>
    <Stack.Screen name='ForgotPasswordStep1' component={ForgotPasswordStep1Screen}/>
    <Stack.Screen name='ForgotPasswordStep2' component={ForgotPasswordStep2Screen}/>
    <Stack.Screen name='ForgotPasswordSuccess' component={ForgotPasswordSuccessScreen}/>
    <Stack.Screen name='ForgotPasswordError' component={ForgotPasswordErrorScreen}/>

    {/* Sign up during first order */}
    <Stack.Screen name='SignUpStep1' component={SignUpStep1Screen}/>
    <Stack.Screen name='SignUpStep2' component={SignUpStep2Screen}/>
    <Stack.Screen name='Terms' component={TermsScreen}/>

  </Stack.Navigator>
);
