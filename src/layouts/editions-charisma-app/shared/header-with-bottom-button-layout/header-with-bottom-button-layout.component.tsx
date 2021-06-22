import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaLayout } from '../safe-area-layout/safe-area-layout.component';
import { BottomButton } from '../../../../components/editions-charisma-app/bottom-button/bottom-button.component';
import { CustomTopNavigation } from '../../../../components/editions-charisma-app/custom-top-navigation/custom-top-navigation.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';

export const HeaderWithBottomButtonLayout = (props: {
  children: any;
  headerOptions: {
    text: string;
    leftIcon: 'arrow' | 'cross' | 'none' | null;
    onPressLeft?: () => any;
    reachedPortion: number;
    totalPortions: number;
  };
  bottomButtonOptions: {
    text: string;
    enabled: boolean;
    onPress: () => any;
  };
}): React.ReactElement => {
  return (
    <SafeAreaLayout insets="top" style={styles.safeArea}>
      <CustomTopNavigation
        leftIcon={props.headerOptions.leftIcon}
        text={props.headerOptions.text}
        onPressLeft={props.headerOptions.onPressLeft}
      />
      {props.children}
      <BottomButton
        enabled={props.bottomButtonOptions.enabled}
        text={props.bottomButtonOptions.text}
        onPress={props.bottomButtonOptions.onPress}
      />
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
    borderBottomWidth: 2,
    borderBottomColor: Colors.legacyGrey25,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.montserratMedium,
    borderBottomColor: Colors.black,
  },
});
