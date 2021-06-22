import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../common-styles/colors';
import { Button } from '@ui-kitten/components';
import { Fonts } from '../../../common-styles/fonts';

export const BottomButton = (props: {
  enabled: boolean;
  text: string;
  onPress?: () => any;
}): React.ReactElement => {
  return (
    <View
      style={[
        { height: 75, backgroundColor: Colors.baseMain },
        props.enabled ? styles.buttonEnabled : styles.buttonDisabled,
      ]}
    >
      <Button style={styles.button} size="large" onPress={props.onPress}>
        {(evaProps) => (
          <Text {...evaProps} style={styles.buttonText}>
            {props.text}
          </Text>
        )}
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
    opacity: 0.5,
  },
  buttonEnabled: {
    opacity: 1,
  },
});
