import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/shared/terms/index';
import {StyleSheet} from 'react-native';
import {SafeAreaLayout} from '../../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';
import {CustomTopNavigation} from '../../../components/editions-charisma-app/custom-top-navigation/custom-top-navigation.component';

export const TermsScreen = (props: { navigation }): React.ReactElement => {

  const onArrowLeftPress = (): void => {
    props.navigation && props.navigation.goBack();
  };

  return (
    <SafeAreaLayout
        insets='top'
        style={styles.safeArea}>
        <CustomTopNavigation
            leftIcon={'arrow'}
            text={'CGU / CGV'}
            onPressLeft={onArrowLeftPress}
        />
        <ContentView navigation={props.navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
      marginBottom: 50,
  },
});
