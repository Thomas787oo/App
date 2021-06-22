import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../../scenes/editions-charisma-app/favorite/home.component';

const Stack = createStackNavigator();

export const FavoriteNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={HomeScreen}/>
  </Stack.Navigator>
);
