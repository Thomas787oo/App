import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../../scenes/editions-charisma-app/explore/home.component';

const Stack = createStackNavigator();

export const ExploreNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={HomeScreen}/>
  </Stack.Navigator>
);
