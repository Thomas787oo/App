import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../../components/icons';
import ContentView from '../../layouts/ecommerce/add-new-card';
import {SafeAreaLayout} from '../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';

export const AddNewCardScreen = ({ navigation }): React.ReactElement => {

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Add New Card'
        accessoryLeft={renderBackAction}
      />
      <Divider/>
      <ContentView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
