import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaLayout} from '../safe-area-layout/safe-area-layout.component';
import {CustomTopNavigation} from '../../../../components/editions-charisma-app/custom-top-navigation/custom-top-navigation.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {LinearGradient} from 'expo-linear-gradient';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';

export const HeaderWithGradientBackgroundLayout = (props: {
  children: any;
  headerOptions: {
    text: string;
    leftIcon: 'arrow' | 'cross' | 'none' | null;
    onPressLeft?: () => any;
  };
}): React.ReactElement => {
  return (
    <SafeAreaLayout insets='top' style={styles.safeArea}>
      <CustomTopNavigation
        leftIcon={props.headerOptions.leftIcon}
        text={props.headerOptions.text}
        onPressLeft={props.headerOptions.onPressLeft}
      />
            <LinearGradient
                // Background Linear Gradient
                colors={[Colors.orange, Colors.yellow]}
                style={styles.linearGradient}
                start={{ x: 0.1, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                <KeyboardAvoidingView style={styles.mainContainer}>
                  {props.children}
                </KeyboardAvoidingView>
            </LinearGradient>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  mainContainer: {
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
});
