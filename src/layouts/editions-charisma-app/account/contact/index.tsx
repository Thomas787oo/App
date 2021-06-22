import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from '../../../../common-styles/colors';

export default (props: { navigation: any }): React.ReactElement => {

  return (
    <WebView source={{ uri: 'https://www.editions-charisma.fr/coordonnees' }} style={{ marginTop: 20 }} />
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    backgroundColor: Colors.white,
  },
  forgotPasswordTitle: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.04,
    fontWeight: '400',
    left: 50,
    bottom: 24,
  },
});
