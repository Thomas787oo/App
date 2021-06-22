import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../common-styles/colors';
import { Button } from '@ui-kitten/components';
import { Fonts } from '../../../common-styles/fonts';

export const FormButton = (props: {
  enabled: boolean;
  text: string;
  onPress?: () => any;
}): React.ReactElement => {
  return (
    <View
      style={[
        props.enabled ? styles.buttonEnabled : styles.buttonDisabled,
      ]}
    >
        <Button style={[{
                  backgroundColor: Colors.greyMain,
                  borderWidth: 0,
                  borderRadius: 0,
                  height: 51,
                }]}
                onPress={props.onPress}>
            <Text style={{ color: Colors.white, fontSize: 14 }}>
                { props.text }
            </Text>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.baseMain,
    borderRadius: 0,
    borderWidth: 0,
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.montserratSemiBold,
    color: Colors.white,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonEnabled: {
    opacity: 1,
  },
});
