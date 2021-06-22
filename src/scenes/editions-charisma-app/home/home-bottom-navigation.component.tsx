import React from 'react';
import {BottomNavigationTab, Icon} from '@ui-kitten/components';
import {BrandBottomNavigation} from '../../../components/brand-bottom-navigation.component';
import {Calendar, MessageCircle, Scissors, Settings} from 'react-native-feather';
import {SafeAreaLayout} from '../../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';

export const HomeBottomNavigation = (props: { state, descriptors, navigation }): React.ReactElement => {

  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  const focusedOptions = props.descriptors[props.state.routes[props.state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaLayout insets='bottom'>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>

      <BottomNavigationTab
        title= {'Reserver'}
        icon={(icon: { style: any }) => <Icon name='home' style={{ width: icon.style.width, height: icon.style.height, tintColor: icon.style.tintColor }} pack='feather'/>}
      />
      <BottomNavigationTab
        title= {'Bibliothèque'}
        icon={(icon: { style: any }) => <Icon name='music' style={{ width: icon.style.width, height: icon.style.height, tintColor: icon.style.tintColor }} pack='feather'/>}
      />
      <BottomNavigationTab
          title= {'Favoris'}
          icon={(icon: { style: any }) => <Icon name='star' style={{ width: icon.style.width, height: icon.style.height, tintColor: icon.style.tintColor }} pack='feather'/>}
      />
      <BottomNavigationTab
          title= {'Compte'}
          icon={(icon: { style: any }) => <Icon name='settings' style={{ width: icon.style.width, height: icon.style.height, tintColor: icon.style.tintColor }} pack='feather'/>}
      />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};
