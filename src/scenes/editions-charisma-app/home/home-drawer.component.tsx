import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
    Avatar,
    Divider,
    Drawer,
    DrawerElement,
    DrawerHeaderElement,
    DrawerHeaderFooter,
    DrawerHeaderFooterElement,
    Layout,
    MenuItemType,
    Text,
} from '@ui-kitten/components';
import {AssetAuthIcon, BookIcon, GithubIcon} from '../../../components/icons';
import {WebBrowserService} from '../../../services/web-browser.service';
import {AppInfoService} from '../../../services/app-info.service';
import {connect} from 'react-redux';
import {SafeAreaLayout} from '../../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';

const DATA: MenuItemType[] = [
  { title: 'Libraries', icon: GithubIcon },
  { title: 'Documentation', icon: BookIcon },
  { title: 'Déconnexion', icon: AssetAuthIcon },
];

const version: string = AppInfoService.getVersion();

const HomeDrawerView = (props: { navigation: any, dispatch: Function }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        props.navigation.toggleDrawer();
        props.navigation.navigate('Libraries');
        return;
      }
      case 1: {
        WebBrowserService.openBrowserAsync('https://akveo.github.io/react-native-ui-kitten');
        props.navigation.toggleDrawer();
        return;
      }
      case 2: {
        // Clear authentication data
        const actionA = { type: 'REMOVE_AUTHENTICATION_DATA' };
        props.dispatch(actionA);
        // Clear user data
        const actionB = { type: 'REMOVE_USER_INFORMATION' };
        props.dispatch(actionB);
        // Clear explore steps data
        const actionC = { type: 'RESET_STEPS' };
        props.dispatch(actionC);
        // Clear explore data
        const actionD = { type: 'CANCEL_ORDER' };
        props.dispatch(actionD);
        props.navigation.toggleDrawer();
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../../../assets/images/image-app-icon.png')}
        />
        <Text
          style={styles.profileName}
          category='h6'>
            Editions Charisma
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description={`Version ${AppInfoService.getVersion()}`}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={DATA}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});

export const HomeDrawer = connect()(HomeDrawerView);
