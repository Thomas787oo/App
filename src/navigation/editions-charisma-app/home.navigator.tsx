import React from 'react';
import {RouteProp} from '@react-navigation/core';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExploreNavigator} from './explore.navigator';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeBottomNavigation} from '../../scenes/editions-charisma-app/home/home-bottom-navigation.component';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {AccountNavigator} from './account.navigator';
import {LibraryNavigator} from './library.navigator';
import {FavoriteNavigator} from './favorite.navigator';

const Tab = createBottomTabNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Reserver' : 'Reserver';

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: { name: string, hideMenuOnSubPages?: boolean }[] = [{ name : 'Reserver', hideMenuOnSubPages: true }, { name: 'Bibliothèque', hideMenuOnSubPages: true }, { name: 'Favoris', hideMenuOnSubPages: true }, { name: 'Compte', hideMenuOnSubPages: true }];

/* Custom routes props */
interface CustomRouteProp extends RouteProp<any, any> {
    state?: any;
}

const isOneOfRootRoutes = (currentRoute: CustomRouteProp): boolean => {
  const isRouteFound = ROOT_ROUTES.find((route) => {
      const condition1 = currentRoute.name === route.name && currentRoute.state === undefined;
      const condition2 = (currentRoute.state !== undefined && currentRoute.name === route.name && currentRoute.state !== undefined && currentRoute.state.index === 0);
      return condition1 || condition2 ;
  }) !== undefined;
  return isRouteFound;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
    return { tabBarVisible: isOneOfRootRoutes(route), unmountOnBlur: true };
};

const HomeTabsNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={TabBarVisibleOnRootScreenOptions}
            initialRouteName={initialTabRoute}
            tabBar={(props: BottomTabBarOptions) => <HomeBottomNavigation {...props} />}
        >
            <Tab.Screen name='Reserver' component={ExploreNavigator}/>
            <Tab.Screen name='Bibliothèque' component={LibraryNavigator}/>
            <Tab.Screen name='Favoris' component={FavoriteNavigator}/>
            <Tab.Screen name='Compte' component={AccountNavigator}/>
        </Tab.Navigator>
    );
};

const Stack = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={HomeTabsNavigator}/>
        </Stack.Navigator>
    );
};
